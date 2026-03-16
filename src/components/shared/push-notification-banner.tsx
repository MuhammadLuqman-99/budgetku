'use client';

import { useEffect, useState } from 'react';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isPushSupported, subscribeToPush } from '@/lib/push-notifications';

export function PushNotificationBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isPushSupported()) return;
    if (Notification.permission !== 'default') return;
    if (localStorage.getItem('push-notif-dismissed') === 'true') return;

    // Show after 3 second delay
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  async function handleAllow() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      await subscribeToPush();
    }
    setVisible(false);
  }

  function handleDismiss() {
    localStorage.setItem('push-notif-dismissed', 'true');
    setVisible(false);
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md rounded-lg border bg-background p-4 shadow-lg">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
          <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-sm">Aktifkan Notifikasi</p>
          <p className="text-xs text-muted-foreground mt-1">
            Terima peringatan harian untuk catat perbelanjaan anda.
          </p>
          <div className="flex gap-2 mt-3">
            <Button size="sm" onClick={handleAllow}>
              Benarkan
            </Button>
            <Button size="sm" variant="ghost" onClick={handleDismiss}>
              Tidak Sekarang
            </Button>
          </div>
        </div>
        <button onClick={handleDismiss} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
