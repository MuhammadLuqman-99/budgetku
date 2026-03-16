'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ClipboardList, X } from 'lucide-react';
import { SURVEY_FORM_URL } from '@/lib/constants';

const STORAGE_KEY_COMPLETED = 'survey_completed';
const STORAGE_KEY_DISMISSED = 'survey_dismissed_at';
const DAYS_BEFORE_SHOW = 14;
const DAYS_BEFORE_RESHOW = 3;

export function SurveyPrompt() {
  const { profile } = useAuth();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!profile?.created_at) return;

    // Already completed survey
    if (localStorage.getItem(STORAGE_KEY_COMPLETED) === 'true') return;

    // Check if registered >= 14 days ago
    const daysSinceRegistration =
      (Date.now() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceRegistration < DAYS_BEFORE_SHOW) return;

    // Check if dismissed recently
    const dismissedAt = localStorage.getItem(STORAGE_KEY_DISMISSED);
    if (dismissedAt) {
      const daysSinceDismissed =
        (Date.now() - new Date(dismissedAt).getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < DAYS_BEFORE_RESHOW) return;
    }

    setVisible(true);
  }, [profile?.created_at]);

  if (!visible) return null;

  function handleOpenForm() {
    window.open(SURVEY_FORM_URL, '_blank');
    localStorage.setItem(STORAGE_KEY_COMPLETED, 'true');
    setVisible(false);
  }

  function handleDismiss() {
    localStorage.setItem(STORAGE_KEY_DISMISSED, new Date().toISOString());
    setVisible(false);
  }

  return (
    <Alert className="border-purple-500/50 bg-purple-50/50 dark:bg-purple-950/20">
      <ClipboardList className="h-4 w-4 text-purple-500" />
      <AlertTitle className="text-purple-700 dark:text-purple-400">
        Borang Kajian Keberkesanan
      </AlertTitle>
      <AlertDescription className="flex items-center justify-between gap-2">
        <span className="text-purple-600 dark:text-purple-400 text-sm">
          Anda telah menggunakan SMARTSPENDIPT selama 2 minggu. Sila isi borang kajian keberkesanan
          untuk membantu kami menambah baik aplikasi ini.
        </span>
        <div className="flex shrink-0 gap-2">
          <Button size="sm" variant="outline" onClick={handleDismiss}>
            <X className="h-3 w-3 mr-1" />
            Nanti
          </Button>
          <Button
            size="sm"
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={handleOpenForm}
          >
            <ClipboardList className="h-3 w-3 mr-1" />
            Isi Borang
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
