'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExpenseForm } from '@/components/expenses/expense-form';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { useExpenses } from '@/hooks/use-expenses';
import { toast } from 'sonner';
import type { Expense } from '@/types/expense';
import type { ExpenseFormValues } from '@/lib/validations';

export default function EditExpensePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { updateExpense } = useExpenses();
  const [expense, setExpense] = useState<Expense | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchExpense() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('expenses')
        .select('*, categories(*)')
        .eq('id', id)
        .single();

      if (error || !data) {
        toast.error('Expense not found');
        router.push('/expenses');
        return;
      }

      setExpense(data);
      setLoading(false);
    }

    fetchExpense();
  }, [id, router]);

  async function handleSubmit(values: ExpenseFormValues) {
    setIsSubmitting(true);
    try {
      await updateExpense(id, values);
      toast.success('Expense updated successfully!');
      router.push('/expenses');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update expense');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return <LoadingSpinner className="py-12" />;
  }

  return (
    <div className="max-w-lg mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Edit Expense</CardTitle>
        </CardHeader>
        <CardContent>
          {expense && (
            <ExpenseForm
              defaultValues={{
                description: expense.description,
                amount: expense.amount / 100,
                category_id: expense.category_id,
                expense_date: new Date(expense.expense_date),
                notes: expense.notes || '',
              }}
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
              submitLabel="Update Expense"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
