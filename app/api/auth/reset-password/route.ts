import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, deleteVerificationToken, findUserByEmail, updateUserPassword } from '@/lib/user-service';
import { hashPassword } from '@/lib/auth-utils';
import { USER_CONFIG } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword, locale = 'zh' } = await request.json();

    // 验证输入
    if (!token) {
      return NextResponse.json(
        { error: locale === 'zh' ? '重置令牌缺失' : 'Reset token is missing' },
        { status: 400 }
      );
    }

    if (!newPassword) {
      return NextResponse.json(
        { error: locale === 'zh' ? '新密码是必填项' : 'New password is required' },
        { status: 400 }
      );
    }

    // 验证密码长度
    if (newPassword.length < USER_CONFIG.MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        { 
          error: locale === 'zh' 
            ? `密码长度至少需要${USER_CONFIG.MIN_PASSWORD_LENGTH}个字符` 
            : `Password must be at least ${USER_CONFIG.MIN_PASSWORD_LENGTH} characters long` 
        },
        { status: 400 }
      );
    }

    // 验证重置令牌
    const tokenResult = await verifyToken(token, 'password_reset');
    if (!tokenResult.isValid || !tokenResult.email) {
      return NextResponse.json(
        { error: locale === 'zh' ? '重置令牌无效或已过期' : 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    // 查找用户
    const user = await findUserByEmail(tokenResult.email);
    if (!user) {
      return NextResponse.json(
        { error: locale === 'zh' ? '用户不存在' : 'User not found' },
        { status: 404 }
      );
    }

    // 哈希新密码
    const hashedPassword = await hashPassword(newPassword);

    // 更新用户密码
    const updateSuccess = await updateUserPassword(user.id, hashedPassword);
    if (!updateSuccess) {
      return NextResponse.json(
        { error: locale === 'zh' ? '密码更新失败' : 'Password update failed' },
        { status: 500 }
      );
    }

    // 删除已使用的重置令牌
    await deleteVerificationToken(token);

    return NextResponse.json({
      message: locale === 'zh' ? '密码重置成功' : 'Password reset successful',
    });
  } catch (error) {
    console.error('密码重置错误:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 