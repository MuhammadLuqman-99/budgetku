'use client';

import { useAdminUserDetail } from '@/hooks/use-admin';
import { formatRM, formatDate } from '@/lib/format';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { EmptyState } from '@/components/shared/empty-state';
import { ArrowLeft, User, Receipt, Wallet, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function AdminUserDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const { profile, expenses, loading } = useAdminUserDetail(id);

  if (loading) return <LoadingSpinner className="py-12" />;

  const totalSpending = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin/users">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{profile?.full_name || 'Pengguna'}</h1>
          <p className="text-sm text-muted-foreground">Maklumat terperinci pengguna</p>
        </div>
      </div>

      {/* Profile Info Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">No. Matrik</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{profile?.matric_number || '-'}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Jumlah Transaksi</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{expenses.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Jumlah Perbelanjaan</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{formatRM(totalSpending)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tarikh Daftar</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {profile?.created_at ? formatDate(profile.created_at) : '-'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Info */}
      <Card>
        <CardHeader>
          <CardTitle>Maklumat Pelajar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Nama Penuh</p>
              <p className="font-medium">{profile?.full_name || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nombor Matrik</p>
              <p className="font-medium">{profile?.matric_number || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Fakulti / Jabatan</p>
              <p className="font-medium">{profile?.faculty || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Program Pengajian</p>
              <p className="font-medium">{profile?.program || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Universiti</p>
              <p className="font-medium">{profile?.university || '-'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Senarai Perbelanjaan ({expenses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {expenses.length === 0 ? (
            <EmptyState
              icon={Receipt}
              title="Tiada perbelanjaan"
              description="Pengguna ini belum merekodkan sebarang perbelanjaan"
            />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tarikh</TableHead>
                    <TableHead>Penerangan</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead className="text-right">Jumlah (RM)</TableHead>
                    <TableHead>Nota</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{formatDate(expense.expense_date)}</TableCell>
                      <TableCell className="font-medium">{expense.description}</TableCell>
                      <TableCell>
                        <span
                          className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
                          style={{
                            backgroundColor: `${expense.categories?.color}20`,
                            color: expense.categories?.color,
                          }}
                        >
                          {expense.categories?.name || 'Others'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatRM(expense.amount)}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {expense.notes || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
