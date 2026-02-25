'use client';

import { useAdminStats } from '@/hooks/use-admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { formatRM } from '@/lib/format';
import { Users, Receipt, Wallet, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminDashboardPage() {
  const { stats, loading } = useAdminStats();

  if (loading) return <LoadingSpinner className="py-12" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Ringkasan penggunaan aplikasi dan data pengguna
          </p>
        </div>
        <Link href="/admin/users">
          <Button>
            Senarai Pengguna
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Jumlah Pengguna
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total_users ?? 0}</div>
            <p className="text-xs text-muted-foreground">pengguna berdaftar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Jumlah Transaksi
            </CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total_expenses ?? 0}</div>
            <p className="text-xs text-muted-foreground">perbelanjaan direkodkan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Jumlah Perbelanjaan
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRM(stats?.total_spending ?? 0)}</div>
            <p className="text-xs text-muted-foreground">keseluruhan pengguna</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pengguna Aktif
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.users_with_budgets ?? 0}</div>
            <p className="text-xs text-muted-foreground">telah tetapkan bajet</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Statistik Penggunaan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Purata perbelanjaan per pengguna
              </span>
              <span className="font-medium">
                {stats?.avg_expenses_per_user ?? 0} transaksi
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Pengguna dengan bajet
              </span>
              <span className="font-medium">
                {stats?.total_users
                  ? Math.round(((stats.users_with_budgets ?? 0) / stats.total_users) * 100)
                  : 0}
                %
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
