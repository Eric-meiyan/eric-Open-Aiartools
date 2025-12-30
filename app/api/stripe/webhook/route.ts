import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/lib/db';
import { users, userActivities } from '@/lib/schema';
import { addCredits } from '@/lib/credit-service';
import { eq, and, like } from 'drizzle-orm';
import { stripe } from '@/lib/stripe';
import { CREDIT_CONFIG } from '@/lib/constants';
import Stripe from 'stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// 环境变量验证
if (!webhookSecret || webhookSecret === 'undefined') {
  console.error('⚠️ STRIPE_WEBHOOK_SECRET is not configured or invalid! Webhook will fail.');
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  console.log('📥 Webhook received at:', new Date().toISOString());

  try {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');

    console.log('🔍 Request details:', {
      hasBody: !!body,
      bodyLength: body.length,
      hasSignature: !!sig,
      webhookSecretConfigured: !!webhookSecret && webhookSecret !== 'undefined'
    });

    if (!sig) {
      console.error('❌ No Stripe signature in request headers');
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    if (!webhookSecret || webhookSecret === 'undefined') {
      console.error('❌ STRIPE_WEBHOOK_SECRET is not configured');
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
      console.log('✅ Webhook signature verified successfully');
    } catch (err: any) {
      console.error('❌ Webhook signature verification failed:', err.message);
      console.error('Error details:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    console.log('📦 Received webhook event:', event.type, '| Event ID:', event.id);

    // 处理支付成功事件
    if (event.type === 'checkout.session.completed') {
      try {
        const session = event.data.object as Stripe.Checkout.Session;

        console.log('💳 Checkout session completed:', session.id);
        console.log('📋 Session metadata:', session.metadata);

        if (session.metadata) {
          const { userId, planId, credits, planType } = session.metadata;

          // 检查是否已经处理过此会话（避免与verify-payment API重复）
          const existingActivity = await db.query.userActivities.findFirst({
            where: and(
              eq(userActivities.userId, userId),
              like(userActivities.metadata, `%"sessionId":"${session.id}"%`)
            ),
          });

          if (!existingActivity) {
            try {
              // 为用户添加积分，订阅类型使用subscription积分
              const creditType = planType === 'subscription' ? 'subscription' : 'permanent';

              await addCredits(
                userId,
                parseInt(credits),
                planType === 'subscription' ? 'credit_description.subscription_activated' : 'credit_description.credit_purchase',
                {
                  type: 'payment',
                  planId: planId,
                  sessionId: session.id,
                  amount: session.amount_total ? session.amount_total / 100 : 0,
                  currency: session.currency || 'usd',
                  source: 'stripe-webhook', // 标识来源
                  timestamp: new Date().toISOString()
                },
                creditType
              );

              // 如果是订阅类型，更新用户的订阅状态
              if (planType === 'subscription') {
                // 获取订阅详情
                if (session.subscription && typeof session.subscription === 'string') {
                  try {
                    const subscription = await stripe.subscriptions.retrieve(session.subscription);

                    // 更新用户订阅状态
                    await db.update(users)
                      .set({
                        subscriptionStatus: 'active',
                        subscriptionPlan: planId,
                        subscriptionStartDate: new Date((subscription as any).current_period_start * 1000),
                        subscriptionEndDate: new Date((subscription as any).current_period_end * 1000),
                      })
                      .where(eq(users.id, userId));

                    console.log(`✅ Successfully updated subscription status for user ${userId}`);
                  } catch (subscriptionError) {
                    console.error('⚠️ Error retrieving subscription details:', subscriptionError);

                    // 如果无法获取订阅详情，至少设置基本的订阅状态
                    await db.update(users)
                      .set({
                        subscriptionStatus: 'active',
                        subscriptionPlan: planId,
                        subscriptionStartDate: new Date(),
                        // 默认设置为30天后过期，实际会通过其他webhook事件更新
                        subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                      })
                      .where(eq(users.id, userId));

                    console.log(`⚠️ Updated basic subscription status for user ${userId} without detailed subscription info`);
                  }
                }
              }

              console.log(`✅ Successfully added ${credits} ${creditType} credits to user ${userId} via webhook`);
            } catch (error) {
              console.error('❌ Error adding credits via webhook:', error);
              // 不抛出错误，继续处理
            }
          } else {
            console.log(`⏭️ Session ${session.id} has already been processed, skipping webhook processing`);
          }
        }
      } catch (error) {
        console.error('❌ Error processing checkout.session.completed event:', error);
        // 不抛出错误，记录后继续
      }
    }

    // 处理订阅相关事件
    if (event.type === 'invoice.payment_succeeded') {
      try {
        const invoice = event.data.object as Stripe.Invoice;

        if ((invoice as any).subscription && invoice.billing_reason === 'subscription_cycle') {
          // 这是订阅续费，为用户添加每月积分
          console.log('🔄 Subscription renewal payment succeeded:', invoice.id);

          // 从 subscription 中获取用户信息
          if (invoice.customer && typeof invoice.customer === 'string') {
            try {
              const customer = await stripe.customers.retrieve(invoice.customer);

              if (customer && !customer.deleted && customer.email) {
                const user = await db.query.users.findFirst({
                  where: eq(users.email, customer.email),
                });

                if (user) {
                  // 为订阅用户每月添加订阅积分
                  await addCredits(
                    user.id,
                    CREDIT_CONFIG.SUBSCRIPTION.PRO_MONTHLY_CREDITS,
                    'credit_description.subscription_renewal',
                    {
                      type: 'subscription_renewal',
                      invoiceId: invoice.id,
                      amount: invoice.amount_paid ? invoice.amount_paid / 100 : 0,
                      currency: invoice.currency || 'usd',
                    },
                    'subscription'
                  );

                  console.log(`✅ Successfully added ${CREDIT_CONFIG.SUBSCRIPTION.PRO_MONTHLY_CREDITS} subscription credits to user ${user.id} for subscription renewal`);
                }
              }
            } catch (error) {
              console.error('❌ Error handling subscription renewal:', error);
              // 不抛出错误，继续处理
            }
          }
        }
      } catch (error) {
        console.error('❌ Error processing invoice.payment_succeeded event:', error);
        // 不抛出错误，记录后继续
      }
    }

    // 处理订阅取消事件
    if (event.type === 'customer.subscription.deleted') {
      try {
        const subscription = event.data.object as Stripe.Subscription;

        console.log('🚫 Subscription deleted:', subscription.id);

        if (subscription.customer && typeof subscription.customer === 'string') {
          try {
            const customer = await stripe.customers.retrieve(subscription.customer);

            if (customer && !customer.deleted && customer.email) {
              const user = await db.query.users.findFirst({
                where: eq(users.email, customer.email),
              });

              if (user) {
                // 清零订阅积分
                await addCredits(user.id, 0, 'credit_description.subscription_expired', {
                  type: 'subscription_expired',
                  amount: 0,
                  currency: 'usd',
                  source: 'stripe-webhook',
                  timestamp: new Date().toISOString()
                }, 'subscription');

                // 更新订阅状态为取消
                await db.update(users)
                  .set({
                    subscriptionStatus: 'canceled',
                    subscriptionEndDate: new Date(), // 设置为当前时间表示已结束
                  })
                  .where(eq(users.id, user.id));

                console.log(`✅ Cleared subscription credits and updated status for user ${user.id} due to subscription cancellation`);
              }
            }
          } catch (error) {
            console.error('❌ Error handling subscription deletion:', error);
            // 不抛出错误，继续处理
          }
        }
      } catch (error) {
        console.error('❌ Error processing customer.subscription.deleted event:', error);
        // 不抛出错误，记录后继续
      }
    }

    // 处理订阅过期事件
    if (event.type === 'invoice.payment_failed') {
      try {
        const invoice = event.data.object as Stripe.Invoice;

        if ((invoice as any).subscription && invoice.attempt_count >= 3) {
          // 连续3次支付失败，认为订阅过期
          console.log('⚠️ Subscription payment failed 3 times:', invoice.id);

          if (invoice.customer && typeof invoice.customer === 'string') {
            try {
              const customer = await stripe.customers.retrieve(invoice.customer);

              if (customer && !customer.deleted && customer.email) {
                const user = await db.query.users.findFirst({
                  where: eq(users.email, customer.email),
                });

                if (user) {
                  // 清零订阅积分
                  await addCredits(user.id, 0, 'credit_description.subscription_expired', {
                    type: 'subscription_expired',
                    amount: 0,
                    currency: 'usd',
                    source: 'stripe-webhook',
                    timestamp: new Date().toISOString()
                  }, 'subscription');

                  // 更新订阅状态为过期
                  await db.update(users)
                    .set({
                      subscriptionStatus: 'expired',
                      subscriptionEndDate: new Date(), // 设置为当前时间表示已过期
                    })
                    .where(eq(users.id, user.id));

                  console.log(`✅ Cleared subscription credits and updated status for user ${user.id} due to payment failure`);
                }
              }
            } catch (error) {
              console.error('❌ Error handling subscription payment failure:', error);
              // 不抛出错误，继续处理
            }
          }
        }
      } catch (error) {
        console.error('❌ Error processing invoice.payment_failed event:', error);
        // 不抛出错误，记录后继续
      }
    }

    // ✅ 重要：根据 Stripe 最佳实践，无论内部处理是否成功，都应快速返回 200
    const processingTime = Date.now() - startTime;
    console.log(`✅ Webhook processed successfully in ${processingTime}ms. Returning 200 to Stripe.`);
    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error: any) {
    // 只有在签名验证失败或无法解析请求体时才会到这里
    console.error('❌ Critical webhook error (signature/parsing):', error);
    console.error('Error stack:', error.stack);

    // 即使是严重错误，也尽量返回 200 给 Stripe（除非是签名验证问题）
    // 如果已经过了签名验证，说明是内部处理问题，应该返回 200
    return NextResponse.json(
      {
        received: true,
        error: 'Internal processing error',
        message: error.message || 'Webhook处理失败'
      },
      { status: 200 } // 改为 200，避免 Stripe 重试
    );
  }
}