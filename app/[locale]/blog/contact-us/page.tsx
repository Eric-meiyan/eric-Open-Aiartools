import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, CalendarIcon, ClockIcon, TagIcon, MailIcon, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Metadata } from "next"
import CopyButton from "@/components/copy-button"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  
  const titles = {
    en: "Contact Photo Editor Art Team | Get Support & Connect With Us",
    zh: "联系Photo Editor Art团队 | 获取支持并与我们取得联系"
  }
  
  const descriptions = {
    en: "Get in touch with the Photo Editor Art team for support, feedback, or partnerships. Multiple contact methods available including email, social media, and more.",
    zh: "联系Photo Editor Art团队获取支持、反馈或合作机会。多种联系方式可选，包括电子邮件、社交媒体等。"
  }

  const title = titles[locale as keyof typeof titles] || titles.en
  const description = descriptions[locale as keyof typeof descriptions] || descriptions.en

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://photo-editor.art/${locale}/blog/contact-us`,
      siteName: "Photo Editor Art",
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      type: 'article',
      images: [
        {
          url: 'https://photo-editor.art/images/Get in Touch with Photo Editor Art Team.png',
          width: 1000,
          height: 400,
          alt: 'Contact Photo Editor Art Team',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://photo-editor.art/images/Get in Touch with Photo Editor Art Team.png'],
    },
    alternates: {
      canonical: `https://photo-editor.art/${locale}/blog/contact-us`,
      languages: {
        'en': 'https://photo-editor.art/en/blog/contact-us',
        'zh': 'https://photo-editor.art/zh/blog/contact-us',
      },
    },
  }
}

interface BlogPostProps {
  params: Promise<{ locale: string }>
}

export default async function ContactUs({ params }: BlogPostProps) {
  const { locale } = await params
  
  const t = (key: string): any => {
    const translations: Record<string, Record<string, any>> = {
      en: {
        backToHome: "Back to Home",
        backToBlog: "Back to Blog",
        title: "Get in Touch with Photo Editor Art Team",
        publishDate: "June 1, 2025",
        readTime: "3 min read",
        category: "Contact",
        introduction: "We're Here to Help",
        introText:
          "At Photo Editor Art, we value open communication with our users and are always eager to hear your feedback, answer your questions, or assist with any issues you might encounter. This guide outlines the various ways you can reach our team.",
        contactMethods: "Contact Methods",
        emailTitle: "Email Support",
        emailText:
          "For general inquiries, technical support, or feedback, email is the most reliable way to reach us. Our support team typically responds within 24 hours during business days.",
        emailAddress: "eric.wuyu1352@gmail.com",
        socialMediaTitle: "Social Media",
        socialMediaText:
          "Follow us on social media to stay updated with the latest news, features, and tips. You can also send us direct messages on these platforms:",
        wechatTitle: "WeChat",
        wechatText: "Contact us via WeChat for instant support and updates:",
        wechatId: "ericmeiyan",
        businessInquiries: "Business Inquiry",
        businessText:
          "For partnership opportunities, enterprise plans, or media inquiries, please email us with the subject line 'Business Inquiry' at eric.wuyu1352@gmail.com.",
        feedbackTitle: "Feedback and Feature Request",
        feedbackText:
          "We're constantly working to improve Photo Editor Art based on user feedback. If you have suggestions for new features or improvements, we'd love to hear from you! Send your ideas to eric.wuyu1352@gmail.com with the subject 'Feature Request'.",
        bugReportsTitle: "Bug Reports",
        bugReportsText:
          "If you encounter any issues while using Photo Editor Art, please let us know so we can fix them promptly. When reporting a bug, please include:",
        bugReportsList: [
          "A clear description of the issue",
          "Steps to reproduce the problem",
          "Screenshots (if applicable)",
          "Your device and browser information",
        ],
        responseTimeTitle: "Response Time",
        responseTimeText:
          "We strive to respond to all inquiries within 24 hours during business days. Complex technical issues may require additional time for investigation.",
        officeHoursTitle: "Office Hours",
        officeHoursText: "Our support team is available Monday through Friday, 9:00 AM to 6:00 PM (UTC+8).",
        communityTitle: "Join Our Community",
        communityText:
          "Connect with other Photo Editor Art users to share tips, showcase your creations, and get inspired. Our growing community is a great resource for learning new techniques and getting quick answers.",
        conclusionTitle: "We Look Forward to Hearing from You",
        conclusionText:
          "Your feedback and questions help us make Photo Editor Art better. Don't hesitate to reach out—we're here to help you make the most of our AI image transformation tools.",
        contactCTA: "Contact Us Today",
      },
      zh: {
        backToHome: "返回首页",
        backToBlog: "返回博客",
        title: "联系Photo Editor Art团队",
        publishDate: "2025年6月1日",
        readTime: "3分钟阅读",
        category: "联系我们",
        introduction: "我们随时为您提供帮助",
        introText:
          "在Photo Editor Art，我们重视与用户的开放沟通，并始终渴望听取您的反馈、回答您的问题或协助解决您可能遇到的任何问题。本指南概述了联系我们团队的各种方式。",
        contactMethods: "联系方式",
        emailTitle: "电子邮件支持",
        emailText:
          "对于一般咨询、技术支持或反馈，电子邮件是联系我们最可靠的方式。我们的支持团队通常在工作日24小时内回复。",
        emailAddress: "eric.wuyu1352@gmail.com",
        socialMediaTitle: "社交媒体",
        socialMediaText: "在社交媒体上关注我们，了解最新消息、功能和提示。您也可以在这些平台上向我们发送直接消息：",
        wechatTitle: "微信",
        wechatText: "通过微信联系我们，获得即时支持和更新：",
        wechatId: "ericmeiyan",
        businessInquiries: "商务咨询",
        businessText: "对于合作机会、企业计划或媒体咨询，请发送电子邮件至eric.wuyu1352@gmail.com，主题为'商务咨询'。",
        feedbackTitle: "反馈和功能请求",
        feedbackText:
          "我们不断根据用户反馈改进Photo Editor Art。如果您对新功能或改进有建议，我们很乐意听取您的意见！请将您的想法发送至eric.wuyu1352@gmail.com，主题为'功能请求'。",
        bugReportsTitle: "错误报告",
        bugReportsText: "如果您在使用Photo Editor Art时遇到任何问题，请告诉我们，以便我们及时修复。报告错误时，请包括：",
        bugReportsList: ["清晰的问题描述", "重现问题的步骤", "截图（如适用）", "您的设备和浏览器信息"],
        responseTimeTitle: "响应时间",
        responseTimeText: "我们努力在工作日24小时内回复所有咨询。复杂的技术问题可能需要额外的调查时间。",
        officeHoursTitle: "办公时间",
        officeHoursText: "我们的支持团队在周一至周五，上午9:00至下午6:00（UTC+8）提供服务。",
        communityTitle: "加入我们的社区",
        communityText:
          "与其他Photo Editor Art用户联系，分享技巧，展示您的创作，并获得灵感。我们不断成长的社区是学习新技术和获得快速答案的绝佳资源。",
        conclusionTitle: "我们期待您的来信",
        conclusionText:
          "您的反馈和问题帮助我们改进Photo Editor Art。请随时联系我们——我们在这里帮助您充分利用我们的AI图像转换工具。",
        contactCTA: "立即联系我们",
      },
    }
    return translations[locale]?.[key] || translations.en[key]
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <div className="min-h-screen bg-background">
        <Navigation locale={locale} />
        <div className="pt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl mx-auto">
              {/* Navigation */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Link href={`/${locale}`}>
                  <Button variant="ghost" size="sm">
                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                    {t("backToHome")}
                  </Button>
                </Link>
                <Link href={`/${locale}/blog`}>
                  <Button variant="ghost" size="sm">
                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                    {t("backToBlog")}
                  </Button>
                </Link>
              </div>

              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-6">{t("title")}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {t("publishDate")}
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    {t("readTime")}
                  </div>
                  <div className="flex items-center">
                    <TagIcon className="w-4 h-4 mr-2" />
                    {t("category")}
                  </div>
                </div>
              </div>

           

              {/* Content */}
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">{t("introduction")}</h2>
                  <p className="text-muted-foreground leading-relaxed">{t("introText")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">{t("contactMethods")}</h2>

                  {/* Email */}
                  <div className="bg-muted/30 p-6 rounded-lg mb-6">
                    <h3 className="text-xl font-medium mb-3 flex items-center">
                      <MailIcon className="w-5 h-5 mr-2 text-primary" />
                      {t("emailTitle")}
                    </h3>
                    <p className="text-muted-foreground mb-4">{t("emailText")}</p>
                    <div className="bg-background p-4 rounded-md flex items-center justify-between">
                      <span className="font-medium">{t("emailAddress")}</span>
                      <CopyButton text={t("emailAddress")}>
                        Copy
                      </CopyButton>
                    </div>
                  </div>

                  {/* WeChat */}
                  <div className="bg-muted/30 p-6 rounded-lg mb-6">
                    <h3 className="text-xl font-medium mb-3 flex items-center">
                      <MessageCircle className="w-5 h-5 mr-2 text-primary" />
                      {t("wechatTitle")}
                    </h3>
                    <p className="text-muted-foreground mb-4">{t("wechatText")}</p>
                    <div className="bg-background p-4 rounded-md flex items-center justify-between">
                      <span className="font-medium">{t("wechatId")}</span>
                      <CopyButton text={t("wechatId")}>
                        Copy
                      </CopyButton>
                    </div>
                  </div>

                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">{t("businessInquiries")}</h2>
                  <p className="text-muted-foreground leading-relaxed">{t("businessText")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">{t("feedbackTitle")}</h2>
                  <p className="text-muted-foreground leading-relaxed">{t("feedbackText")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">{t("bugReportsTitle")}</h2>
                  <p className="text-muted-foreground mb-4">{t("bugReportsText")}</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 pl-4">
                    {t("bugReportsList").map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-3">{t("responseTimeTitle")}</h2>
                    <p className="text-muted-foreground">{t("responseTimeText")}</p>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-3">{t("officeHoursTitle")}</h2>
                    <p className="text-muted-foreground">{t("officeHoursText")}</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">{t("communityTitle")}</h2>
                  <p className="text-muted-foreground leading-relaxed">{t("communityText")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">{t("conclusionTitle")}</h2>
                  <p className="text-muted-foreground leading-relaxed">{t("conclusionText")}</p>
                </section>

                <div className="text-center my-10">
                  <a href={`mailto:${t("emailAddress")}`}>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    >
                      {t("contactCTA")}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer locale={locale} />
      </div>
    </ThemeProvider>
  )
}
