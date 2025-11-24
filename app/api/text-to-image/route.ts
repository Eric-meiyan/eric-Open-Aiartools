import { NextRequest, NextResponse } from 'next/server';
import { textToImage } from '@/lib/fal-client';
import { auth } from '@/lib/auth';
import { deductCredits } from '@/lib/credit-service';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { CREDIT_CONFIG } from '@/lib/constants';

// 翻译消息
const messages = {
    zh: {
        loginRequired: '请先登录后再使用文生图功能',
        userNotFound: '用户不存在',
        insufficientCredits: '积分不足，每次生成需要10积分',
        promptRequired: '请输入图片描述',
        processingError: '图片生成失败，请重试'
    },
    en: {
        loginRequired: 'Please log in first to use text-to-image features',
        userNotFound: 'User not found',
        insufficientCredits: 'Insufficient credits, 10 credits required per generation',
        promptRequired: 'Please enter image description',
        processingError: 'Image generation failed, please try again'
    }
};

// 获取翻译消息
function getMessage(locale: string, key: keyof typeof messages.zh): string {
    const lang = (locale === 'zh' || locale === 'zh-CN') ? 'zh' : 'en';
    return messages[lang][key];
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const locale = (formData.get('locale') as string) || 'en';

        // 检查用户认证状态
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json(
                { success: false, error: getMessage(locale, 'loginRequired') },
                { status: 401 }
            );
        }

        // 获取用户信息
        const user = await db.query.users.findFirst({
            where: eq(users.email, session.user.email),
        });

        if (!user) {
            return NextResponse.json(
                { success: false, error: getMessage(locale, 'userNotFound') },
                { status: 404 }
            );
        }

        // 检查用户积分是否足够
        const totalCredits = (user.credits || 0) + (user.subscriptionCredits || 0);
        if (totalCredits < CREDIT_CONFIG.COSTS.IMAGE_EDIT) {
            return NextResponse.json(
                {
                    success: false,
                    error: getMessage(locale, 'insufficientCredits')
                },
                { status: 402 }
            );
        }


        const prompt = formData.get('prompt') as string;
        const numImages = formData.get('num_images') ? parseInt(formData.get('num_images') as string) : 1;
        const aspectRatio = formData.get('aspect_ratio') as string || '1:1';
        const outputFormat = formData.get('output_format') as 'jpeg' | 'png' || 'jpeg';

        // 验证参数
        if (!prompt?.trim()) {
            return NextResponse.json(
                { success: false, error: getMessage(locale, 'promptRequired') },
                { status: 400 }
            );
        }

        // 验证 aspect_ratio
        const validAspectRatios = ['21:9', '16:9', '4:3', '3:2', '1:1', '2:3', '3:4', '9:16', '9:21'];
        if (!validAspectRatios.includes(aspectRatio)) {
            return NextResponse.json(
                { success: false, error: 'Invalid aspect ratio' },
                { status: 400 }
            );
        }

        // 调用文生图 API
        const result = await textToImage(prompt, {
            num_images: numImages,
            aspect_ratio: aspectRatio as any,
            output_format: outputFormat,
            locale: locale,
        });

        // 只有在图片生成成功后才扣除积分
        if (result.success) {
            const creditDeductResult = await deductCredits(
                user.id,
                CREDIT_CONFIG.COSTS.IMAGE_EDIT,
                `credit_description.image_edit:${prompt.substring(0, 100)}`,
                {
                    action: 'text_to_image',
                    prompt: prompt,
                    num_images: numImages,
                    aspect_ratio: aspectRatio,
                    output_format: outputFormat,
                    type: 'text_to_image',
                }
            );

            // 返回成功结果，包含积分信息
            return NextResponse.json({
                success: true,
                data: result.data,
                error: null,
                action: 'text_to_image',
                credits: creditDeductResult.credits
            });
        } else {
            // 图片生成失败，不扣除积分
            return NextResponse.json({
                success: false,
                data: null,
                error: result.error,
                action: 'text_to_image'
            });
        }

    } catch (error) {
        console.error('Text-to-image API error:', error);

        // 尝试从 formData 中获取 locale，如果失败则默认为 'en'
        let locale = 'en';
        try {
            const formData = await request.formData();
            locale = (formData.get('locale') as string) || 'en';
        } catch {
            // 如果无法读取 formData，使用默认语言
        }

        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : getMessage(locale, 'processingError')
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        message: '文生图 API',
        version: '1.0.0',
        model: 'nano-banana-pro',
        supported_formats: ['JPEG', 'PNG'],
        supported_aspect_ratios: ['21:9', '16:9', '4:3', '3:2', '1:1', '2:3', '3:4', '9:16', '9:21'],
        credit_cost: `${CREDIT_CONFIG.COSTS.IMAGE_EDIT} credits per generation`
    });
} 
