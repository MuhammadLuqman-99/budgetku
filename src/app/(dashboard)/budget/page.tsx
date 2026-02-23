'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBudget } from '@/hooks/use-budget';
import { budgetSchema, type BudgetFormValues } from '@/lib/validations';
import { formatRM } from '@/lib/format';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Loader2, Wallet } from 'lucide-react';

export default function BudgetPage() {
  const {
    budget,
    monthlySpending,
    remainingBudget,
    spendingPercentage,
    isOverBudget,
    loading,
    upsertBudget,
  } = useBudget();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetSchema),
    values: {
      total_budget: budget ? budget.total_budget / 100 : 0,
      alert_threshold_percent: budget?.alert_threshold_percent ?? 80,
    },
  });

  async function onSubmit(values: BudgetFormValues) {
    setIsSubmitting(true);
    try {
      await upsertBudget(values);
      toast.success('Budget updated successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update budget');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return <LoadingSpinner className="py-12" />;
  }

  const now = new Date();
  const monthName = now.toLocaleString('en-MY', { month: 'long' });
  const year = now.getFullYear();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Budget Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your budget for {monthName} {year}
        </p>
      </div>

      {budget && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Month Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-muted-foreground">Budget</p>
                <p className="text-lg font-bold">{formatRM(budget.total_budget)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Spent</p>
                <p className="text-lg font-bold text-orange-500">{formatRM(monthlySpending)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Remaining</p>
                <p className={cn('text-lg font-bold', isOverBudget ? 'text-red-500' : 'text-green-500')}>
                  {isOverBudget ? '-' : ''}{formatRM(Math.abs(remainingBudget))}
                </p>
              </div>
            </div>
            <Progress
              value={Math.min(spendingPercentage, 100)}
              className={cn(
                'h-3',
                spendingPercentage >= 100
                  ? '[&>div]:bg-red-500'
                  : spendingPercentage >= 80
                  ? '[&>div]:bg-orange-500'
                  : '[&>div]:bg-green-500'
              )}
            />
            <p className="text-xs text-center text-muted-foreground">
              {spendingPercentage}% of budget used
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Set Monthly Budget
          </CardTitle>
          <CardDescription>
            Set your spending limit for {monthName} {year}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="total_budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Budget (RM)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          RM
                        </span>
                        <Input
                          type="number"
                          step="1"
                          min="0"
                          placeholder="500"
                          className="pl-10 text-lg"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : 0)}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>Enter your total monthly spending limit</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="alert_threshold_percent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Alert Threshold: {field.value}%
                    </FormLabel>
                    <FormControl>
                      <Slider
                        min={50}
                        max={100}
                        step={5}
                        value={[field.value]}
                        onValueChange={(v) => field.onChange(v[0])}
                      />
                    </FormControl>
                    <FormDescription>
                      You will receive a warning when your spending reaches {field.value}% of your budget
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {budget ? 'Update Budget' : 'Set Budget'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
