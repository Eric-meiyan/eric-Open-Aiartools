# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database schema
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio

### Testing
No specific test commands are defined in package.json. The project uses build linting and type checking.

## Architecture Overview

### Core Technology Stack
- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: NextAuth.js with multiple providers (Google, GitHub, Credentials)
- **AI Service**: Fal.ai with FLUX.1 Kontext models
- **Payments**: Stripe integration
- **Internationalization**: next-intl (Chinese/English)
- **UI**: Shadcn/ui components with Tailwind CSS

### Key Components

#### AI Image Processing (`lib/fal-client.ts`)
- Uses FLUX.1 Kontext Dev model for image editing
- Supports multiple edit modes: smart, precise, creative, background removal
- Handles batch processing for multiple images
- Includes comprehensive error handling with localized messages

#### Authentication System (`lib/auth.ts`)
- Multi-provider authentication (Google, GitHub, Credentials)
- Auto-creates users for OAuth logins
- Awards registration bonus credits
- JWT-based sessions

#### Credit System (`lib/credit-service.ts`, `lib/constants.ts`)
- Users start with 10 credits (registration bonus)
- Credit costs: Image edit (10), Multi-image edit (20), Background removal (10)
- Credit validation before processing, deduction only after success
- Activity tracking with metadata for audit trails
- Subscription support with Stripe integration (Pro plan: 800 credits/month)
- OAuth registration automatically awards bonus credits

#### Database Schema (`drizzle/schema.ts`)
- Users table with credit tracking and subscription info
- User activities for audit trail
- Standard NextAuth tables (accounts, sessions, verification tokens)

### API Structure

#### Main Image Processing API (`/api/edit-image`)
- Handles file uploads (max 5MB)
- Supports JPG, PNG, WebP, AVIF formats
- Validates user authentication and credits
- Action types: smart, precise, creative, remove_background
- Locale-aware error messages with fallbacks
- Processes images with different AI models based on action type
- Deducts credits only after successful processing
- Returns processed images with updated credit balance

#### Multi-Image Processing API (`/api/edit-multi-images`)
- Batch processing for multiple images
- Uses `fal-ai/flux-pro/kontext/max/multi` model
- Configurable batch sizes and concurrent processing limits
- Comprehensive error handling for partial failures

#### Key API Features
- Multi-language support (Chinese/English)
- Comprehensive error handling
- Credit validation before processing
- File type and size validation

### Environment Variables Required
- `FAL_KEY` - Fal.ai API key
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - NextAuth.js secret
- `NEXTAUTH_URL` - Application URL
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` - Google OAuth
- `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET` - GitHub OAuth
- `STRIPE_*` - Stripe payment configuration
- `RESEND_API_KEY` - Email service
- `JWT_SECRET` - JWT signing secret

### File Upload Constraints
- Maximum file size: 5MB
- Supported formats: JPG, JPEG, PNG, WebP, AVIF
- Files converted to base64 data URLs for API transmission

### AI Model Configuration
- Primary model: `fal-ai/flux-kontext/dev` for single image editing
- Multi-image model: `fal-ai/flux-pro/kontext/max/multi` for batch processing
- Different guidance scales for different editing modes:
  - Smart editing: 3.5 (balanced)
  - Precise editing: 4.5 (higher precision)
  - Creative editing: 2.5 (more creative freedom)
  - Background removal: 4.0 (clean cutouts)
- Aspect ratio support with 9 preset options
- Safety tolerance levels 1-6 for content filtering
- Batch processing with configurable concurrent limits

### Request Processing Flow
1. Authentication validation (session-based)
2. User credit check (before processing)
3. File validation (type, size limits)
4. Image conversion to base64 data URL
5. AI model processing via fal.ai
6. Credit deduction (only after successful processing)
7. Response with processed images and updated credit balance

### Error Handling Architecture
- Localized error messages in `app/api/edit-image/route.ts`
- Fallback error handling in `lib/fal-client.ts`
- Comprehensive response format validation
- Credit rollback on processing failures

### Internationalization
- Messages stored in `messages/` directory (en.json, zh.json)
- Supports Chinese (zh) and English (en)
- Locale-aware error messages and UI text
- Request-based locale detection
- Translation fallback mechanism

### Development Notes
- ESLint and TypeScript checks are disabled during builds (ignoreDuringBuilds/ignoreBuildErrors)
- Images are unoptimized in Next.js config
- Database migrations are in `drizzle/` directory
- Credit costs and configuration in `lib/constants.ts`
- Multi-provider authentication with automatic user creation for OAuth
- JWT-based sessions with 7-day expiry