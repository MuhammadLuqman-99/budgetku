<p align="center">
  <img src="public/icons/icon-192x192.png" alt="BudgetKu Logo" width="80" height="80" />
</p>

<h1 align="center">BudgetKu</h1>

<p align="center">
  <strong>Student Financial Management PWA</strong><br/>
  Track daily expenses, set smart budgets, and view weekly insights — all in Ringgit Malaysia.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/PWA-Installable-5A0FC8?logo=pwa" alt="PWA" />
</p>

<p align="center">
  <a href="https://budgetku-zeta.vercel.app"><strong>View Live Demo</strong></a>
</p>

---

## About

**BudgetKu** is a Progressive Web App (PWA) built as a **Final Year Project (FYP)** to help Malaysian university students manage their personal finances. Students can record daily expenses categorized by type, set monthly budgets with smart alerts, and visualize spending patterns through interactive charts.

The app is fully responsive (mobile-first), installable on any device, works offline, and supports dark mode. All amounts are in **Ringgit Malaysia (RM)**.

---

## Features

| Feature | Description |
|---------|-------------|
| **Expense Tracking** | Add, edit, and delete expenses with 7 built-in categories (Food & Drinks, Transport, Education, Entertainment, Shopping, Bills & Utilities, Others) |
| **Smart Budget** | Set monthly budgets with customizable alert thresholds (50%–100%) |
| **Dashboard** | Overview with budget progress bar, weekly spending chart, smart alerts, daily reminder, and recent transactions |
| **Analytics** | Category breakdown pie chart + weekly spending bar chart with Recharts |
| **Authentication** | Email/password registration + Google OAuth sign-in via Supabase Auth |
| **PWA / Installable** | Install on phone or desktop like a native app. Works offline via service worker |
| **Dark Mode** | System-aware theme with manual toggle |
| **Data Export** | Download expenses as CSV or PDF reports |
| **Search & Filter** | Search expenses by description, filter by category and date range |
| **Responsive Design** | Mobile bottom navigation + desktop sidebar layout |
| **Secure** | Row Level Security (RLS) on all database tables — users can only access their own data |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Backend & Auth** | [Supabase](https://supabase.com/) (PostgreSQL + Auth + RLS) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + [Zod v4](https://zod.dev/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **PWA** | [Serwist](https://serwist.pages.dev/) (Service Worker) |
| **PDF Export** | [jsPDF](https://github.com/parallax/jsPDF) + [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable) |
| **Theme** | [next-themes](https://github.com/pacocoursey/next-themes) |
| **Toast Notifications** | [Sonner](https://sonner.emilkowal.ski/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## Project Structure

```
student-finance-pwa/
├── public/
│   ├── icons/                            # PWA icons (192x192, 512x512, apple-touch)
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout (ThemeProvider, Toaster, InstallPrompt)
│   │   ├── page.tsx                      # Landing page (→ /dashboard if logged in)
│   │   ├── manifest.ts                   # PWA web manifest
│   │   ├── sw.ts                         # Serwist service worker
│   │   ├── globals.css                   # Tailwind CSS + theme variables
│   │   ├── not-found.tsx                 # 404 page
│   │   ├── error.tsx                     # Error boundary
│   │   ├── (auth)/                       # Authentication pages
│   │   │   ├── layout.tsx                # Centered auth layout with gradient
│   │   │   ├── login/page.tsx            # Login (email/password + Google OAuth)
│   │   │   ├── register/page.tsx         # Registration + Google OAuth
│   │   │   ├── forgot-password/page.tsx  # Password reset
│   │   │   └── auth/callback/route.ts    # OAuth callback handler
│   │   └── (dashboard)/                  # Protected pages (requires login)
│   │       ├── layout.tsx                # Sidebar + Header + Bottom Nav
│   │       ├── dashboard/page.tsx        # Main dashboard
│   │       ├── expenses/page.tsx         # Expense history (search, filter, delete)
│   │       ├── expenses/new/page.tsx     # Add new expense
│   │       ├── expenses/[id]/edit/       # Edit expense
│   │       ├── budget/page.tsx           # Monthly budget settings
│   │       ├── analytics/page.tsx        # Charts & category breakdown
│   │       ├── about/page.tsx            # App info & FYP details
│   │       └── profile/page.tsx          # User profile & settings
│   ├── components/
│   │   ├── ui/                           # 23 shadcn/ui components
│   │   ├── layout/                       # header, sidebar, bottom-nav, mobile-nav
│   │   ├── dashboard/                    # budget-summary, weekly-chart, smart-alerts,
│   │   │                                 # daily-reminder, recent-transactions, quick-actions
│   │   ├── expenses/                     # expense-form, delete-expense-dialog
│   │   └── shared/                       # theme-provider, empty-state, loading-spinner,
│   │                                     # install-prompt
│   ├── hooks/
│   │   ├── use-auth.ts                   # Auth state + onAuthStateChange listener
│   │   ├── use-expenses.ts               # Expense CRUD with search & filter
│   │   ├── use-budget.ts                 # Budget upsert + monthly spending
│   │   ├── use-categories.ts             # Fetch categories from Supabase
│   │   ├── use-weekly-summary.ts         # Weekly spending data via RPC
│   │   └── use-debounce.ts               # Debounce utility hook
│   ├── stores/
│   │   ├── auth-store.ts                 # Zustand auth store (user, hydrate, signOut)
│   │   └── ui-store.ts                   # Zustand UI store (sidebar toggle)
│   ├── lib/
│   │   ├── supabase/client.ts            # Browser Supabase client
│   │   ├── supabase/server.ts            # Server Supabase client (cookie-based)
│   │   ├── validations.ts               # Zod schemas (expense, budget, auth, profile)
│   │   ├── format.ts                     # formatRM(), parseRMToSen(), formatDate()
│   │   ├── constants.ts                  # Categories, colors, thresholds, app config
│   │   ├── export.ts                     # CSV and PDF export functions
│   │   └── utils.ts                      # cn() utility (tailwind-merge + clsx)
│   ├── types/
│   │   ├── expense.ts                    # Expense & Category interfaces
│   │   ├── budget.ts                     # Budget & CategoryBudget interfaces
│   │   └── auth.ts                       # Profile interface
│   └── middleware.ts                     # Auth token refresh + route protection
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql        # Full database schema + seed data
├── next.config.mjs                       # Next.js config + Serwist PWA plugin
├── tailwind.config.ts
├── tsconfig.json
├── .env.local                            # Supabase credentials (not committed)
└── package.json
```

---

## Database Schema

The app uses **Supabase (PostgreSQL)** with **6 tables**, all protected by **Row Level Security (RLS)**:

| Table | Description |
|-------|------------|
| `profiles` | Extends Supabase `auth.users` — stores full_name, avatar_url, university, currency |
| `categories` | 7 default categories with name, icon, color, and sort order |
| `expenses` | User expenses — amount stored in **sen (integer cents)** to avoid floating point issues |
| `budgets` | Monthly budget per user with configurable alert threshold percentage |
| `category_budgets` | Optional per-category budget allocation |
| `notification_settings` | Daily reminder and budget alert preferences |

### Database Functions (RPCs)

| Function | Purpose |
|----------|---------|
| `get_monthly_spending(user_id, month, year)` | Total spending for a given month |
| `get_weekly_spending(user_id)` | Daily totals for the last 7 days |
| `get_category_spending(user_id, month, year)` | Spending breakdown by category |
| `has_recorded_today(user_id)` | Check if user recorded any expense today |

### Security

- **18 RLS policies** across all tables — users can only read/write their own data
- **Auto-create profile trigger** — a profile row is created automatically when a user signs up
- **Cookie-based auth sessions** via `@supabase/ssr` for secure server-side rendering

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- [npm](https://www.npmjs.com/)
- A free [Supabase](https://supabase.com/) account

### 1. Clone the repository

```bash
git clone https://github.com/MuhammadLuqman-99/budgetku.git
cd budgetku
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com/)
2. Go to **SQL Editor** and run the migration:

```
-- Copy and paste the contents of:
supabase/migrations/001_initial_schema.sql
```

This creates all 6 tables, 7 default categories, 18 RLS policies, triggers, and database functions.

3. **(Optional) Enable Google OAuth:**
   - Create a Google OAuth app at [Google Cloud Console](https://console.cloud.google.com/)
   - In Supabase Dashboard: **Authentication > Providers > Google** — add Client ID and Secret
   - Add redirect URI: `https://<your-project-ref>.supabase.co/auth/v1/callback`

### 4. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Find these values in Supabase Dashboard: **Settings > API**

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous (public) key | Yes |

> **Note:** These are public keys safe to use in client-side code. Never expose your Supabase `service_role` key.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at localhost:3000 |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint checks |

---

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com/) and click **"Import Project"**
3. Select your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**

### After Deployment

Update your Supabase project:

1. **Site URL**: Supabase Dashboard > Authentication > URL Configuration > set **Site URL** to your Vercel domain (e.g., `https://budgetku-zeta.vercel.app`)
2. **Redirect URLs**: Add your Vercel domain to the redirect allowlist:
   - `https://your-app.vercel.app/**`
3. **Google OAuth** (if enabled): Add your Vercel domain to **Authorized JavaScript origins** in Google Cloud Console

---

## Project Stats

| Metric | Count |
|--------|-------|
| Total source files | 79 |
| Pages / Routes | 12 |
| React Components | 39 |
| Custom Hooks | 6 |
| Database Tables | 6 |
| RLS Policies | 18 |
| Database Functions | 6 |
| npm Dependencies | 34 |

---

## Screenshots

> Try the [live demo](https://budgetku-zeta.vercel.app) to see the app in action!

<!--
Uncomment and add screenshots:
![Landing Page](screenshots/landing.png)
![Dashboard](screenshots/dashboard.png)
![Add Expense](screenshots/add-expense.png)
![Budget Settings](screenshots/budget.png)
![Analytics](screenshots/analytics.png)
![Dark Mode](screenshots/dark-mode.png)
-->

---

## Author

**Muhammad Luqman**

- GitHub: [@MuhammadLuqman-99](https://github.com/MuhammadLuqman-99)

**Final Year Project (FYP)** — Student Financial Management System

---

## License

This project is open source and available under the [MIT License](LICENSE).
