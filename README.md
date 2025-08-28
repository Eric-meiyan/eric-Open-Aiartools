# Photo Editor Art - AI Image Editing Tool

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

A modern AI-powered image editing web application built with Next.js 15, powered by the cutting-edge **FLUX.1 Kontext** models for professional image editing capabilities.

## ✨ Features

- 🎨 **AI-Powered Image Editing** - Utilizing FLUX.1 Kontext models for superior results
- 🌍 **Multi-language Support** - English and Chinese interfaces
- 📱 **Responsive Design** - Optimized for desktop and mobile devices
- 🚀 **Real-time Processing** - Fast image processing with live previews
- 💡 **Multiple Edit Modes** - Smart, Precise, and Creative editing options
- 🎯 **Background Removal** - Intelligent background removal with transparency
- 📐 **Aspect Ratio Control** - 9 preset aspect ratios (21:9, 16:9, 4:3, 3:2, 1:1, 2:3, 3:4, 9:16, 9:21)
- 🖼️ **Multi-format Support** - JPG, JPEG, PNG, WebP, AVIF formats
- 💳 **Credit System** - Built-in credit management with Stripe integration
- 🔐 **Secure Authentication** - Multi-provider auth (Google, GitHub, Email)
- 📊 **User Dashboard** - Track activities and manage account

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **AI Models**: FLUX.1 Kontext (via fal.ai)
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: NextAuth.js v5
- **Payment**: Stripe
- **Email**: Resend
- **Internationalization**: next-intl
- **Deployment**: Vercel-ready

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database (recommend [Neon](https://neon.tech))
- API keys for required services

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/photo-editor-art.git
cd photo-editor-art
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Copy `.env.example` to `.env.local` and configure your environment variables:

```env
# Essential API Keys
FAL_KEY=your_fal_api_key_here
DATABASE_URL=your_postgresql_url_here
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Email Service
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Payment (optional)
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_PRICE_ID=your_stripe_price_id

# Security
JWT_SECRET=your_jwt_secret_here
```

### 4. Database Setup

```bash
# Generate database schema
npm run db:generate

# Run database migrations
npm run db:migrate

# Optional: Open Drizzle Studio
npm run db:studio
```

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 📋 API Documentation

### Image Processing Endpoints

#### `POST /api/edit-image`
Process a single image with AI editing.

**Supported Actions:**
- `smart` - Balanced AI editing (default)
- `precise` - High-precision editing  
- `creative` - Creative transformations
- `remove_background` - Background removal

**Parameters:**
- `image` (File) - Image file (max 5MB)
- `prompt` (string) - Edit instruction
- `action` (string) - Edit mode
- `guidance_scale` (number) - Control strength (optional)
- `aspect_ratio` (string) - Output aspect ratio (optional)
- `locale` (string) - Language for error messages

#### `POST /api/edit-multi-images`
Process multiple images in batch.

**Features:**
- Concurrent processing with configurable batch sizes
- Progress tracking and error handling
- Uses FLUX.1 Kontext Max Multi model

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - Email/password login
- `POST /api/auth/verify-email` - Email verification
- `GET /api/auth/me` - Get current user

## 🎯 AI Models

This application leverages state-of-the-art FLUX.1 Kontext models:

- **Single Image**: `fal-ai/flux-kontext/dev`
  - Smart editing: guidance_scale 3.5
  - Precise editing: guidance_scale 4.5  
  - Creative editing: guidance_scale 2.5
  - Background removal: guidance_scale 4.0

- **Multi-Image**: `fal-ai/flux-pro/kontext/max/multi`
  - Batch processing capabilities
  - Optimized for multiple image workflows

## 🏗️ Project Structure

```
photo-editor-art/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   │   ├── auth/          # Authentication pages
│   │   ├── dashboard/     # User dashboard
│   │   └── page.tsx       # Home page
│   ├── api/               # API routes
│   │   ├── auth/          # Auth endpoints
│   │   ├── edit-image/    # Image processing
│   │   └── stripe/        # Payment webhooks
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/                # Shadcn/ui components
│   ├── hero-section.tsx   # Landing page hero
│   ├── interactive-demo.tsx # Demo component
│   └── ...
├── lib/                   # Utilities and services
│   ├── fal-client.ts      # AI model client
│   ├── auth.ts            # Authentication config
│   ├── db.ts              # Database connection
│   ├── credit-service.ts  # Credit management
│   └── utils.ts           # Helper functions
├── drizzle/               # Database schema & migrations
├── messages/              # i18n translations
├── public/                # Static assets
└── hooks/                 # Custom React hooks
```

## 💳 Credit System

- **Registration Bonus**: 10 credits for new users
- **Credit Costs**:
  - Single image edit: 10 credits
  - Multi-image edit: 20 credits
  - Background removal: 10 credits
- **Pro Subscription**: 800 credits/month
- **Activity Tracking**: Full audit trail of credit usage

## 🌐 Internationalization

Supports English and Chinese with:
- Locale-based routing (`/en/*`, `/zh/*`)
- Translated UI components
- Localized error messages
- RTL-ready design system

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # ESLint check
npm run type-check   # TypeScript check

# Database
npm run db:generate  # Generate migrations
npm run db:migrate   # Run migrations
npm run db:studio    # Open Drizzle Studio
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy automatically

### Docker

```dockerfile
# Dockerfile included for containerized deployment
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔒 Security

- Environment variable protection
- File type and size validation
- Rate limiting on API endpoints
- CSRF protection with NextAuth.js
- Secure session management
- Input sanitization and validation

## 📸 Screenshots

### Home Page
![Home Page](public/images/Transform%20Your%20Photos%20with%20the%20Power%20of%20AI.png)

### Image Editing Interface
![Editing Interface](public/images/How%20to%20Edit%20Photos%20with%20Photo%20Editor%20Art.png)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- [FLUX.1 Kontext](https://fal.ai/models/fal-ai/flux-kontext/dev) - Cutting-edge AI models
- [Shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📞 Support

- 📧 **Email**: support@photo-editor.art
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/your-username/photo-editor-art/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/your-username/photo-editor-art/discussions)
- 📚 **Documentation**: [Wiki](https://github.com/your-username/photo-editor-art/wiki)

## 🗺️ Roadmap

- [ ] Video editing capabilities
- [ ] Batch operations UI
- [ ] API rate limiting dashboard
- [ ] Mobile app (React Native)
- [ ] Plugin system for custom filters
- [ ] AI model fine-tuning interface

---

<div align="center">

**Built with ❤️ and AI**

[Website](https://photo-editor.art) • [Documentation](https://docs.photo-editor.art) • [API Reference](https://api.photo-editor.art)

</div>