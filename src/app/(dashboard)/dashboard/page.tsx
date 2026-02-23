'use client';

import { useBudget } from '@/hooks/use-budget';
import { useWeeklySummary } from '@/hooks/use-weekly-summary';
import { BudgetSummaryCard } from '@/components/dashboard/budget-summary-card';
import { WeeklyChart } from '@/components/dashboard/weekly-chart';
import { SmartAlerts } from '@/components/dashboard/smart-alerts';
import { DailyReminder } from '@/components/dashboard/daily-reminder';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';
import { QuickActions } from '@/components/dashboard/quick-actions';

export default function DashboardPage() {
  const {
    budget,
    monthlySpending,
    spendingPercentage,
    loading: budgetLoading,
  } = useBudget();

  const { data: weeklyData, totalWeekly, loading: weeklyLoading } = useWeeklySummary();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your financial activity</p>
      </div>

      <SmartAlerts
        spendingPercentage={spendingPercentage}
        monthlySpending={monthlySpending}
        totalBudget={budget?.total_budget ?? 0}
        thresholdPercent={budget?.alert_threshold_percent ?? 80}
        hasBudget={!!budget}
      />

      <DailyReminder />

      <QuickActions />

      <div className="grid gap-6 md:grid-cols-2">
        <BudgetSummaryCard
          totalBudget={budget?.total_budget ?? 0}
          monthlySpending={monthlySpending}
          spendingPercentage={spendingPercentage}
          loading={budgetLoading}
        />
        <WeeklyChart data={weeklyData} totalWeekly={totalWeekly} loading={weeklyLoading} />
      </div>

      <RecentTransactions />
    </div>
  );
}
