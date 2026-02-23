'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { parseRMToSen } from '@/lib/format';
import type { Budget } from '@/types/budget';

export function useBudget(month?: number, year?: number) {
  const now = new Date();
  const currentMonth = month ?? now.getMonth() + 1;
  const currentYear = year ?? now.getFullYear();

  const [budget, setBudget] = useState<Budget | null>(null);
  const [monthlySpending, setMonthlySpending] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchBudget = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    // Fetch budget
    const { data: budgetData } = await supabase
      .from('budgets')
      .select('*')
      .eq('user_id', user.id)
      .eq('month', currentMonth)
      .eq('year', currentYear)
      .single();

    setBudget(budgetData);

    // Fetch monthly spending
    const { data: spendingData } = await supabase.rpc('get_monthly_spending', {
      p_user_id: user.id,
      p_month: currentMonth,
      p_year: currentYear,
    });

    setMonthlySpending(spendingData ?? 0);
    setLoading(false);
  }, [currentMonth, currentYear]);

  useEffect(() => {
    fetchBudget();
  }, [fetchBudget]);

  const upsertBudget = async (values: { total_budget: number; alert_threshold_percent: number }) => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase.from('budgets').upsert(
      {
        user_id: user.id,
        month: currentMonth,
        year: currentYear,
        total_budget: parseRMToSen(values.total_budget),
        alert_threshold_percent: values.alert_threshold_percent,
      },
      {
        onConflict: 'user_id,month,year',
      }
    );

    if (error) throw error;
    await fetchBudget();
  };

  const remainingBudget = budget ? budget.total_budget - monthlySpending : 0;
  const spendingPercentage = budget ? Math.round((monthlySpending / budget.total_budget) * 100) : 0;
  const isOverBudget = budget ? monthlySpending > budget.total_budget : false;
  const isWarning = budget ? spendingPercentage >= (budget.alert_threshold_percent || 80) : false;

  return {
    budget,
    monthlySpending,
    remainingBudget,
    spendingPercentage,
    isOverBudget,
    isWarning,
    loading,
    refetch: fetchBudget,
    upsertBudget,
  };
}
