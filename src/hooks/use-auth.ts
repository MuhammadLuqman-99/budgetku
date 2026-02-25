'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { createClient } from '@/lib/supabase/client';

export function useAuth() {
  const { user, profile, isAdmin, isLoading, hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();

    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        hydrate();
      } else {
        useAuthStore.setState({ user: null, profile: null, isAdmin: false, isLoading: false });
      }
    });

    return () => subscription.unsubscribe();
  }, [hydrate]);

  return { user, profile, isAdmin, isLoading };
}
