'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExpenseForm } from '@/components/expenses/expense-form';
import { useExpenses } from '@/hooks/use-expenses';
import { toast } from 'sonner';
import type { ExpenseFormValues } from '@/lib/validations';

export default function NewExpensePage() {
  const router = useRouter();
  const { addExpense } = useExpenses();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(values: ExpenseFormValues) {
    setIsLoading(true);
    try {
      await addExpense(values);
      toast.success('Expense added successfully!');
      router.push('/expenses');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to add expense');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseForm onSubmit={handleSubmit} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}
