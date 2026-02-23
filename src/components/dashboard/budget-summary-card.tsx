'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatRM } from '@/lib/format';
import { cn } from '@/lib/utils';
import { Wallet, TrendingDown, TrendingUp } from 'lucide-react';

interface BudgetSummaryCardProps {
  totalBudget: number;
  monthlySpending: number;
  spendingPercentage: number;
  loading?: boolean;
}

export function BudgetSummaryCard({
  totalBudget,
  monthlySpending,
  spendingPercentage,
  loading,
}: BudgetSummaryCardProps) {
  const remaining = totalBudget - monthlySpending;
  const isOverBudget = remaining < 0;

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Budget Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-20 animate-pulse bg-muted rounded" />
        </CardContent>
      </Card>
    );
  }

  if (totalBudget === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Budget Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <Wallet className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No budget set for this month</p>
            <p className="text-xs text-muted-foreground mt-1">Go to Budget settings to set one</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Budget Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Budget</p>
            <p className="text-lg font-bold">{formatRM(totalBudget)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Spent</p>
            <p className="text-lg font-bold text-orange-500">{formatRM(monthlySpending)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Remaining</p>
            <p className={cn('text-lg font-bold', isOverBudget ? 'text-red-500' : 'text-green-500')}>
              {formatRM(Math.abs(remaining))}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className={cn('font-medium', spendingPercentage >= 100 ? 'text-red-500' : spendingPercentage >= 80 ? 'text-orange-500' : '')}>
              {spendingPercentage}%
            </span>
          </div>
          <Progress
            value={Math.min(spendingPercentage, 100)}
            className={cn(
              'h-2',
              spendingPercentage >= 100
                ? '[&>div]:bg-red-500'
                : spendingPercentage >= 80
                ? '[&>div]:bg-orange-500'
                : spendingPercentage >= 60
                ? '[&>div]:bg-yellow-500'
                : '[&>div]:bg-green-500'
            )}
          />
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          {isOverBudget ? (
            <>
              <TrendingUp className="h-3 w-3 text-red-500" />
              <span className="text-red-500">Over budget by {formatRM(Math.abs(remaining))}</span>
            </>
          ) : (
            <>
              <TrendingDown className="h-3 w-3 text-green-500" />
              <span>{formatRM(remaining)} left to spend</span>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
