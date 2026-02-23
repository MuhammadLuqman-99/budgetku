'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { formatRM } from '@/lib/format';
import { AlertTriangle, AlertCircle } from 'lucide-react';

interface SmartAlertsProps {
  spendingPercentage: number;
  monthlySpending: number;
  totalBudget: number;
  thresholdPercent: number;
  hasBudget: boolean;
}

export function SmartAlerts({
  spendingPercentage,
  monthlySpending,
  totalBudget,
  thresholdPercent,
  hasBudget,
}: SmartAlertsProps) {
  if (!hasBudget) return null;

  if (spendingPercentage >= 100) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Budget Exceeded!</AlertTitle>
        <AlertDescription>
          You have spent {formatRM(monthlySpending)} which is {spendingPercentage}% of your{' '}
          {formatRM(totalBudget)} budget. Please review your spending.
        </AlertDescription>
      </Alert>
    );
  }

  if (spendingPercentage >= thresholdPercent) {
    return (
      <Alert className="border-orange-500/50 text-orange-700 dark:text-orange-400 [&>svg]:text-orange-500">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Budget Warning</AlertTitle>
        <AlertDescription>
          You have used {spendingPercentage}% of your monthly budget ({formatRM(monthlySpending)} of{' '}
          {formatRM(totalBudget)}). Consider slowing down your spending.
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
