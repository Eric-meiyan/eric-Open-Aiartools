"use client"

import { useTranslations } from "next-intl"
import { SparklesIcon, WandIcon, ImageIcon, UsersIcon } from "lucide-react"

interface WhatIsSectionProps {
  locale: string
}

export default function WhatIsSection({ locale }: WhatIsSectionProps) {
  const t = useTranslations("whatIs")

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
            <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
          </div>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-lg leading-relaxed mb-6">
              {t("intro")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{t("styleTransfer.title")}</h3>
                  <p className="text-sm">{t("styleTransfer.description")}</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <WandIcon className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{t("objectManipulation.title")}</h3>
                  <p className="text-sm">{t("objectManipulation.description")}</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-cyan-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{t("smartEnhancement.title")}</h3>
                  <p className="text-sm">{t("smartEnhancement.description")}</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <UsersIcon className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{t("browserBased.title")}</h3>
                  <p className="text-sm">{t("browserBased.description")}</p>
                </div>
              </div>
            </div>

            <p className="text-lg leading-relaxed">
              {t("conclusion")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
