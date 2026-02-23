"use client"

import { useTranslations } from "next-intl"
import { InstagramIcon, PaletteIcon, ShoppingBagIcon, HeartIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface UseCasesSectionProps {
  locale: string
}

export default function UseCasesSection({ locale }: UseCasesSectionProps) {
  const t = useTranslations("useCases")

  const useCases = [
    {
      icon: InstagramIcon,
      title: t("socialMedia.title"),
      description: t("socialMedia.description"),
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: PaletteIcon,
      title: t("designers.title"),
      description: t("designers.description"),
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: ShoppingBagIcon,
      title: t("ecommerce.title"),
      description: t("ecommerce.description"),
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: HeartIcon,
      title: t("personal.title"),
      description: t("personal.description"),
      color: "from-orange-500 to-amber-500",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="max-w-6xl mx-auto mb-12">
          <p className="text-lg text-muted-foreground text-center leading-relaxed">
            {t("intro")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
          {useCases.map((useCase, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-muted">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${useCase.color} flex items-center justify-center`}>
                    <useCase.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {useCase.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("conclusion")}
          </p>
        </div>
      </div>
    </section>
  )
}
