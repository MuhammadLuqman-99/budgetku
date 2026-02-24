<p align="center">
  <img src="public/icons/icon-192x192.png" alt="SMARTSPENDIPT Logo" width="80" height="80" />
</p>

<h1 align="center">SMARTSPENDIPT</h1>

<p align="center">
  <strong>Aplikasi Pengurusan Kewangan Pelajar Politeknik</strong><br/>
  Rekod perbelanjaan harian, tetapkan bajet pintar, dan lihat ringkasan mingguan — semua dalam Ringgit Malaysia.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/PWA-Installable-5A0FC8?logo=pwa" alt="PWA" />
</p>

---

## Tentang

**SMARTSPENDIPT** adalah Progressive Web App (PWA) yang dibina sebagai **Projek Akhir** untuk membantu pelajar politeknik mengurus kewangan peribadi mereka. Pelajar boleh merekod perbelanjaan harian mengikut kategori (Keperluan vs Kehendak), menetapkan bajet bulanan dengan amaran pintar, dan memvisualisasikan corak perbelanjaan melalui carta interaktif.

Aplikasi ini sepenuhnya responsif (mobile-first), boleh dipasang di mana-mana peranti, berfungsi secara offline, dan menyokong mod gelap. Semua jumlah dalam **Ringgit Malaysia (RM)**.

### Tujuan
- Membantu pelajar merekod perbelanjaan harian (Keperluan vs Kehendak)
- Memberi amaran pintar apabila baki rendah atau perbelanjaan kehendak tinggi
- Menyediakan ringkasan mingguan untuk kesedaran kewangan dan cadangan tindakan

---

## Ahli Kumpulan (DPM5A)

| Nama | No. Pendaftaran |
|------|-----------------|
| **Nur Hafizah binti Abdul Aziz** | 14DPM23F2007 |
| **Siti Aishah binti Suhaimi** | 14DPM23F2025 |
| **Sathis Kumar A/L Arivanandan** | 14DPM23F1803 |

**Institusi:** Politeknik Merlimau Melaka

---

## Ciri-ciri

| Ciri | Penerangan |
|------|------------|
| **Rekod Perbelanjaan** | Tambah, edit, dan padam perbelanjaan dengan 7 kategori terbina (Makanan & Minuman, Pengangkutan, Pendidikan, Hiburan, Membeli-belah, Bil & Utiliti, Lain-lain) |
| **Bajet Pintar** | Tetapkan bajet bulanan dengan had amaran boleh ubah (50%–100%) |
| **Papan Pemuka** | Gambaran keseluruhan dengan bar kemajuan bajet, carta perbelanjaan mingguan, amaran pintar, peringatan harian, dan transaksi terkini |
| **Analitik** | Carta pai pecahan kategori + carta bar perbelanjaan mingguan dengan Recharts |
| **Pengesahan** | Pendaftaran emel/kata laluan + log masuk Google OAuth melalui Supabase Auth |
| **PWA / Boleh Dipasang** | Pasang di telefon atau desktop seperti aplikasi biasa. Berfungsi secara offline melalui service worker |
| **Mod Gelap** | Tema peka sistem dengan togol manual |
| **Eksport Data** | Muat turun perbelanjaan sebagai laporan CSV atau PDF |
| **Cari & Tapis** | Cari perbelanjaan mengikut penerangan, tapis mengikut kategori dan julat tarikh |
| **Reka Bentuk Responsif** | Navigasi bawah mudah alih + susun atur bar sisi desktop |
| **Selamat** | Row Level Security (RLS) pada semua jadual pangkalan data — pengguna hanya boleh mengakses data mereka sendiri |

---

## Tech Stack

| Lapisan | Teknologi |
|---------|-----------|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **Bahasa** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) |
| **Komponen UI** | [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives) |
| **Ikon** | [Lucide React](https://lucide.dev/) |
| **Backend & Auth** | [Supabase](https://supabase.com/) (PostgreSQL + Auth + RLS) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + [Zod v4](https://zod.dev/) |
| **Carta** | [Recharts](https://recharts.org/) |
| **PWA** | [Serwist](https://serwist.pages.dev/) (Service Worker) |
| **PDF Export** | [jsPDF](https://github.com/parallax/jsPDF) + [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable) |
| **Tema** | [next-themes](https://github.com/pacocoursey/next-themes) |
| **Toast Notifications** | [Sonner](https://sonner.emilkowal.ski/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## Struktur Projek

```
smartspendipt/
├── public/
│   ├── icons/                            # Ikon PWA (192x192, 512x512, apple-touch)
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Layout utama (ThemeProvider, Toaster, InstallPrompt)
│   │   ├── page.tsx                      # Halaman utama (→ /dashboard jika log masuk)
│   │   ├── manifest.ts                   # PWA web manifest
│   │   ├── sw.ts                         # Serwist service worker
│   │   ├── globals.css                   # Tailwind CSS + pembolehubah tema
│   │   ├── not-found.tsx                 # Halaman 404
│   │   ├── error.tsx                     # Error boundary
│   │   ├── (auth)/                       # Halaman pengesahan
│   │   │   ├── layout.tsx                # Layout auth berpusat dengan gradien
│   │   │   ├── login/page.tsx            # Log masuk (emel/kata laluan + Google OAuth)
│   │   │   ├── register/page.tsx         # Pendaftaran + Google OAuth
│   │   │   ├── forgot-password/page.tsx  # Set semula kata laluan
│   │   │   └── auth/callback/route.ts    # Pengendali panggilan balik OAuth
│   │   └── (dashboard)/                  # Halaman dilindungi (perlu log masuk)
│   │       ├── layout.tsx                # Sidebar + Header + Bottom Nav
│   │       ├── dashboard/page.tsx        # Papan pemuka utama
│   │       ├── expenses/page.tsx         # Sejarah perbelanjaan (cari, tapis, padam)
│   │       ├── expenses/new/page.tsx     # Tambah perbelanjaan baru
│   │       ├── expenses/[id]/edit/       # Edit perbelanjaan
│   │       ├── budget/page.tsx           # Tetapan bajet bulanan
│   │       ├── analytics/page.tsx        # Carta & pecahan kategori
│   │       ├── about/page.tsx            # Maklumat app & butiran projek
│   │       └── profile/page.tsx          # Profil pengguna & tetapan
│   ├── components/
│   │   ├── ui/                           # 23 komponen shadcn/ui
│   │   ├── layout/                       # header, sidebar, bottom-nav, mobile-nav
│   │   ├── dashboard/                    # budget-summary, weekly-chart, smart-alerts,
│   │   │                                 # daily-reminder, recent-transactions, quick-actions
│   │   ├── expenses/                     # expense-form, delete-expense-dialog
│   │   └── shared/                       # theme-provider, empty-state, loading-spinner,
│   │                                     # install-prompt
│   ├── hooks/
│   │   ├── use-auth.ts                   # Auth state + onAuthStateChange listener
│   │   ├── use-expenses.ts               # Expense CRUD dengan cari & tapis
│   │   ├── use-budget.ts                 # Budget upsert + perbelanjaan bulanan
│   │   ├── use-categories.ts             # Ambil kategori dari Supabase
│   │   ├── use-weekly-summary.ts         # Data perbelanjaan mingguan melalui RPC
│   │   └── use-debounce.ts               # Hook utiliti debounce
│   ├── stores/
│   │   ├── auth-store.ts                 # Zustand auth store (user, hydrate, signOut)
│   │   └── ui-store.ts                   # Zustand UI store (sidebar toggle)
│   ├── lib/
│   │   ├── supabase/client.ts            # Browser Supabase client
│   │   ├── supabase/server.ts            # Server Supabase client (cookie-based)
│   │   ├── validations.ts               # Skema Zod (expense, budget, auth, profile)
│   │   ├── format.ts                     # formatRM(), parseRMToSen(), formatDate()
│   │   ├── constants.ts                  # Kategori, warna, had, konfigurasi app
│   │   ├── export.ts                     # Fungsi eksport CSV dan PDF
│   │   └── utils.ts                      # cn() utility (tailwind-merge + clsx)
│   ├── types/
│   │   ├── expense.ts                    # Antaramuka Expense & Category
│   │   ├── budget.ts                     # Antaramuka Budget & CategoryBudget
│   │   └── auth.ts                       # Antaramuka Profile
│   └── middleware.ts                     # Penyegaran token auth + perlindungan laluan
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql        # Skema pangkalan data penuh + data benih
├── next.config.mjs                       # Konfigurasi Next.js + plugin Serwist PWA
├── tailwind.config.ts
├── tsconfig.json
├── .env.local                            # Kelayakan Supabase (tidak di-commit)
└── package.json
```

---

## Skema Pangkalan Data

Aplikasi ini menggunakan **Supabase (PostgreSQL)** dengan **6 jadual**, semuanya dilindungi oleh **Row Level Security (RLS)**:

| Jadual | Penerangan |
|--------|------------|
| `profiles` | Melanjutkan Supabase `auth.users` — menyimpan full_name, avatar_url, university, currency |
| `categories` | 7 kategori lalai dengan nama, ikon, warna, dan susunan |
| `expenses` | Perbelanjaan pengguna — jumlah disimpan dalam **sen (integer cents)** untuk mengelak isu floating point |
| `budgets` | Bajet bulanan setiap pengguna dengan peratusan had amaran boleh dikonfigurasi |
| `category_budgets` | Peruntukan bajet setiap kategori (pilihan) |
| `notification_settings` | Keutamaan peringatan harian dan amaran bajet |

---

## Mula Menggunakan

### Prasyarat

- [Node.js](https://nodejs.org/) 18 atau lebih baharu
- [npm](https://www.npmjs.com/)
- Akaun [Supabase](https://supabase.com/) percuma

### 1. Klon repositori

```bash
git clone <url-repositori-anda>
cd smartspendipt
```

### 2. Pasang dependencies

```bash
npm install
```

### 3. Sediakan Supabase

1. Cipta projek baru di [supabase.com](https://supabase.com/)
2. Pergi ke **SQL Editor** dan jalankan migrasi:

```
-- Salin dan tampal kandungan:
supabase/migrations/001_initial_schema.sql
```

### 4. Konfigurasi pembolehubah persekitaran

Cipta fail `.env.local` di root projek:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Jalankan pelayan pembangunan

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di pelayar anda.

---

## Skrip

| Arahan | Penerangan |
|--------|------------|
| `npm run dev` | Mula pelayan pembangunan di localhost:3000 |
| `npm run build` | Cipta binaan pengeluaran yang dioptimumkan |
| `npm run start` | Mula pelayan pengeluaran |
| `npm run lint` | Jalankan semakan ESLint |

---

## Pengarang

**Ahli Kumpulan (DPM5A) — Politeknik Merlimau Melaka**

| Nama | No. Pendaftaran |
|------|-----------------|
| Nur Hafizah binti Abdul Aziz | 14DPM23F2007 |
| Siti Aishah binti Suhaimi | 14DPM23F2025 |
| Sathis Kumar A/L Arivanandan | 14DPM23F1803 |

**Projek Akhir** — Aplikasi Pengurusan Kewangan Pelajar Politeknik

---

## Lesen

Projek ini adalah sumber terbuka dan tersedia di bawah [Lesen MIT](LICENSE).
