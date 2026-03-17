'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed (standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches
      || ('standalone' in window.navigator && (window.navigator as Record<string, unknown>).standalone === true);
    setIsStandalone(standalone);
    if (standalone) return;

    // Check if already dismissed
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) return;

    // Detect iOS
    const ua = window.navigator.userAgent;
    const isIOSDevice = /iPad|iPhone|iPod/.test(ua) || (ua.includes('Mac') && 'ontouchend' in document);
    setIsIOS(isIOSDevice);

    if (isIOSDevice) {
      // iOS doesn't support beforeinstallprompt, show banner directly
      setShowBanner(true);
      return;
    }

    // Android/Desktop - use beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  }

  function handleDismiss() {
    setShowBanner(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  }

  if (!showBanner || isStandalone) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-sm animate-in slide-in-from-bottom-4">
      <div className="rounded-xl border bg-card p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary">
            {isIOS ? <Share className="h-5 w-5 text-primary-foreground" /> : <Download className="h-5 w-5 text-primary-foreground" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Pasang SMARTSPENDIPT</p>
            {isIOS ? (
              <div className="mt-1.5 space-y-1.5">
                <p className="text-xs text-muted-foreground">
                  Untuk pasang di iPhone:
                </p>
                <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Tekan ikon <strong>Share</strong> <Share className="inline h-3 w-3" /> di bawah</li>
                  <li>Scroll dan tekan <strong>&quot;Add to Home Screen&quot;</strong></li>
                  <li>Tekan <strong>&quot;Add&quot;</strong> di penjuru kanan atas</li>
                </ol>
                <Button size="sm" variant="ghost" onClick={handleDismiss} className="h-8 text-xs mt-2">
                  Faham, terima kasih
                </Button>
              </div>
            ) : (
              <>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Tambah ke skrin utama untuk akses pantas dan sokongan luar talian.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <Button size="sm" onClick={handleInstall} className="h-8 text-xs">
                    Pasang App
                  </Button>
                  <Button size="sm" variant="ghost" onClick={handleDismiss} className="h-8 text-xs">
                    Bukan sekarang
                  </Button>
                </div>
              </>
            )}
          </div>
          <button onClick={handleDismiss} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
