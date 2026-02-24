-- =============================================================================
-- SMARTSPENDIPT - Database Schema
-- Migration: 001_initial_schema.sql
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- 1. PROFILES TABLE (extends Supabase auth.users)
-- =============================================================================
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    university TEXT,
    currency TEXT NOT NULL DEFAULT 'MYR',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- 2. CATEGORIES TABLE
-- =============================================================================
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    icon TEXT NOT NULL DEFAULT 'circle',
    color TEXT NOT NULL DEFAULT '#6B7280',
    is_default BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.categories (name, slug, icon, color, sort_order) VALUES
    ('Food & Drinks',     'food',          'utensils',       '#F59E0B', 1),
    ('Transport',         'transport',     'car',            '#3B82F6', 2),
    ('Education',         'education',     'book-open',      '#8B5CF6', 3),
    ('Entertainment',     'entertainment', 'gamepad-2',      '#EC4899', 4),
    ('Shopping',          'shopping',      'shopping-bag',   '#10B981', 5),
    ('Bills & Utilities', 'bills',         'receipt',        '#EF4444', 6),
    ('Others',            'others',        'ellipsis',       '#6B7280', 7);

-- =============================================================================
-- 3. EXPENSES TABLE
-- =============================================================================
CREATE TABLE public.expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
    description TEXT NOT NULL,
    amount INTEGER NOT NULL CHECK (amount > 0),
    expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_expenses_user_date ON public.expenses(user_id, expense_date DESC);
CREATE INDEX idx_expenses_user_category ON public.expenses(user_id, category_id);

-- =============================================================================
-- 4. BUDGETS TABLE
-- =============================================================================
CREATE TABLE public.budgets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    month INTEGER NOT NULL CHECK (month BETWEEN 1 AND 12),
    year INTEGER NOT NULL CHECK (year >= 2024),
    total_budget INTEGER NOT NULL CHECK (total_budget > 0),
    alert_threshold_percent INTEGER NOT NULL DEFAULT 80 CHECK (
        alert_threshold_percent BETWEEN 50 AND 100
    ),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(user_id, month, year)
);

-- =============================================================================
-- 5. CATEGORY BUDGETS TABLE
-- =============================================================================
CREATE TABLE public.category_budgets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    budget_id UUID NOT NULL REFERENCES public.budgets(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
    allocated_amount INTEGER NOT NULL CHECK (allocated_amount >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(budget_id, category_id)
);

-- =============================================================================
-- 6. NOTIFICATION SETTINGS TABLE
-- =============================================================================
CREATE TABLE public.notification_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    daily_reminder_enabled BOOLEAN NOT NULL DEFAULT true,
    daily_reminder_time TIME NOT NULL DEFAULT '21:00',
    budget_alert_enabled BOOLEAN NOT NULL DEFAULT true,
    push_subscription JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(user_id)
);

-- =============================================================================
-- 7. ROW LEVEL SECURITY (RLS)
-- =============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_settings ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Categories (public read)
CREATE POLICY "Authenticated users can read categories" ON public.categories FOR SELECT TO authenticated USING (true);

-- Expenses
CREATE POLICY "Users can view own expenses" ON public.expenses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own expenses" ON public.expenses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own expenses" ON public.expenses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own expenses" ON public.expenses FOR DELETE USING (auth.uid() = user_id);

-- Budgets
CREATE POLICY "Users can view own budgets" ON public.budgets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own budgets" ON public.budgets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own budgets" ON public.budgets FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own budgets" ON public.budgets FOR DELETE USING (auth.uid() = user_id);

-- Category Budgets
CREATE POLICY "Users can view own category budgets" ON public.category_budgets FOR SELECT
    USING (EXISTS (SELECT 1 FROM public.budgets WHERE budgets.id = category_budgets.budget_id AND budgets.user_id = auth.uid()));
CREATE POLICY "Users can create own category budgets" ON public.category_budgets FOR INSERT
    WITH CHECK (EXISTS (SELECT 1 FROM public.budgets WHERE budgets.id = category_budgets.budget_id AND budgets.user_id = auth.uid()));
CREATE POLICY "Users can update own category budgets" ON public.category_budgets FOR UPDATE
    USING (EXISTS (SELECT 1 FROM public.budgets WHERE budgets.id = category_budgets.budget_id AND budgets.user_id = auth.uid()));
CREATE POLICY "Users can delete own category budgets" ON public.category_budgets FOR DELETE
    USING (EXISTS (SELECT 1 FROM public.budgets WHERE budgets.id = category_budgets.budget_id AND budgets.user_id = auth.uid()));

-- Notification Settings
CREATE POLICY "Users can view own notification settings" ON public.notification_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own notification settings" ON public.notification_settings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own notification settings" ON public.notification_settings FOR UPDATE USING (auth.uid() = user_id);

-- =============================================================================
-- 8. DATABASE FUNCTIONS
-- =============================================================================

-- Get monthly spending total
CREATE OR REPLACE FUNCTION public.get_monthly_spending(p_user_id UUID, p_month INTEGER, p_year INTEGER)
RETURNS INTEGER AS $$
    SELECT COALESCE(SUM(amount), 0)::INTEGER
    FROM public.expenses
    WHERE user_id = p_user_id
    AND EXTRACT(MONTH FROM expense_date) = p_month
    AND EXTRACT(YEAR FROM expense_date) = p_year;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Get weekly spending breakdown (last 7 days)
CREATE OR REPLACE FUNCTION public.get_weekly_spending(p_user_id UUID)
RETURNS TABLE(day DATE, total INTEGER) AS $$
    SELECT
        d::DATE AS day,
        COALESCE(SUM(e.amount), 0)::INTEGER AS total
    FROM generate_series(CURRENT_DATE - INTERVAL '6 days', CURRENT_DATE, '1 day') d
    LEFT JOIN public.expenses e ON e.expense_date = d::DATE AND e.user_id = p_user_id
    GROUP BY d::DATE
    ORDER BY d::DATE;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Get spending by category for a month
CREATE OR REPLACE FUNCTION public.get_category_spending(p_user_id UUID, p_month INTEGER, p_year INTEGER)
RETURNS TABLE(category_id UUID, category_name TEXT, category_color TEXT, total INTEGER) AS $$
    SELECT
        c.id AS category_id,
        c.name AS category_name,
        c.color AS category_color,
        COALESCE(SUM(e.amount), 0)::INTEGER AS total
    FROM public.categories c
    LEFT JOIN public.expenses e ON e.category_id = c.id AND e.user_id = p_user_id
        AND EXTRACT(MONTH FROM e.expense_date) = p_month
        AND EXTRACT(YEAR FROM e.expense_date) = p_year
    GROUP BY c.id, c.name, c.color
    ORDER BY total DESC;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Check if user has recorded expenses today
CREATE OR REPLACE FUNCTION public.has_recorded_today(p_user_id UUID)
RETURNS BOOLEAN AS $$
    SELECT EXISTS (SELECT 1 FROM public.expenses WHERE user_id = p_user_id AND expense_date = CURRENT_DATE);
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_expenses_updated_at BEFORE UPDATE ON public.expenses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_budgets_updated_at BEFORE UPDATE ON public.budgets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_notification_settings_updated_at BEFORE UPDATE ON public.notification_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
