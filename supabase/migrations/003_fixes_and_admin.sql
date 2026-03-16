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
-- TODO: Replace 'SUPERVISOR_MATRIC' and 'SUPERVISOR_NAME' with actual values
-- Uncomment and run once supervisor details are provided:
-- UPDATE public.profiles
-- SET role = 'admin'
-- WHERE matric_number = 'SUPERVISOR_MATRIC'
--    OR full_name = 'SUPERVISOR_NAME';
