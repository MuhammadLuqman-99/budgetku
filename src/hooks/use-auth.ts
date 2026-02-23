'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { createClient } from '@/lib/supabase/client';

export function useAuth() {
  const { user, isLoading, hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();

    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        useAuthStore.setState({ user: session.user, isLoading: false });
      } else {
        useAuthStore.setState({ user: null, isLoading: false });
      }
    });

    return () => subscription.unsubscribe();
  }, [hydrate]);

  return { user, isLoading };
}
