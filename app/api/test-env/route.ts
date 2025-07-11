import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const envVars = {
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? '✅ 已设置' : '❌ 未设置',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || '❌ 未设置',
      JWT_SECRET: process.env.JWT_SECRET ? '✅ 已设置' : '❌ 未设置',
      DATABASE_URL: process.env.DATABASE_URL ? '✅ 已设置' : '❌ 未设置',
      NODE_ENV: process.env.NODE_ENV,
    };

    // 检查具体值（仅显示前几个字符）
    const envDetails = {
      NEXTAUTH_SECRET_START: process.env.NEXTAUTH_SECRET?.substring(0, 10) + '...',
      DATABASE_URL_START: process.env.DATABASE_URL?.substring(0, 20) + '...',
      DATABASE_URL_VALID: process.env.DATABASE_URL?.startsWith('postgresql://') ? '✅ 格式正确' : '❌ 格式错误',
    };

    return NextResponse.json({
      message: '环境变量检查',
      variables: envVars,
      details: envDetails,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: '检查环境变量时出错',
        message: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    );
  }
} 