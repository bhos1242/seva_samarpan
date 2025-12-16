# 🚀 Hackathon Starter Template

A blazing-fast Next.js 16 starter template optimized for hackathons. Ship fast, win big!

## ⚡ Quick Start

```bash
# 1. Clone and install
pnpm install

# 2. Set up environment
cp .env.example .env
# Edit .env with your values

# 3. Generate Prisma client
pnpm prisma generate

# 4. Push database schema (or migrate)
pnpm prisma db push

# 5. Start development
pnpm dev
```

## 🎁 What's Included

### Core
- ⚡ **Next.js 16** with App Router & Turbopack
- 🎨 **Tailwind CSS v4** + **shadcn/ui** (new-york style)
- 🔐 **Auth.js v5** with Google & GitHub providers
- 🗄️ **Prisma ORM** with PostgreSQL
- 📝 **TypeScript** + **Zod** validation
- 🌙 **Dark mode** with next-themes

### Pre-installed Components
- Button, Card, Input, Label, Dialog, Form
- Textarea, Select, Badge, Avatar
- Separator, Dropdown Menu, Skeleton
- Sonner (toast notifications)

### App Structure
- `loading.tsx` - Global loading state
- `error.tsx` - Error boundary with retry
- `not-found.tsx` - Custom 404 page
- `navbar.tsx` - Responsive navbar with auth
- `footer.tsx` - Simple footer
- `actions/` - Server actions template

## 🔧 Environment Variables

Copy `.env.example` to `.env` and fill in:

```env
DATABASE_URL="your-postgres-url"
AUTH_SECRET="openssl rand -base64 32"
GOOGLE_CLIENT_ID="from-google-console"
GOOGLE_CLIENT_SECRET="from-google-console"
GITHUB_CLIENT_ID="from-github-settings"
GITHUB_CLIENT_SECRET="from-github-settings"
```

## 📁 Project Structure

```
├── app/
│   ├── api/auth/[...nextauth]/  # Auth API routes
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Landing page
│   ├── loading.tsx              # Loading UI
│   ├── error.tsx                # Error UI
│   └── not-found.tsx            # 404 UI
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── navbar.tsx               # Navigation
│   ├── footer.tsx               # Footer
│   ├── theme-provider.tsx       # Theme context
│   ├── theme-toggle.tsx         # Dark mode toggle
│   └── providers.tsx            # Session provider
├── lib/
│   ├── auth.ts                  # Auth.js config
│   ├── prisma.ts                # Prisma client
│   └── utils.ts                 # Utility functions
├── actions/                     # Server actions
├── prisma/
│   └── schema.prisma            # Database schema
└── .env.example                 # Environment template
```

## 🏆 Hackathon Tips

1. **Focus on your unique idea** - Auth, DB, and UI are ready
2. **Use server actions** - Faster than API routes
3. **Leverage shadcn/ui** - Add more components with `npx shadcn@latest add [component]`
4. **Deploy early** - Push to Vercel for live demo

## 📚 Useful Commands

```bash
# Add more shadcn components
npx shadcn@latest add [component-name]

# Prisma commands
pnpm prisma generate     # Generate client
pnpm prisma db push      # Push schema changes
pnpm prisma studio       # Open database GUI

# Build for production
pnpm build
```

## 🚀 Deploy

```bash
# Deploy to Vercel
vercel
```

---

**Good luck with your hackathon! 🎉**
