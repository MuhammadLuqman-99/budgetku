'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { parseRMToSen } from '@/lib/format';
import { toISODateString } from '@/lib/format';
import type { Expense } from '@/types/expense';

interface UseExpensesFilters {
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export function useExpenses(filters?: UseExpensesFilters) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    const supabase = createClient();

    let query = supabase
      .from('expenses')
      .select('*, categories(*)')
      .order('expense_date', { ascending: false })
      .order('created_at', { ascending: false });

    if (filters?.categoryId) {
      query = query.eq('category_id', filters.categoryId);
    }
    if (filters?.startDate) {
      query = query.gte('expense_date', filters.startDate);
    }
    if (filters?.endDate) {
      query = query.lte('expense_date', filters.endDate);
    }
    if (filters?.search) {
      query = query.ilike('description', `%${filters.search}%`);
    }

    const { data, error: err } = await query;

    if (err) {
      setError(err.message);
    } else {
      setExpenses(data || []);
    }
    setLoading(false);
  }, [filters?.categoryId, filters?.startDate, filters?.endDate, filters?.search]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const addExpense = async (values: {
    description: string;
    amount: number;
    category_id: string;
    expense_date: Date;
    notes?: string;
  }) => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase.from('expenses').insert({
      user_id: user.id,
      description: values.description,
      amount: parseRMToSen(values.amount),
      category_id: values.category_id,
      expense_date: toISODateString(values.expense_date),
      notes: values.notes || null,
    });

    if (error) throw error;
    await fetchExpenses();
  };

  const updateExpense = async (
    id: string,
    values: {
      description: string;
      amount: number;
      category_id: string;
      expense_date: Date;
      notes?: string;
    }
  ) => {
    const supabase = createClient();

    const { error } = await supabase
      .from('expenses')
      .update({
        description: values.description,
        amount: parseRMToSen(values.amount),
        category_id: values.category_id,
        expense_date: toISODateString(values.expense_date),
        notes: values.notes || null,
      })
      .eq('id', id);

    if (error) throw error;
    await fetchExpenses();
  };

  const deleteExpense = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from('expenses').delete().eq('id', id);
    if (error) throw error;
    await fetchExpenses();
  };

  return { expenses, loading, error, refetch: fetchExpenses, addExpense, updateExpense, deleteExpense };
}
