import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.photo-editor.art'
const LOCALES = ['en', 'zh'] as const

// Blog posts (static list for now, can be made dynamic later)
const BLOG_POSTS = [
  'contact-us',
  'how-to-edit-images',
  'introducing-aiartools',
] as const

// Static pages
const STATIC_PAGES = ['prompt-guide', 'privacy', 'terms', 'cookies'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = []
  const now = new Date()

  // 1. Homepage for all locales (priority 1.0, weekly)
  LOCALES.forEach((locale) => {
    routes.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    })
  })

  // 2. Blog list page for all locales (priority 0.8, weekly)
  LOCALES.forEach((locale) => {
    routes.push({
      url: `${BASE_URL}/${locale}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  // 3. Blog posts for all locales (priority 0.7, monthly)
  LOCALES.forEach((locale) => {
    BLOG_POSTS.forEach((post) => {
      routes.push({
        url: `${BASE_URL}/${locale}/blog/${post}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    })
  })

  // 4. Static pages for all locales (priority 0.3, yearly)
  LOCALES.forEach((locale) => {
    STATIC_PAGES.forEach((page) => {
      routes.push({
        url: `${BASE_URL}/${locale}/${page}`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.3,
      })
    })
  })

  // Future: Can add dynamic tool page scanning from app/[locale]/ directories
  // Example:
  // const toolDirs = fs.readdirSync(path.join(process.cwd(), 'app/[locale]'))
  //   .filter(dir => !['blog', 'auth', 'dashboard', ...STATIC_PAGES].includes(dir))

  return routes
}
