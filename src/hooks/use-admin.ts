'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { AdminUserRow, AdminAppStats } from '@/types/auth';

export function useAdminUsers(search: string = '') {
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    const supabase = createClient();

    const { data, error: err } = await supabase.rpc('admin_get_all_users', {
      p_search: search,
      p_limit: 100,
      p_offset: 0,
    });

    if (err) {
      setError(err.message);
    } else {
      setUsers((data as AdminUserRow[]) || []);
    }
    setLoading(false);
  }, [search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, refetch: fetchUsers };
}

export function useAdminStats() {
  const [stats, setStats] = useState<AdminAppStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const supabase = createClient();
      const { data } = await supabase.rpc('admin_get_app_stats');
      if (data && Array.isArray(data) && data.length > 0) {
        setStats(data[0] as AdminAppStats);
      }
      setLoading(false);
    }
    fetchStats();
  }, []);

  return { stats, loading };
}
