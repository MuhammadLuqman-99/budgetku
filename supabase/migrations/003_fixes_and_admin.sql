-- ============================================================
-- Migration 003: Fix orphan users + Add supervisor admin
-- ============================================================

-- Part 1: Fix orphan users (auth.users without matching profiles row)
-- This handles users who registered before migration 002 and may not have profile rows
INSERT INTO public.profiles (id, full_name, role)
SELECT
  u.id,
  COALESCE(u.raw_user_meta_data->>'full_name', u.email),
  'user'
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE p.id IS NULL;

-- Part 2: Add 4th admin (supervisor)
-- Supervisor must register first with email admin@bugetku.lecture.com
UPDATE public.profiles
SET role = 'admin'
WHERE id IN (
  SELECT id FROM auth.users
  WHERE email = 'admin@bugetku.lecture.com'
);
