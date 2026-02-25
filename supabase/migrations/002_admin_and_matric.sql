-- =============================================================================
-- SMARTSPENDIPT - Admin & User Data Collection
-- Migration: 002_admin_and_matric.sql
-- =============================================================================

-- =============================================================================
-- 1. ADD NEW COLUMNS TO PROFILES
-- =============================================================================

-- Role column for admin access
ALTER TABLE public.profiles
  ADD COLUMN role TEXT NOT NULL DEFAULT 'user'
  CHECK (role IN ('user', 'admin'));

-- Student identification fields
ALTER TABLE public.profiles ADD COLUMN matric_number TEXT;
ALTER TABLE public.profiles ADD COLUMN faculty TEXT;
ALTER TABLE public.profiles ADD COLUMN program TEXT;

-- Indexes for admin queries
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_matric ON public.profiles(matric_number);

-- =============================================================================
-- 2. UPDATE HANDLE_NEW_USER TRIGGER
-- =============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url, matric_number, faculty, program)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NEW.raw_user_meta_data->>'avatar_url',
        NEW.raw_user_meta_data->>'matric_number',
        NEW.raw_user_meta_data->>'faculty',
        NEW.raw_user_meta_data->>'program'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- 3. ADMIN HELPER FUNCTION
-- =============================================================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- =============================================================================
-- 4. ADMIN RLS POLICIES
-- =============================================================================

-- Admin can view ALL profiles
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin());

-- Admin can view ALL expenses (for stats)
CREATE POLICY "Admins can view all expenses"
  ON public.expenses FOR SELECT
  USING (public.is_admin());

-- Admin can view ALL budgets (for stats)
CREATE POLICY "Admins can view all budgets"
  ON public.budgets FOR SELECT
  USING (public.is_admin());

-- =============================================================================
-- 5. ADMIN DATABASE FUNCTIONS
-- =============================================================================

-- Get app-wide statistics for admin dashboard
CREATE OR REPLACE FUNCTION public.admin_get_app_stats()
RETURNS TABLE(
  total_users BIGINT,
  total_expenses BIGINT,
  total_spending BIGINT,
  users_with_budgets BIGINT,
  avg_expenses_per_user NUMERIC
) AS $$
  SELECT
    (SELECT COUNT(*) FROM public.profiles WHERE role = 'user'),
    (SELECT COUNT(*) FROM public.expenses),
    (SELECT COALESCE(SUM(amount), 0) FROM public.expenses),
    (SELECT COUNT(DISTINCT user_id) FROM public.budgets),
    (SELECT ROUND(
      COUNT(*)::NUMERIC / NULLIF((SELECT COUNT(*) FROM public.profiles WHERE role = 'user'), 0), 1
    ) FROM public.expenses);
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Get all users with stats for admin listing
CREATE OR REPLACE FUNCTION public.admin_get_all_users(
  p_search TEXT DEFAULT '',
  p_limit INTEGER DEFAULT 50,
  p_offset INTEGER DEFAULT 0
)
RETURNS TABLE(
  id UUID,
  full_name TEXT,
  email TEXT,
  matric_number TEXT,
  faculty TEXT,
  program TEXT,
  university TEXT,
  created_at TIMESTAMPTZ,
  expense_count BIGINT,
  total_spending BIGINT
) AS $$
  SELECT
    p.id,
    p.full_name,
    u.email,
    p.matric_number,
    p.faculty,
    p.program,
    p.university,
    p.created_at,
    COALESCE(e.cnt, 0) AS expense_count,
    COALESCE(e.total, 0) AS total_spending
  FROM public.profiles p
  JOIN auth.users u ON u.id = p.id
  LEFT JOIN (
    SELECT user_id, COUNT(*) AS cnt, SUM(amount) AS total
    FROM public.expenses
    GROUP BY user_id
  ) e ON e.user_id = p.id
  WHERE p.role = 'user'
    AND (p_search = '' OR
         p.full_name ILIKE '%' || p_search || '%' OR
         p.matric_number ILIKE '%' || p_search || '%' OR
         u.email ILIKE '%' || p_search || '%')
  ORDER BY p.created_at DESC
  LIMIT p_limit OFFSET p_offset;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- =============================================================================
-- 6. SEED ADMIN USERS
-- =============================================================================

-- Set admin role for team members (by name or matric number)
UPDATE public.profiles
SET role = 'admin'
WHERE matric_number IN ('14DPM23F2007', '14DPM23F2025', '14DPM23F1803')
   OR full_name IN (
     'Nur Hafizah binti Abdul Aziz',
     'Siti Aishah binti Suhaimi',
     'Sathis Kumar A/L Arivanandan'
   );
