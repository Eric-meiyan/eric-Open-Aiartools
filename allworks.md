
## 目标
当前工程，是个开源版本，我现在的目标是基于这个开源版本，上线一个在线照片编辑网站，域名叫photo-editor.art
虽然当前工程是个完全开源版本，但是我还是要做产品化的修改，不能和人家一模一样，这样是不好的。

### 产品化修改汇总

#### 1. 品牌视觉修改
- **图标/Logo**: 替换当前的 Aiartools logo，设计 Photo Editor Art 专属图标
- **Favicon**: 更新 `public/images/favicon.ico` 
- **OG图片**: 更新 `public/images/og-image.png` 社交分享图片
- **示例图片**: 替换首页第一屏右侧的示例图片（`public/images/` 目录下的演示图片）
- **占位图片**: 更新各种占位图片，确保符合新品牌调性

#### 2. 文案内容修改
- **品牌名称**: 将所有 "Aiartools" 替换为 "Photo Editor Art"
- **SEO标题描述**: 
  - 围绕 "photo editor" 关键词优化
  - 更新 `messages/en.json` 和 `messages/zh.json` 中的 seo 部分
- **首页文案**: 
  - Hero section 标题和副标题重写
  - Features section 功能描述调整
  - FAQ 部分问答重新编写
- **导航菜单**: 保持结构，调整措辞
- **博客内容**: 
  - 更新 `app/[locale]/blog/introducing-aiartools/` 为介绍新产品
  - 重写教程内容，突出 photo editing 特色

#### 3. SEO 优化调整
- **关键词策略**: 
  - 主关键词：photo editor, AI photo editor, online photo editing
  - 长尾关键词：free online photo editor, AI image enhancement, photo editing tool
- **Meta信息**: 
  - 更新所有页面的 title, description, keywords
  - 优化 OG 标签和 Twitter 卡片
- **URL结构**: 检查是否需要调整路由命名
- **站点地图**: 确保 `sitemap.xml` 反映新的品牌定位

#### 4. 技术配置修改
- **package.json**: 更新项目名称为 "photo-editor-art"
- **环境变量**: 确认所有必要的 API 配置
- **域名配置**: 
  - 更新 `NEXTAUTH_URL` 为 photo-editor.art
  - 配置 Stripe webhook URL
  - 更新邮件发送域名配置

#### 5. 社交信息更新
- **联系方式**: 更新 footer 中的联系邮箱
- **社交媒体链接**: 如有社交账号，更新相应链接
- **客服信息**: 更新用户支持相关信息
- **关于我们**: 重写公司/产品介绍信息

#### 6. 法律文档调整
- **隐私政策**: 更新品牌名称和域名信息
- **服务条款**: 同步更新相关条款
- **Cookie政策**: 确保合规性

#### 7. 用户体验优化
- **加载状态**: 确保所有 loading 状态文案符合新品牌调性
- **错误提示**: 检查并优化用户友好的错误信息
- **邮件模板**: 更新注册、验证等邮件的模板内容
- **成功页面**: 更新支付成功等页面的品牌信息

#### 8. 内容本地化
- **中文内容**: 确保中文翻译自然、符合中文用户习惯
- **英文内容**: 优化英文表达，突出专业性
- **多语言SEO**: 针对不同语言市场优化关键词策略

#### 9. 营销素材
- **演示视频**: 制作产品演示视频
- **使用教程**: 创建用户使用指南
- **案例展示**: 准备优质的编辑案例
- **用户评价**: 收集并展示用户反馈

### 实施计划

#### 优先级排序
1. **P0 (必须)**: 品牌视觉、基础文案、SEO基础设置
2. **P1 (重要)**: 示例图片、详细文案、技术配置
3. **P2 (优化)**: 社交信息、法律文档、UX优化
4. **P3 (增强)**: 营销素材、高级功能

#### 分步骤实施计划

##### 第一阶段：核心品牌替换 (P0) - 预计 3-5 天
**目标**: 完成基础品牌替换，确保网站可以正常运行

**Day 1: 项目配置**
- [ ] 更新 `package.json` 项目名称
- [ ] 创建新的品牌 logo 和 favicon
- [ ] 替换 `public/images/favicon.ico`
- [ ] 更新 `public/images/og-image.png`

**Day 2-3: 核心文案替换**
- [ ] 批量替换所有 "Aiartools" 为 "Photo Editor Art"
- [ ] 更新 `messages/en.json` SEO 相关内容
- [ ] 更新 `messages/zh.json` SEO 相关内容
- [ ] 调整首页 hero section 文案

**Day 4: 基础 SEO 设置**
- [ ] 优化 meta 标题和描述
- [ ] 更新关键词策略
- [ ] 检查并修改页面标题

**Day 5: 测试验证**
- [ ] 本地测试所有页面
- [ ] 检查品牌一致性
- [ ] 验证 SEO 基础设置

##### 第二阶段：内容和配置优化 (P1) - 预计 5-7 天
**目标**: 完善内容质量，配置生产环境

**Day 6-7: 示例图片更新**
- [ ] 设计/收集新的示例图片
- [ ] 替换首页演示图片
- [ ] 更新所有占位图片
- [ ] 优化图片尺寸和格式

**Day 8-9: 详细文案优化**
- [ ] 重写 hero section 标题和副标题
- [ ] 调整 features section 描述
- [ ] 重新编写 FAQ 内容
- [ ] 更新博客文章内容

**Day 10-11: 技术配置**
- [ ] 配置域名 photo-editor.art
- [ ] 更新环境变量 `NEXTAUTH_URL`
- [ ] 配置 Stripe webhook URL
- [ ] 更新邮件发送域名配置

**Day 12: 部署准备**
- [ ] 配置生产环境
- [ ] 设置 SSL 证书
- [ ] CDN 配置优化
- [ ] 性能测试

##### 第三阶段：体验完善 (P2) - 预计 4-6 天
**目标**: 优化用户体验，完善法律合规

**Day 13-14: 社交信息更新**
- [ ] 更新 footer 联系信息
- [ ] 配置客服邮箱
- [ ] 更新关于我们页面
- [ ] 社交媒体账号创建（如需要）

**Day 15-16: 法律文档**
- [ ] 更新隐私政策
- [ ] 修改服务条款
- [ ] 完善 Cookie 政策
- [ ] 法律合规检查

**Day 17-18: UX 优化**
- [ ] 优化加载状态文案
- [ ] 改进错误提示信息
- [ ] 更新邮件模板
- [ ] 测试支付流程

##### 第四阶段：营销增强 (P3) - 预计 7-10 天
**目标**: 创建营销素材，提升产品竞争力

**Day 19-21: 内容创建**
- [ ] 制作产品演示视频
- [ ] 编写详细使用教程
- [ ] 准备编辑案例展示
- [ ] 设计营销图片

**Day 22-24: 本地化优化**
- [ ] 精细化中文翻译
- [ ] 优化英文表达
- [ ] 针对性关键词研究
- [ ] 多语言 SEO 测试

**Day 25-26: 最终优化**
- [ ] 性能监控设置
- [ ] 用户反馈收集机制
- [ ] A/B 测试准备
- [ ] 分析工具配置

**Day 27-28: 上线准备**
- [ ] 全面功能测试
- [ ] 安全检查
- [ ] 备份机制确认
- [ ] 发布计划制定

##### 质量检查清单
**每个阶段完成后必须检查:**

**品牌一致性检查**
- [ ] 所有页面品牌名称统一
- [ ] 视觉元素风格一致
- [ ] 文案调性统一

**功能完整性检查**
- [ ] 用户注册登录正常
- [ ] 图片编辑功能正常
- [ ] 支付流程完整
- [ ] 邮件发送正常

**SEO 优化检查**
- [ ] 所有页面标题描述优化
- [ ] 关键词分布合理
- [ ] 内链结构清晰
- [ ] 加载速度优化

**用户体验检查**
- [ ] 移动端适配良好
- [ ] 错误处理友好
- [ ] 加载状态清晰
- [ ] 交互流程顺畅

##### 风险预案
**可能遇到的问题及解决方案:**

1. **域名解析问题**
   - 备选方案：先用子域名测试
   - 提前配置 DNS

2. **API 配置错误**
   - 保留原配置备份
   - 分步骤测试每个服务

3. **SEO 排名影响**
   - 使用 301 重定向
   - 提交新站点地图

4. **用户数据迁移**
   - 确保数据库兼容
   - 制定回滚计划

##### 后续维护计划
**上线后的持续优化:**

**第一个月:**
- 监控网站性能和错误
- 收集用户反馈
- 修复发现的问题

**第二个月:**
- 分析用户行为数据
- 优化转化流程
- 增加新功能

**第三个月:**
- SEO 效果评估
- 竞争对手分析
- 制定下一阶段计划

### 技术方案

#### 1. 技术架构概览

##### 当前技术栈 (保持不变)
```
Frontend: Next.js 15 (App Router) + React 19 + TypeScript
UI Framework: Shadcn/ui + Tailwind CSS + Radix UI
AI Service: FLUX.1 Kontext Pro (via fal.ai)
Database: PostgreSQL + Drizzle ORM (Neon)
Authentication: NextAuth.js 5.0 beta
Payment: Stripe
Email: Resend
Internationalization: next-intl
State Management: Zustand + React Context
Image Processing: Sharp + File validation
Deployment: Vercel
```

##### 核心功能模块
- **图像编辑引擎**: 基于 fal.ai 的 FLUX.1 Kontext Pro 模型
- **用户系统**: 注册/登录、邮箱验证、积分管理
- **支付系统**: Stripe 集成的订阅和一次性付费
- **多语言支持**: 中英文国际化
- **响应式设计**: 移动端和桌面端适配

#### 2. 品牌替换技术实施

##### 2.1 静态资源替换策略
```bash
# 图片资源替换路径
public/images/
├── favicon.ico          → 新品牌 favicon
├── logo.png            → Photo Editor Art logo  
├── og-image.png         → 社交分享图片
├── placeholder-*.jpg    → 新的占位图片
└── 演示图片/            → 首页示例图片
```

##### 2.2 代码中的品牌替换
```typescript
// 1. 批量文本替换策略
const brandReplacements = {
  'Aiartools': 'Photo Editor Art',
  'aiartools.com': 'photo-editor.art',
  'AI图像编辑工具': 'AI照片编辑器',
  // ... 更多替换规则
}

// 2. 配置文件更新
// package.json: name → "photo-editor-art"
// next.config.mjs: 域名相关配置
// 环境变量: NEXTAUTH_URL 等
```

##### 2.3 多语言文件更新
```json
// messages/en.json - SEO优化
{
  "seo": {
    "title": "Photo Editor Art - AI-Powered Photo Editing Online",
    "description": "Transform your photos with AI. Free online photo editor with smart editing, background removal, and style transfer. No download required.",
    "keywords": "photo editor,AI photo editor,online photo editing,free photo editor,background removal,image enhancement"
  }
}

// messages/zh.json - 对应中文优化
{
  "seo": {
    "title": "Photo Editor Art - AI智能在线照片编辑器",
    "description": "用AI技术编辑您的照片。免费在线照片编辑器，支持智能编辑、背景移除、风格转换。无需下载。",
    "keywords": "照片编辑器,AI照片编辑,在线修图,免费修图软件,背景移除,图像增强"
  }
}
```

#### 3. SEO技术优化方案

##### 3.1 关键词策略优化
```typescript
// 针对 photo editor 的关键词矩阵
const keywordStrategy = {
  // 主关键词 (高竞争，高价值)
  primary: [
    'photo editor', 'AI photo editor', 'online photo editor'
  ],
  
  // 长尾关键词 (低竞争，精准流量)  
  longTail: [
    'free online photo editor', 'AI photo editing tool',
    'photo background remover', 'AI image enhancer',
    'online photo retouching', 'smart photo editor'
  ],
  
  // 功能相关关键词
  functional: [
    'background removal tool', 'photo style transfer',
    'AI photo filter', 'image enhancement online',
    'photo editing app', 'picture editor online'
  ]
}
```

##### 3.2 具体文件修改清单
```bash
# 需要修改品牌名称的关键文件 (按优先级排序)
1. messages/en.json          # 英文SEO和界面文案
2. messages/zh.json          # 中文SEO和界面文案  
3. package.json              # 项目基础配置
4. app/[locale]/layout.tsx   # 页面标题和Meta标签
5. components/navigation.tsx # 导航栏
6. components/hero-section.tsx # 首页标题区域
7. components/footer.tsx     # 页脚信息
8. app/[locale]/blog/introducing-aiartools/ # 博客文章路径和内容
9. README.md                 # 项目说明(如果要开源发布)
10. app/robots.txt/route.ts  # 搜索引擎抓取规则
```

##### 3.3 批量替换执行方案
```bash
# 使用命令行工具批量替换 (在项目根目录执行)

# 1. 替换所有 "Aiartools" 为 "Photo Editor Art"
find . -type f -name "*.tsx" -o -name "*.ts" -o -name "*.json" | \
xargs sed -i 's/Aiartools/Photo Editor Art/g'

# 2. 替换所有 "aiartools.com" 为 "photo-editor.art"  
find . -type f -name "*.tsx" -o -name "*.ts" -o -name "*.json" | \
xargs sed -i 's/aiartools\.com/photo-editor.art/g'

# 3. 替换中文品牌名称
find . -type f -name "*.json" | \
xargs sed -i 's/AI图像编辑工具/AI照片编辑器/g'

# 4. 检查替换结果
grep -r "Aiartools" . --exclude-dir=node_modules --exclude-dir=.git
```

##### 3.4 Meta标签动态生成
```typescript
// app/[locale]/layout.tsx - 动态SEO
export async function generateMetadata({ params }: LocaleLayoutProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  
  return {
    title: t('seo.title'),
    description: t('seo.description'),
    keywords: t('seo.keywords'),
    openGraph: {
      title: t('seo.ogTitle'),
      description: t('seo.ogDescription'),
      url: 'https://photo-editor.art',
      siteName: 'Photo Editor Art',
      images: [{
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('seo.twitterTitle'),
      description: t('seo.twitterDescription'),
    }
  }
}
```

##### 3.5 结构化数据优化
```typescript
// Schema.org 标记优化
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Photo Editor Art",
  "description": "AI-powered online photo editor",
  "url": "https://photo-editor.art",
  "applicationCategory": "PhotographyApplication",
  "operatingSystem": "Web",
  "features": [
    "AI Photo Editing",
    "Background Removal", 
    "Style Transfer",
    "Image Enhancement"
  ]
}
```

##### 3.6 站点地图和robots.txt
```typescript
// app/sitemap.xml/route.ts - 动态站点地图
export async function GET() {
  const baseUrl = 'https://photo-editor.art'
  
  const staticPages = [
    '',
    '/features',
    '/pricing', 
    '/blog',
    '/privacy',
    '/terms'
  ]
  
  const locales = ['en', 'zh']
  
  const urls = staticPages.flatMap(page => 
    locales.map(locale => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: page === '' ? 1.0 : 0.8
    }))
  )
  
  return new Response(generateSitemap(urls), {
    headers: { 'Content-Type': 'application/xml' }
  })
}
```

#### 4. 立即可执行的操作清单

##### 4.1 第一天必做任务
```bash
# 1. 创建工作分支
git checkout -b feature/rebrand-to-photo-editor-art

# 2. 备份当前配置
cp package.json package.json.backup
cp messages/en.json messages/en.json.backup  
cp messages/zh.json messages/zh.json.backup

# 3. 更新项目名称
sed -i 's/"name": "open-aiartools"/"name": "photo-editor-art"/g' package.json

# 4. 准备品牌资源文件夹
mkdir -p assets/new-brand/{logos,favicons,demo-images}
```

##### 4.2 关键配置文件更新
```json
// messages/en.json - 关键SEO更新
{
  "seo": {
    "title": "Photo Editor Art - Free AI-Powered Photo Editing Online",
    "description": "Edit photos instantly with AI. Free online photo editor featuring smart editing, background removal, and artistic filters. No download required.",
    "keywords": "photo editor,AI photo editor,online photo editing,free photo editor,background removal,photo filters,image editing,photo retouching"
  },
  "hero": {
    "headline": "Transform Your Photos with AI Magic", 
    "subheadline": "Professional photo editing made simple. Upload, describe your vision, and watch AI bring your photos to life."
  }
}
```

##### 4.3 验证检查脚本
```bash
# 创建检查脚本 check-rebrand.sh
#!/bin/bash
echo "=== 品牌替换检查 ==="

# 检查是否还有旧品牌名称
echo "1. 检查是否还有 'Aiartools':"
grep -r "Aiartools" . --exclude-dir=node_modules --exclude-dir=.git || echo "✅ 未发现旧品牌名称"

# 检查关键文件是否更新
echo "2. 检查 package.json:"
grep "photo-editor-art" package.json && echo "✅ 项目名称已更新" || echo "❌ 项目名称未更新"

# 检查SEO关键词
echo "3. 检查SEO关键词:"
grep "photo editor" messages/en.json && echo "✅ 英文SEO已更新" || echo "❌ 英文SEO未更新"

echo "=== 检查完成 ==="
```
