'use client';

import { useTheme } from 'next-themes';
import { APP_NAME } from '@/lib/constants';
import { useUIStore } from '@/stores/ui-store';
import { Button } from '@/components/ui/button';
import { Menu, Moon, Sun, Wallet } from 'lucide-react';

export function Header() {
  const { theme, setTheme } = useTheme();
  const { toggleSidebar } = useUIStore();

  return (
    <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-14 items-center px-4 gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2 lg:hidden">
          <Wallet className="h-5 w-5 text-primary" />
          <span className="font-bold">{APP_NAME}</span>
        </div>

        <div className="flex-1" />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
}
