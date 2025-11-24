# 新特性描述
- /Users/apple/Documents/codegit/prompt-optimizer是一个提示词项目的项目目录，该项目prompt-optimizer是个独立的项目。这个项目我认为非常好，我想把它融入到我的当前项目中。
- 在当前项目中，路由/prompt-guide页面内，有"模板"、"优化器"和"指南"，我想把prompt-optimizer项目，替换"优化器"这个页面的内容。
- 融入后，页面风格要一致。

---

# 技术分析与整合方案

## 1. 项目对比分析

### 1.1 prompt-optimizer 项目概述

**核心定位**: 专业的AI提示词优化工具，支持多种LLM模型的提示词优化、测试和管理

**技术栈**:
- 框架: Vue 3 (Composition API)
- UI库: Naive UI
- 语言: TypeScript
- 构建: Vite
- 包管理: pnpm (monorepo)
- 国际化: vue-i18n

**核心功能**:
1. **提示词优化**: 支持系统提示词和用户提示词两种优化模式
2. **模板管理**: 内置多种优化模板,支持自定义模板
3. **模型管理**: 支持OpenAI、Gemini、DeepSeek、Anthropic等多种LLM
4. **历史记录**: 完整的优化历史追踪和版本管理
5. **测试功能**: 支持原始vs优化提示词的对比测试
6. **高级模式**: 支持上下文会话、变量管理、工具调用(Function Calling)
7. **收藏管理**: 文件夹、标签分类管理收藏的提示词
8. **图像生成**: T2I和I2I模式

**架构特点**:
- Monorepo结构: core(核心逻辑) + ui(Vue组件) + web(应用入口)
- 服务层模式: 所有业务逻辑封装在service中
- Adapter模式: 统一的LLM适配器接口
- 响应式状态管理: Vue3 Composition API + Composables

### 1.2 picedit 项目概述

**核心定位**: AI照片编辑SaaS平台

**技术栈**:
- 框架: Next.js 15 (App Router)
- UI库: Shadcn/ui (基于Radix UI)
- 语言: TypeScript
- 样式: Tailwind CSS
- 数据库: PostgreSQL + Drizzle ORM
- 认证: NextAuth.js
- 支付: Stripe
- 国际化: next-intl

**核心功能**:
1. AI图片编辑(基于Fal.ai的FLUX模型)
2. 用户认证和权限管理
3. 积分系统和订阅管理
4. 提示词指南页面(模板、优化器、指南三个标签)

**架构特点**:
- Next.js服务端渲染
- API Routes处理后端逻辑
- 组件驱动开发
- 数据库持久化

### 1.3 技术栈差异对比

| 维度 | prompt-optimizer | picedit | 兼容性分析 |
|------|------------------|---------|-----------|
| **前端框架** | Vue 3 | React 19 (Next.js 15) | ❌ 不兼容,需要重写 |
| **UI组件库** | Naive UI | Shadcn/ui (Radix) | ❌ 不兼容,需要迁移 |
| **状态管理** | Composition API + Refs | React Hooks + useState | ❌ 需要转换为React模式 |
| **样式方案** | TailwindCSS + Naive UI主题 | TailwindCSS + CSS Variables | ✅ 兼容,但需调整主题 |
| **国际化** | vue-i18n | next-intl | ❌ 需要迁移翻译文件 |
| **构建工具** | Vite | Next.js/Webpack | ✅ 无影响(仅运行时) |
| **TypeScript** | TypeScript 5.8 | TypeScript 5.x | ✅ 兼容 |

## 2. 整合策略方案

### 2.1 方案选择

考虑到两个项目技术栈的根本性差异(Vue vs React),有以下三种整合方案:

#### 方案A: 完全重写(推荐) ⭐
**描述**: 将prompt-optimizer的核心功能用React + Shadcn/ui重新实现

**优点**:
- 完全符合picedit项目的技术栈和代码风格
- 性能最优,无额外框架开销
- 便于长期维护和扩展
- 样式一致性最佳

**缺点**:
- 开发工作量大(约2-3周)
- 需要理解并重新实现所有业务逻辑

**实施步骤**:
1. 提取prompt-optimizer的核心业务逻辑(TypeScript代码可复用)
2. 用React Hooks重写所有Composables
3. 用Shadcn/ui组件替换Naive UI组件
4. 迁移国际化文件到next-intl
5. 集成到picedit的/prompt-guide页面

#### 方案B: 微前端整合(不推荐)
**描述**: 使用iframe或Web Components将Vue应用嵌入React应用

**优点**:
- 可以快速集成,无需重写
- 保留原有功能完整性

**缺点**:
- 增加bundle体积(需同时加载Vue和React)
- 样式隔离导致UI不一致
- 通信复杂,调试困难
- 用户体验差(iframe加载延迟)
- 长期维护成本高

#### 方案C: API后端整合
**描述**: 将prompt-optimizer作为独立的后端服务,picedit只调用其API

**优点**:
- 前后端分离
- 可以独立部署和扩展

**缺点**:
- 需要部署和维护独立服务
- 增加运维复杂度
- 网络延迟影响体验
- 不符合"融入"的需求

**最终选择**: **方案A - 完全重写** (理由详见下文)

### 2.2 选择方案A的详细理由

1. **用户体验一致性**:
   - 统一的UI风格(Shadcn/ui)
   - 无缝的主题切换(dark/light)
   - 一致的交互模式

2. **技术债务最小**:
   - 避免维护两套技术栈
   - 代码库统一,便于团队协作
   - 无跨框架通信的复杂性

3. **性能最优**:
   - 无额外框架加载开销
   - 服务端渲染优化(Next.js)
   - 代码分割更高效

4. **长期可维护性**:
   - 单一技术栈便于招聘和培训
   - 统一的开发工具链
   - 更容易实现新功能

## 3. 详细实施方案

### 3.1 功能范围界定

**优先级P0 (MVP - 必须实现)**:
- ✅ 提示词输入和优化(系统提示词/用户提示词)
- ✅ 模型选择(至少支持OpenAI)
- ✅ 优化结果展示
- ✅ 一键复制功能
- ✅ 基础错误处理

**优先级P1 (第二阶段)**:
- 🔄 模板管理(预设模板)
- 🔄 优化模式切换(系统/用户)
- 🔄 历史记录
- 🔄 多模型支持(Gemini, DeepSeek等)

**优先级P2 (未来扩展)**:
- ⏸️ 高级模式(上下文会话、变量管理)
- ⏸️ 测试功能(对比测试)
- ⏸️ 收藏管理
- ⏸️ 图像提示词优化

### 3.2 架构设计

#### 3.2.1 目录结构

```
picedit/
├── app/
│   └── [locale]/
│       └── prompt-guide/
│           └── page.tsx           # 页面入口(保持不变)
├── components/
│   ├── prompt-guide-section.tsx   # 主容器组件(需修改)
│   └── prompt-optimizer/          # 新增:优化器组件目录
│       ├── optimizer-panel.tsx    # 优化器主面板
│       ├── input-section.tsx      # 输入区域
│       ├── output-section.tsx     # 输出区域
│       ├── model-selector.tsx     # 模型选择器
│       ├── template-selector.tsx  # 模板选择器(P1)
│       └── history-panel.tsx      # 历史记录(P1)
├── lib/
│   └── prompt-optimizer/          # 新增:业务逻辑层
│       ├── services/
│       │   ├── llm-service.ts     # LLM调用服务
│       │   ├── optimizer-service.ts # 优化逻辑
│       │   └── template-service.ts  # 模板管理
│       ├── adapters/
│       │   ├── base-adapter.ts    # 适配器基类
│       │   ├── openai-adapter.ts  # OpenAI适配器
│       │   └── gemini-adapter.ts  # Gemini适配器
│       ├── types.ts               # 类型定义
│       └── hooks/                 # React Hooks
│           ├── use-optimizer.ts   # 优化器Hook
│           ├── use-model.ts       # 模型管理Hook
│           └── use-template.ts    # 模板Hook
├── messages/
│   ├── en.json                    # 需添加优化器相关翻译
│   └── zh.json                    # 需添加优化器相关翻译
└── .env.local
    ├── OPENAI_API_KEY             # 需要添加
    └── GEMINI_API_KEY             # 可选
```

#### 3.2.2 核心组件设计

**1. optimizer-panel.tsx (主面板)**
```typescript
// 负责整体布局和状态管理
"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { useOptimizer } from "@/lib/prompt-optimizer/hooks/use-optimizer"
import InputSection from "./input-section"
import OutputSection from "./output-section"

export default function OptimizerPanel() {
  const {
    prompt,
    setPrompt,
    optimizedPrompt,
    isOptimizing,
    optimize,
    selectedModel,
    setSelectedModel
  } = useOptimizer()

  return (
    <div className="space-y-6">
      <InputSection
        prompt={prompt}
        onPromptChange={setPrompt}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        onOptimize={optimize}
        isOptimizing={isOptimizing}
      />
      {optimizedPrompt && (
        <OutputSection
          originalPrompt={prompt}
          optimizedPrompt={optimizedPrompt}
        />
      )}
    </div>
  )
}
```

**2. input-section.tsx (输入区域)**
```typescript
// 提示词输入 + 模型选择 + 优化按钮
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Wand2 } from "lucide-react"
import ModelSelector from "./model-selector"

interface InputSectionProps {
  prompt: string
  onPromptChange: (value: string) => void
  selectedModel: string
  onModelChange: (value: string) => void
  onOptimize: () => void
  isOptimizing: boolean
}

export default function InputSection({
  prompt,
  onPromptChange,
  selectedModel,
  onModelChange,
  onOptimize,
  isOptimizing
}: InputSectionProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <Textarea
          placeholder="Enter your prompt to optimize..."
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          className="min-h-[150px]"
        />
        <div className="flex items-center gap-4">
          <ModelSelector
            value={selectedModel}
            onChange={onModelChange}
          />
          <Button
            onClick={onOptimize}
            disabled={!prompt || isOptimizing}
          >
            <Wand2 className="mr-2 h-4 w-4" />
            {isOptimizing ? "Optimizing..." : "Optimize Prompt"}
          </Button>
        </div>
      </div>
    </Card>
  )
}
```

**3. output-section.tsx (输出区域)**
```typescript
// 优化结果展示 + 对比视图 + 复制按钮
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface OutputSectionProps {
  originalPrompt: string
  optimizedPrompt: string
}

export default function OutputSection({
  originalPrompt,
  optimizedPrompt
}: OutputSectionProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(optimizedPrompt)
    setCopied(true)
    toast.success("Copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Optimized Prompt</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4 mr-2" />
            ) : (
              <Copy className="h-4 w-4 mr-2" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-mono whitespace-pre-wrap">
            {optimizedPrompt}
          </p>
        </div>
      </div>
    </Card>
  )
}
```

#### 3.2.3 服务层设计

**llm-service.ts (LLM调用服务)**
```typescript
// 从prompt-optimizer的core包迁移并适配

export interface LLMMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface LLMResponse {
  content: string
  model: string
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export interface LLMAdapter {
  sendMessage(messages: LLMMessage[]): Promise<LLMResponse>
  sendMessageStream(
    messages: LLMMessage[],
    onToken: (token: string) => void
  ): Promise<void>
}

// 使用环境变量配置
export const createLLMService = (
  provider: string,
  apiKey: string
): LLMAdapter => {
  switch (provider) {
    case 'openai':
      return new OpenAIAdapter(apiKey)
    case 'gemini':
      return new GeminiAdapter(apiKey)
    default:
      throw new Error(`Unsupported provider: ${provider}`)
  }
}
```

**optimizer-service.ts (优化逻辑)**
```typescript
// 核心优化逻辑,可直接从prompt-optimizer移植

import { LLMAdapter, LLMMessage } from './llm-service'

export interface OptimizeRequest {
  prompt: string
  mode: 'system' | 'user'
  template?: string
}

export interface OptimizeResult {
  optimizedPrompt: string
  reasoning?: string
}

export class OptimizerService {
  constructor(private llmAdapter: LLMAdapter) {}

  async optimize(request: OptimizeRequest): Promise<OptimizeResult> {
    const messages = this.buildMessages(request)
    const response = await this.llmAdapter.sendMessage(messages)

    return {
      optimizedPrompt: this.extractPrompt(response.content),
      reasoning: this.extractReasoning(response.content)
    }
  }

  private buildMessages(request: OptimizeRequest): LLMMessage[] {
    // 根据模板和模式构建消息
    // 可复用prompt-optimizer的模板逻辑
    const systemPrompt = this.getSystemPrompt(request.mode)
    return [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: request.prompt }
    ]
  }

  private getSystemPrompt(mode: 'system' | 'user'): string {
    // 从prompt-optimizer的模板中提取
    return mode === 'system'
      ? 'Optimize the following system prompt...'
      : 'Optimize the following user prompt...'
  }

  private extractPrompt(content: string): string {
    // 解析LLM返回的优化结果
    return content
  }

  private extractReasoning(content: string): string | undefined {
    // 提取推理过程(如果有)
    return undefined
  }
}
```

#### 3.2.4 Hooks设计

**use-optimizer.ts**
```typescript
// React Hook封装优化器状态和逻辑

import { useState, useCallback } from 'react'
import { OptimizerService } from '../services/optimizer-service'
import { createLLMService } from '../services/llm-service'
import { toast } from 'sonner'

export function useOptimizer() {
  const [prompt, setPrompt] = useState('')
  const [optimizedPrompt, setOptimizedPrompt] = useState('')
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [selectedModel, setSelectedModel] = useState('openai:gpt-4')

  const optimize = useCallback(async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt')
      return
    }

    setIsOptimizing(true)
    try {
      const [provider, model] = selectedModel.split(':')
      const apiKey = getApiKey(provider)

      const llmService = createLLMService(provider, apiKey)
      const optimizer = new OptimizerService(llmService)

      const result = await optimizer.optimize({
        prompt,
        mode: 'system' // 默认优化系统提示词
      })

      setOptimizedPrompt(result.optimizedPrompt)
      toast.success('Prompt optimized successfully!')
    } catch (error: any) {
      console.error('Optimization failed:', error)
      toast.error(`Optimization failed: ${error.message}`)
    } finally {
      setIsOptimizing(false)
    }
  }, [prompt, selectedModel])

  return {
    prompt,
    setPrompt,
    optimizedPrompt,
    isOptimizing,
    optimize,
    selectedModel,
    setSelectedModel
  }
}

function getApiKey(provider: string): string {
  // 从环境变量读取API Key
  const key = process.env[`NEXT_PUBLIC_${provider.toUpperCase()}_API_KEY`]
  if (!key) {
    throw new Error(`Missing API key for ${provider}`)
  }
  return key
}
```

### 3.3 样式一致性方案

#### 3.3.1 使用现有的Shadcn/ui组件

所有UI组件都使用picedit项目已有的Shadcn组件:

```typescript
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
```

#### 3.3.2 主题适配

确保支持dark/light模式切换,复用现有主题系统:

```typescript
// 使用picedit的主题提供者
import { ThemeProvider } from "@/components/theme-provider"

// 组件自动适应主题
<Card className="bg-background text-foreground">
  {/* 内容 */}
</Card>
```

#### 3.3.3 布局一致性

**当前优化器标签页布局(简单版)**:
```tsx
<div className="max-w-2xl mx-auto space-y-6">
  <Textarea />
  <Button />
  {optimizedPrompt && (
    <div className="p-4 bg-muted rounded-lg">
      {/* 优化结果 */}
    </div>
  )}
</div>
```

**新优化器布局(对标prompt-optimizer)**:
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* 左侧:输入和配置 */}
  <div className="space-y-4">
    <Card>
      <CardHeader>
        <CardTitle>Input</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea />
        <ModelSelector />
        <Button>Optimize</Button>
      </CardContent>
    </Card>
  </div>

  {/* 右侧:输出和结果 */}
  <div className="space-y-4">
    <Card>
      <CardHeader>
        <CardTitle>Optimized Result</CardTitle>
      </CardHeader>
      <CardContent>
        {/* 优化结果 */}
      </CardContent>
    </Card>
  </div>
</div>
```

### 3.4 国际化方案

#### 3.4.1 翻译文件迁移

将prompt-optimizer的翻译文件迁移到next-intl格式:

**zh.json 新增内容**:
```json
{
  "promptGuide": {
    "optimizer": {
      "title": "AI提示词优化器",
      "description": "使用AI驱动的建议改善您的提示词以获得更好的结果",
      "inputLabel": "您的提示词",
      "inputPlaceholder": "在此输入您的提示词...",
      "optimizeButton": "优化提示词",
      "optimizing": "优化中...",
      "resultLabel": "优化后的提示词",
      "copyButton": "复制",
      "copied": "已复制!",
      "modelLabel": "选择模型",
      "modeLabel": "优化模式",
      "modes": {
        "system": "系统提示词",
        "user": "用户提示词"
      },
      "errors": {
        "emptyPrompt": "请输入要优化的提示词",
        "apiKeyMissing": "缺少API密钥",
        "optimizationFailed": "优化失败，请重试"
      },
      "models": {
        "openai": "OpenAI GPT-4",
        "gemini": "Google Gemini"
      }
    }
  }
}
```

#### 3.4.2 使用next-intl

```typescript
import { useTranslations } from "next-intl"

export default function OptimizerPanel() {
  const t = useTranslations("promptGuide.optimizer")

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      {/* ... */}
    </Card>
  )
}
```

### 3.5 API集成方案

#### 3.5.1 客户端调用 vs 服务端API

**选项1: 纯客户端调用(推荐MVP)**
```typescript
// 直接在客户端组件中调用LLM API
"use client"

import { OptimizerService } from "@/lib/prompt-optimizer/services/optimizer-service"

// 优点:实现简单,无需额外API Route
// 缺点:API Key暴露在前端(可用环境变量限制域名)
```

**选项2: 通过Next.js API Route(生产推荐)**
```typescript
// app/api/optimize-prompt/route.ts
import { NextRequest, NextResponse } from "next/server"
import { OptimizerService } from "@/lib/prompt-optimizer/services/optimizer-service"
import { getServerSession } from "next-auth"

export async function POST(req: NextRequest) {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { prompt, mode, model } = await req.json()

  // 服务端调用,API Key安全
  const optimizer = new OptimizerService(/* ... */)
  const result = await optimizer.optimize({ prompt, mode })

  return NextResponse.json(result)
}

// 客户端调用
const response = await fetch('/api/optimize-prompt', {
  method: 'POST',
  body: JSON.stringify({ prompt, mode, model })
})
```

**MVP阶段推荐**: 选项1 (快速实现)
**生产环境推荐**: 选项2 (安全性高)

#### 3.5.2 积分系统集成(可选)

如果要将优化器与现有积分系统结合:

```typescript
// 每次优化消耗积分
const OPTIMIZE_CREDIT_COST = 5

// API Route中检查积分
const user = await db.query.users.findFirst({
  where: eq(users.id, session.user.id)
})

if (user.credits < OPTIMIZE_CREDIT_COST) {
  return NextResponse.json(
    { error: "Insufficient credits" },
    { status: 402 }
  )
}

// 优化成功后扣除积分
await db.update(users)
  .set({ credits: user.credits - OPTIMIZE_CREDIT_COST })
  .where(eq(users.id, session.user.id))
```

### 3.6 数据持久化方案(P1阶段)

#### 3.6.1 历史记录存储

使用现有的PostgreSQL数据库存储优化历史:

**数据库Schema**:
```typescript
// drizzle/schema.ts 新增表
export const promptOptimizations = pgTable('prompt_optimizations', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  originalPrompt: text('original_prompt').notNull(),
  optimizedPrompt: text('optimized_prompt').notNull(),
  mode: text('mode').notNull(), // 'system' | 'user'
  modelUsed: text('model_used').notNull(),
  metadata: jsonb('metadata'), // 额外信息(模板ID等)
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
```

**查询接口**:
```typescript
// lib/prompt-optimizer/db.ts
export async function saveOptimization(data: {
  userId: string
  originalPrompt: string
  optimizedPrompt: string
  mode: string
  modelUsed: string
}) {
  return await db.insert(promptOptimizations).values(data)
}

export async function getOptimizationHistory(userId: string, limit = 20) {
  return await db
    .select()
    .from(promptOptimizations)
    .where(eq(promptOptimizations.userId, userId))
    .orderBy(desc(promptOptimizations.createdAt))
    .limit(limit)
}
```

### 3.7 性能优化

1. **代码分割**: 优化器组件使用动态导入
```typescript
const OptimizerPanel = dynamic(
  () => import('@/components/prompt-optimizer/optimizer-panel'),
  { ssr: false, loading: () => <LoadingSpinner /> }
)
```

2. **流式响应**: 支持流式优化结果展示
```typescript
async function optimizeWithStream(prompt: string) {
  const response = await fetch('/api/optimize-prompt', {
    method: 'POST',
    body: JSON.stringify({ prompt, stream: true })
  })

  const reader = response.body?.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader!.read()
    if (done) break

    const chunk = decoder.decode(value)
    setOptimizedPrompt(prev => prev + chunk)
  }
}
```

3. **缓存策略**: 相同提示词的优化结果缓存
```typescript
// 使用React Query或SWR缓存
const { data, isLoading } = useQuery({
  queryKey: ['optimize', prompt, mode],
  queryFn: () => optimizePrompt(prompt, mode),
  staleTime: 5 * 60 * 1000 // 5分钟内不重复请求
})
```

## 4. 实施计划

### 4.1 开发阶段划分

#### 第一阶段: MVP核心功能 (1-1.5周)

**任务清单**:
- [ ] 创建基础目录结构
- [ ] 实现LLM服务层(OpenAI adapter)
- [ ] 实现优化器服务(基础优化逻辑)
- [ ] 开发React组件:
  - [ ] OptimizerPanel
  - [ ] InputSection
  - [ ] OutputSection
  - [ ] ModelSelector
- [ ] 实现useOptimizer Hook
- [ ] 集成到/prompt-guide页面的"优化器"标签
- [ ] 添加国际化翻译(中英文)
- [ ] 样式适配(Shadcn/ui + Tailwind)
- [ ] 基础错误处理

**可交付成果**:
- 用户可以输入提示词
- 选择OpenAI模型进行优化
- 查看优化结果并复制
- UI与picedit其他页面一致

#### 第二阶段: 增强功能 (1周)

**任务清单**:
- [ ] 模板系统:
  - [ ] 预设模板数据结构
  - [ ] TemplateSelector组件
  - [ ] 模板应用逻辑
- [ ] 多模型支持:
  - [ ] Gemini adapter
  - [ ] DeepSeek adapter
  - [ ] 模型配置管理
- [ ] 历史记录:
  - [ ] 数据库Schema
  - [ ] HistoryPanel组件
  - [ ] 历史查询和复用
- [ ] 优化模式切换(系统/用户)

**可交付成果**:
- 用户可以选择预设模板
- 支持多种LLM模型
- 查看和复用历史优化记录
- 切换优化模式

#### 第三阶段: 高级功能(可选,2周)

**任务清单**:
- [ ] 上下文会话管理
- [ ] 变量系统
- [ ] 对比测试功能
- [ ] 收藏管理
- [ ] 流式响应优化
- [ ] 积分系统集成

### 4.2 人力资源需求

- **前端开发**: 1人 (熟悉React + Next.js + TypeScript)
- **时间预估**:
  - MVP: 1-1.5周
  - 完整P0+P1: 2-2.5周
  - 包含P2高级功能: 4周

### 4.3 风险评估

| 风险 | 可能性 | 影响 | 缓解措施 |
|------|--------|------|----------|
| API Key管理不当导致泄露 | 中 | 高 | 使用环境变量+服务端API Route |
| LLM API调用失败率高 | 中 | 中 | 实现重试机制+降级方案 |
| 样式不一致 | 低 | 中 | 严格使用Shadcn组件,代码审查 |
| 性能问题(大文本优化) | 低 | 中 | 实现流式响应+加载状态 |
| 国际化遗漏 | 低 | 低 | 翻译文件检查清单 |

## 5. 测试计划

### 5.1 单元测试

使用Jest + React Testing Library测试核心组件和逻辑:

```typescript
// __tests__/optimizer-service.test.ts
describe('OptimizerService', () => {
  it('should optimize system prompt', async () => {
    const mockAdapter = createMockLLMAdapter()
    const optimizer = new OptimizerService(mockAdapter)

    const result = await optimizer.optimize({
      prompt: 'You are a helpful assistant',
      mode: 'system'
    })

    expect(result.optimizedPrompt).toBeTruthy()
  })
})

// __tests__/use-optimizer.test.tsx
describe('useOptimizer hook', () => {
  it('should handle optimization flow', async () => {
    const { result } = renderHook(() => useOptimizer())

    act(() => {
      result.current.setPrompt('Test prompt')
    })

    await act(async () => {
      await result.current.optimize()
    })

    expect(result.current.optimizedPrompt).toBeTruthy()
    expect(result.current.isOptimizing).toBe(false)
  })
})
```

### 5.2 集成测试

测试完整的用户流程:

```typescript
// __tests__/integration/optimizer-flow.test.tsx
describe('Optimizer Integration', () => {
  it('should complete full optimization flow', async () => {
    render(<PromptGuideSection locale="en" />)

    // 1. 切换到优化器标签
    await userEvent.click(screen.getByText('Optimizer'))

    // 2. 输入提示词
    const textarea = screen.getByPlaceholderText(/enter your prompt/i)
    await userEvent.type(textarea, 'You are a helpful assistant')

    // 3. 点击优化按钮
    await userEvent.click(screen.getByText('Optimize Prompt'))

    // 4. 等待优化完成
    await waitFor(() => {
      expect(screen.getByText(/optimized prompt/i)).toBeInTheDocument()
    })

    // 5. 验证结果可复制
    const copyButton = screen.getByText('Copy')
    await userEvent.click(copyButton)
    expect(screen.getByText('Copied')).toBeInTheDocument()
  })
})
```

### 5.3 E2E测试

使用Playwright测试真实用户场景:

```typescript
// e2e/prompt-optimizer.spec.ts
test('user can optimize prompt and copy result', async ({ page }) => {
  await page.goto('/en/prompt-guide')

  // 切换到优化器标签
  await page.click('text=Optimizer')

  // 输入提示词
  await page.fill('textarea', 'You are a helpful assistant')

  // 选择模型
  await page.selectOption('select', 'openai:gpt-4')

  // 点击优化
  await page.click('text=Optimize Prompt')

  // 等待结果
  await page.waitForSelector('text=Optimized Prompt')

  // 复制结果
  await page.click('text=Copy')

  // 验证复制成功
  await expect(page.locator('text=Copied')).toBeVisible()
})
```

## 6. 上线检查清单

### 6.1 功能检查

- [ ] 所有MVP功能正常工作
- [ ] 支持中英文切换
- [ ] dark/light主题正常
- [ ] 移动端响应式布局
- [ ] 错误处理完善
- [ ] 加载状态显示

### 6.2 安全检查

- [ ] API Key不在前端代码中
- [ ] 使用环境变量管理密钥
- [ ] API Route有认证保护
- [ ] 输入验证和XSS防护
- [ ] Rate limiting(防止滥用)

### 6.3 性能检查

- [ ] 首屏加载时间 < 2s
- [ ] 优化响应时间合理
- [ ] 无内存泄漏
- [ ] 代码分割正确
- [ ] 图片和资源优化

### 6.4 代码质量

- [ ] TypeScript类型完整
- [ ] ESLint无错误
- [ ] 代码格式一致
- [ ] 注释清晰
- [ ] 无console.log残留

## 7. 长期维护计划

### 7.1 监控指标

- **使用指标**:
  - 优化请求数/天
  - 平均优化时长
  - 失败率
  - 用户留存率

- **性能指标**:
  - API响应时间
  - 前端渲染时间
  - 错误率

- **成本指标**:
  - LLM API调用成本
  - 基础设施成本

### 7.2 功能迭代路线图

**Q1 (前3个月)**:
- MVP上线
- 收集用户反馈
- 修复紧急bug
- 性能优化

**Q2 (4-6个月)**:
- 添加更多模型支持
- 优化模板库
- 历史记录和收藏功能
- 积分系统集成

**Q3 (7-9个月)**:
- 高级功能(上下文、变量)
- 对比测试功能
- API开放给外部调用
- 数据分析仪表板

## 8. 总结

### 8.1 技术选型总结

| 决策 | 选择 | 理由 |
|------|------|------|
| 整合方案 | 完全重写 | 技术栈一致性、长期可维护性 |
| UI框架 | React + Shadcn/ui | 复用现有组件库 |
| 状态管理 | React Hooks | 简单够用,无需Redux |
| API调用 | Next.js API Routes | 安全性高 |
| 数据存储 | PostgreSQL | 复用现有数据库 |
| 国际化 | next-intl | 已有方案 |

### 8.2 核心价值

1. **用户价值**: 提供专业的提示词优化工具,提升AI使用体验
2. **技术价值**: 积累LLM应用开发经验,为后续AI功能铺路
3. **商业价值**: 增加用户粘性,可能的变现点(积分消耗)

### 8.3 成功指标

- **MVP上线**: 2周内完成基础功能
- **用户采用率**: 30%的活跃用户使用优化器功能
- **满意度**: NPS > 40
- **技术债务**: 保持代码质量,无重大bug

---

**文档版本**: v1.0
**编写时间**: 2025年10月26日
**下一步**: 开始MVP开发,创建第一个PR