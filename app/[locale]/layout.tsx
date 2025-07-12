import type React from "react"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import Providers from "@/components/providers"

const inter = Inter({ subsets: ["latin"] })

const locales = ["en", "zh"]

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

// 单独导出viewport配置
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

// 动态生成 metadata
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params
  
  // 获取翻译
  const t = await getTranslations({ locale, namespace: 'seo' })
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: 'Photo Editor Art Team' }],
    creator: 'Photo Editor Art',
    publisher: 'Photo Editor Art',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      alternateLocale: locale === 'en' ? 'zh' : 'en',
      url: 'https://photo-editor.art',
      title: t('ogTitle'),
      description: t('ogDescription'),
      siteName: 'Photo Editor Art',
      images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: t('ogTitle'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
      images: ['/images/og-image.png'],
      creator: '@aiartools',
      site: '@aiartools',
    },
    icons: {
      icon: "/images/favicon.ico",
    },
    manifest: '/site.webmanifest',
    alternates: {
      canonical: `https://photo-editor.art/${locale}`,
      languages: {
        'en': 'https://photo-editor.art/en',
        'zh': 'https://photo-editor.art/zh',
        'x-default': 'https://photo-editor.art/en',
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  if (!locale || !locales.includes(locale)) {
    console.log(`Invalid locale received: ${locale}`)
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="color-scheme" content="light dark" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Photo Editor Art",
              "description": locale === 'zh' 
                ? "用AI的力量改变你的图像。简单、快速、功能强大。"
                : "Transform your photos with the power of AI. Simple, fast, and incredibly powerful.",
              "url": "https://photo-editor.art",
              "applicationCategory": "DesignApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250"
              }
            })
          }}
        />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-VF3GYK8GEY"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VF3GYK8GEY');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
