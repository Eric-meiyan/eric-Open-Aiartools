import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import InteractiveDemo from "@/components/interactive-demo"
import PricingSection from "@/components/pricing-section"
import TestimonialsSection from "@/components/testimonials-section"
import WhatIsSection from "@/components/what-is-section"
import UseCasesSection from "@/components/use-cases-section"
import FAQSection from "@/components/faq-section"
import BlogSection from "@/components/blog-section"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { getTranslations } from "next-intl/server"

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'faq' })
  
  // Software Application Schema
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Photo Editor Art",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }

  // FAQ Page Schema
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": t("q1.question"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t("q1.answer")
        }
      },
      {
        "@type": "Question",
        "name": t("q2.question"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t("q2.answer")
        }
      },
      {
        "@type": "Question",
        "name": t("q3.question"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t("q3.answer")
        }
      },
      {
        "@type": "Question",
        "name": t("q4.question"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t("q4.answer")
        }
      },
      {
        "@type": "Question",
        "name": t("q5.question"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t("q5.answer")
        }
      },
      {
        "@type": "Question",
        "name": t("q6.question"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t("q6.answer")
        }
      },
      {
        "@type": "Question",
        "name": t("q7.question"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t("q7.answer")
        }
      },
      {
        "@type": "Question",
        "name": t("q8.question"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t("q8.answer")
        }
      }
    ]
  }
  
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <div className="min-h-screen bg-background">
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
        />
        
        <Navigation locale={locale} />
        <main>
          <HeroSection locale={locale} />
          <FeaturesSection locale={locale} />
          <InteractiveDemo locale={locale} />
          <PricingSection locale={locale} />
          <TestimonialsSection locale={locale} />
          <WhatIsSection locale={locale} />
          <UseCasesSection locale={locale} />
          <FAQSection locale={locale} />
          <BlogSection locale={locale} />
        </main>
        <Footer locale={locale} />
      </div>
    </ThemeProvider>
  )
}
