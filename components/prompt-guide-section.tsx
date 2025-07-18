"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Wand2, Lightbulb, Heart, Palette, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

interface PromptGuideSectionProps {
  locale: string
}

interface PromptTemplate {
  id: string
  category: string
  title: string
  description: string
  prompt: string
  tags: string[]
  icon: any
}

export default function PromptGuideSection({ locale }: PromptGuideSectionProps) {
  const t = useTranslations("promptGuide")
  const [optimizedPrompt, setOptimizedPrompt] = useState("")
  const [userInput, setUserInput] = useState("")
  const [isOptimizing, setIsOptimizing] = useState(false)

  // 预设prompt模板
  const promptTemplates: PromptTemplate[] = [
    {
      id: "portrait",
      category: "portrait",
      title: t("templates.portrait.title"),
      description: t("templates.portrait.description"),
      prompt: "enhance portrait lighting, improve skin texture, professional headshot style, natural skin tones, soft lighting",
      tags: ["portrait", "lighting", "professional"],
      icon: Heart
    },
    {
      id: "landscape",
      category: "landscape",
      title: t("templates.landscape.title"),
      description: t("templates.landscape.description"),
      prompt: "enhance landscape colors, dramatic sky, vibrant nature, cinematic lighting, high contrast",
      tags: ["landscape", "nature", "colors"],
      icon: Palette
    },
    {
      id: "artistic",
      category: "artistic",
      title: t("templates.artistic.title"),
      description: t("templates.artistic.description"),
      prompt: "artistic style transformation, creative interpretation, unique visual effects, stylized rendering",
      tags: ["artistic", "creative", "style"],
      icon: Sparkles
    },
    {
      id: "restoration",
      category: "restoration",
      title: t("templates.restoration.title"),
      description: t("templates.restoration.description"),
      prompt: "restore old photo, remove scratches, enhance clarity, fix color fading, improve sharpness",
      tags: ["restoration", "repair", "vintage"],
      icon: Wand2
    },
    {
      id: "background",
      category: "background",
      title: t("templates.background.title"),
      description: t("templates.background.description"),
      prompt: "change background to modern office, professional setting, clean background, natural lighting",
      tags: ["background", "professional", "setting"],
      icon: Lightbulb
    },
    {
      id: "color",
      category: "color",
      title: t("templates.color.title"),
      description: t("templates.color.description"),
      prompt: "adjust color temperature, enhance saturation, balance exposure, improve contrast",
      tags: ["color", "adjustment", "balance"],
      icon: Palette
    }
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success(t("copied"))
  }

  const optimizePrompt = async () => {
    if (!userInput.trim()) {
      toast.error(t("enterPrompt"))
      return
    }

    setIsOptimizing(true)
    try {
      // 这里可以调用AI API来优化prompt
      // 暂时使用简单的优化逻辑
      const enhanced = `${userInput}, professional quality, high resolution, detailed, well-lit, sharp focus`
      setOptimizedPrompt(enhanced)
      toast.success(t("optimized"))
    } catch (error) {
      toast.error(t("optimizationFailed"))
    } finally {
      setIsOptimizing(false)
    }
  }

  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            {t("subtitle")}
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("chatgptIntro")}
          </p>
        </div>

        <Tabs defaultValue="templates" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="templates">{t("tabs.templates")}</TabsTrigger>
            <TabsTrigger value="optimizer">{t("tabs.optimizer")}</TabsTrigger>
            <TabsTrigger value="guide">{t("tabs.guide")}</TabsTrigger>
          </TabsList>

          {/* Prompt Templates */}
          <TabsContent value="templates" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">{t("templatesTitle")}</h2>
              <p className="text-muted-foreground mb-2">
                {t("templatesDescription")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("chatgptTips")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promptTemplates.map((template) => {
                const IconComponent = template.icon
                return (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">{template.title}</CardTitle>
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {template.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground font-mono">
                          {template.prompt}
                        </p>
                      </div>
                      <Button
                        onClick={() => copyToClipboard(template.prompt)}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        {t("copyPrompt")}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Prompt Optimizer */}
          <TabsContent value="optimizer" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">{t("optimizerTitle")}</h2>
              <p className="text-muted-foreground">
                {t("optimizerDescription")}
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("yourPrompt")}</label>
                <Textarea
                  placeholder={t("promptPlaceholder")}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <Button
                onClick={optimizePrompt}
                disabled={isOptimizing || !userInput.trim()}
                className="w-full"
                size="lg"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                {isOptimizing ? t("optimizing") : t("optimizePrompt")}
              </Button>

              {optimizedPrompt && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("optimizedPrompt")}</label>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm font-mono">{optimizedPrompt}</p>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(optimizedPrompt)}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {t("copyOptimized")}
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Writing Guide */}
          <TabsContent value="guide" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">{t("guideTitle")}</h2>
              <p className="text-muted-foreground">
                {t("guideDescription")}
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600">{t("doTitle")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• {t("tips.specific")}</li>
                      <li>• {t("tips.clear")}</li>
                      <li>• {t("tips.style")}</li>
                      <li>• {t("tips.lighting")}</li>
                      <li>• {t("tips.quality")}</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-red-600">{t("dontTitle")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• {t("warnings.vague")}</li>
                      <li>• {t("warnings.contradictory")}</li>
                      <li>• {t("warnings.tooLong")}</li>
                      <li>• {t("warnings.negative")}</li>
                      <li>• {t("warnings.unrealistic")}</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{t("examplesTitle")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="font-medium text-green-600">{t("goodExample")}</p>
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm font-mono">{t("examples.good")}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-red-600">{t("badExample")}</p>
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <p className="text-sm font-mono">{t("examples.bad")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}