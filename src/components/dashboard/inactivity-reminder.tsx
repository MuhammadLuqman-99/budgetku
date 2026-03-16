'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { HandHeart, PlusCircle } from 'lucide-react';

const STORAGE_KEY = 'budgetku_last_active';
const INACTIVE_DAYS = 3;

export function InactivityReminder() {
  const { profile } = useAuth();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!profile) return;

    const lastActive = localStorage.getItem(STORAGE_KEY);
    let shouldShow = false;

    if (lastActive) {
      const daysSinceActive =
        (Date.now() - new Date(lastActive).getTime()) / (1000 * 60 * 60 * 24);
      shouldShow = daysSinceActive >= INACTIVE_DAYS;
    } else if (profile.created_at) {
      // First time check — only show if registered 3+ days ago
      const daysSinceRegistration =
        (Date.now() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24);
      shouldShow = daysSinceRegistration >= INACTIVE_DAYS;
    }

    setVisible(shouldShow);

    // Always update last active timestamp
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
  }, [profile]);

  if (!visible) return null;

  return (
    <Alert className="border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/20">
      <HandHeart className="h-4 w-4 text-amber-500" />
      <AlertTitle className="text-amber-700 dark:text-amber-400">Selamat Kembali!</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span className="text-amber-600 dark:text-amber-400 text-sm">
          Kami rindu anda! Jangan lupa catat perbelanjaan hari ini untuk kekal di landasan kewangan
          anda.
        </span>
        <Button asChild size="sm" variant="outline" className="ml-2 shrink-0">
          <Link href="/expenses/new">
            <PlusCircle className="h-3 w-3 mr-1" />
            Catat Sekarang
          </Link>
        </Button>
      </AlertDescription>
    </Alert>
  );
}
