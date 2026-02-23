'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatRM, formatRelativeTime } from '@/lib/format';
import { CATEGORY_COLORS } from '@/lib/constants';
import type { Expense } from '@/types/expense';
import { ArrowRight, Receipt } from 'lucide-react';

export function RecentTransactions() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const supabase = createClient();
      const { data } = await supabase
        .from('expenses')
        .select('*, categories(*)')
        .order('created_at', { ascending: false })
        .limit(5);

      setExpenses(data || []);
      setLoading(false);
    }

    fetch();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 animate-pulse bg-muted rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">Recent Transactions</CardTitle>
          <Button asChild variant="ghost" size="sm" className="text-xs">
            <Link href="/expenses">
              View All <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {expenses.length === 0 ? (
          <div className="text-center py-6">
            <Receipt className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No transactions yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {expenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <Badge
                    variant="secondary"
                    className={CATEGORY_COLORS[expense.categories?.slug || 'others']}
                  >
                    {expense.categories?.name || 'Others'}
                  </Badge>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{expense.description}</p>
                    <p className="text-xs text-muted-foreground">{formatRelativeTime(expense.created_at)}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold shrink-0 ml-2">
                  -{formatRM(expense.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
