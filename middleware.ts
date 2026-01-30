import createMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'

const intlMiddleware = createMiddleware({
  // 支持的语言列表
  locales: ['en', 'zh'],

  // 默认语言
  defaultLocale: 'en',

  // 路径名国际化 - 改为 'always' 让所有语言都有路径前缀
  localePrefix: 'always',

  // 自动检测用户浏览器语言
  localeDetection: true,

  // 替代语言配置
  alternateLinks: true
})

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 明确排除 API 路由，特别是 Stripe webhook
  // 这些路由不需要国际化处理
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/_vercel/') ||
    pathname.includes('.')
  ) {
    return
  }

  return intlMiddleware(request)
}

export const config = {
  // 匹配所有路径
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}
