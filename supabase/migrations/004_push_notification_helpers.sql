-- ============================================================
-- Migration 004: Push notification helper function
-- ============================================================

-- Get users who need daily push reminders
-- (haven't recorded expenses today, have push enabled and subscription active)
CREATE OR REPLACE FUNCTION public.get_users_needing_push_reminder()
RETURNS TABLE(user_id UUID, push_subscription JSONB) AS $$
  SELECT ns.user_id, ns.push_subscription
  FROM public.notification_settings ns
  WHERE ns.daily_reminder_enabled = true
    AND ns.push_subscription IS NOT NULL
    AND NOT EXISTS (
      SELECT 1 FROM public.expenses e
      WHERE e.user_id = ns.user_id
        AND e.expense_date = CURRENT_DATE
    );
$$ LANGUAGE sql STABLE SECURITY DEFINER;
