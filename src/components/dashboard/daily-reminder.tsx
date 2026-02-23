'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ClipboardPen, PlusCircle } from 'lucide-react';

export function DailyReminder() {
  const [hasRecorded, setHasRecorded] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function check() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase.rpc('has_recorded_today', {
        p_user_id: user.id,
      });

      setHasRecorded(data ?? false);
      setLoading(false);
    }

    check();
  }, []);

  if (loading || hasRecorded) return null;

  return (
    <Alert className="border-blue-500/50 bg-blue-50/50 dark:bg-blue-950/20">
      <ClipboardPen className="h-4 w-4 text-blue-500" />
      <AlertTitle className="text-blue-700 dark:text-blue-400">Daily Reminder</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span className="text-blue-600 dark:text-blue-400 text-sm">
          You haven&apos;t recorded any expenses today. Don&apos;t forget to log your spending!
        </span>
        <Button asChild size="sm" variant="outline" className="ml-2 shrink-0">
          <Link href="/expenses/new">
            <PlusCircle className="h-3 w-3 mr-1" />
            Add Now
          </Link>
        </Button>
      </AlertDescription>
    </Alert>
  );
}
