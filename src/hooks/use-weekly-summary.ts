'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { getDayName } from '@/lib/format';

interface WeeklyData {
  day: string;
  date: string;
  amount: number;
}

export function useWeeklySummary() {
  const [data, setData] = useState<WeeklyData[]>([]);
  const [totalWeekly, setTotalWeekly] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchWeekly = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data: weeklyData } = await supabase.rpc('get_weekly_spending', {
      p_user_id: user.id,
    });

    if (weeklyData) {
      const formatted = weeklyData.map((item: { day: string; total: number }) => ({
        day: getDayName(item.day),
        date: item.day,
        amount: item.total / 100, // Convert sen to RM for chart display
      }));
      setData(formatted);
      setTotalWeekly(weeklyData.reduce((sum: number, item: { total: number }) => sum + item.total, 0));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchWeekly();
  }, [fetchWeekly]);

  return { data, totalWeekly, loading, refetch: fetchWeekly };
}
