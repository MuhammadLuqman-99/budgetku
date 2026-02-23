'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useWeeklySummary } from '@/hooks/use-weekly-summary';
import { WeeklyChart } from '@/components/dashboard/weekly-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { formatRM } from '@/lib/format';
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface CategorySpending {
  category_id: string;
  category_name: string;
  category_color: string;
  total: number;
}

export default function AnalyticsPage() {
  const { data: weeklyData, totalWeekly, loading: weeklyLoading } = useWeeklySummary();
  const [categoryData, setCategoryData] = useState<CategorySpending[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategorySpending() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const now = new Date();
      const { data } = await supabase.rpc('get_category_spending', {
        p_user_id: user.id,
        p_month: now.getMonth() + 1,
        p_year: now.getFullYear(),
      });

      if (data) {
        setCategoryData(data.filter((d: CategorySpending) => d.total > 0));
      }
      setLoading(false);
    }

    fetchCategorySpending();
  }, []);

  if (loading && weeklyLoading) {
    return <LoadingSpinner className="py-12" />;
  }

  const now = new Date();
  const monthName = now.toLocaleString('en-MY', { month: 'long' });
  const totalMonthly = categoryData.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground">Insights into your spending patterns</p>
      </div>

      <WeeklyChart data={weeklyData} totalWeekly={totalWeekly} loading={weeklyLoading} />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Spending by Category ({monthName})
              </CardTitle>
              <span className="text-sm font-bold">{formatRM(totalMonthly)}</span>
            </div>
          </CardHeader>
          <CardContent>
            {categoryData.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-8">No spending data yet</p>
            ) : (
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData.map((d) => ({
                        name: d.category_name,
                        value: d.total / 100,
                        color: d.category_color,
                      }))}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={(props) => `${props.name || ''} ${(((props.percent as number) ?? 0) * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.category_color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`RM ${Number(value).toFixed(2)}`, 'Amount']}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {categoryData.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-8">No spending data yet</p>
            ) : (
              <div className="space-y-3">
                {categoryData.map((item) => {
                  const percentage = totalMonthly > 0 ? Math.round((item.total / totalMonthly) * 100) : 0;
                  return (
                    <div key={item.category_id} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: item.category_color }}
                          />
                          <span>{item.category_name}</span>
                        </div>
                        <span className="font-medium">{formatRM(item.total)}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${percentage}%`, backgroundColor: item.category_color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
