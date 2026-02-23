import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Wallet, TrendingDown, PieChart, Bell, Shield, Smartphone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">{APP_NAME}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Wallet className="h-4 w-4" />
            Built for Malaysian Students
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Take Control of Your
            <span className="text-primary block mt-1">Student Finances</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Track daily expenses, set smart budgets, and get weekly insights — all in Ringgit Malaysia.
            The easiest way for students to manage money wisely.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="text-base px-8 h-12 w-full sm:w-auto">
                Start for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="text-base px-8 h-12 w-full sm:w-auto">
                I have an account
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-4">No credit card required. 100% free forever.</p>
        </div>
      </section>

      {/* Dashboard Preview Mock */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border bg-card shadow-2xl shadow-primary/5 overflow-hidden">
            <div className="border-b bg-muted/50 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-muted-foreground ml-2">budgetku-zeta.vercel.app</span>
            </div>
            <div className="p-6 sm:p-8">
              {/* Mock Dashboard */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
                  <p className="text-sm text-muted-foreground">Monthly Budget</p>
                  <p className="text-2xl font-bold mt-1">RM 800.00</p>
                  <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: '45%' }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">RM 360 spent of RM 800</p>
                </div>
                <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-4">
                  <p className="text-sm text-muted-foreground">Remaining</p>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">RM 440.00</p>
                  <p className="text-xs text-muted-foreground mt-3">55% budget remaining</p>
                </div>
                <div className="rounded-xl bg-amber-500/5 border border-amber-500/10 p-4">
                  <p className="text-sm text-muted-foreground">Today&apos;s Spending</p>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">RM 25.50</p>
                  <p className="text-xs text-muted-foreground mt-3">3 transactions</p>
                </div>
              </div>
              {/* Mock Weekly Chart */}
              <div className="rounded-xl border p-4">
                <p className="text-sm font-medium mb-4">Weekly Spending</p>
                <div className="flex items-end gap-2 h-32">
                  {[40, 25, 65, 30, 80, 55, 20].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-md bg-primary/80 hover:bg-primary transition-colors"
                        style={{ height: `${h}%` }}
                      />
                      <span className="text-[10px] text-muted-foreground">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything You Need to Manage Money</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, powerful features designed specifically for student life.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: TrendingDown,
                title: 'Expense Tracking',
                description: 'Record daily expenses with categories like Food, Transport, Education, and more. Never lose track of where your money goes.',
                color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
              },
              {
                icon: PieChart,
                title: 'Smart Budget',
                description: 'Set monthly budgets and get visual progress bars. See exactly how much you can still spend this month.',
                color: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
              },
              {
                icon: Bell,
                title: 'Budget Alerts',
                description: 'Get smart warnings when you reach 80% of your budget. Prevents overspending before it happens.',
                color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
              },
              {
                icon: Smartphone,
                title: 'Install as App',
                description: 'Install BudgetKu on your phone like a native app. Works offline and loads instantly — no app store needed.',
                color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
              },
              {
                icon: Shield,
                title: 'Secure & Private',
                description: 'Your financial data is protected with row-level security. Only you can see your expenses and budgets.',
                color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
              },
              {
                icon: PieChart,
                title: 'Weekly Reports',
                description: 'Visual charts show your spending patterns by day and category. Make smarter financial decisions with data.',
                color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
              },
            ].map((feature, i) => (
              <div key={i} className="rounded-xl border bg-card p-6 hover:shadow-lg transition-shadow">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.color} mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Start in 3 Simple Steps</h2>
            <p className="text-lg text-muted-foreground">Get up and running in less than a minute.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Create Account',
                description: 'Sign up with email or Google. No verification needed to start.',
              },
              {
                step: '2',
                title: 'Set Your Budget',
                description: 'Enter your monthly budget in RM. Set alert thresholds.',
              },
              {
                step: '3',
                title: 'Track Expenses',
                description: 'Add expenses daily. Watch your dashboard update in real-time.',
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why BudgetKu */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why {APP_NAME}?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Built specifically for Malaysian students',
              'All amounts in Ringgit Malaysia (RM)',
              'Free forever — no premium plans',
              'Works on any device — phone, tablet, laptop',
              'Install as app — no app store needed',
              'Your data is private and secure',
              'Dark mode for late-night budgeting',
              'Export to CSV and PDF for reports',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-2xl bg-primary/5 border border-primary/10 p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Take Control?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join BudgetKu today and start your journey to better financial management.
              It&apos;s free, simple, and built just for you.
            </p>
            <Link href="/register">
              <Button size="lg" className="text-base px-10 h-12">
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <Wallet className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">{APP_NAME}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Final Year Project — Student Financial Management System
          </p>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {APP_NAME}
          </p>
        </div>
      </footer>
    </div>
  );
}
