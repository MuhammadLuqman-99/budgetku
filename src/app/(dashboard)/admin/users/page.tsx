'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminUsers } from '@/hooks/use-admin';
import { useDebounce } from '@/hooks/use-debounce';
import { exportUsersToCSV } from '@/lib/admin-export';
import { formatRM, formatDate } from '@/lib/format';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
import { Download, Search, ArrowLeft, Users } from 'lucide-react';
import Link from 'next/link';

export default function AdminUsersPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const { users, loading } = useAdminUsers(debouncedSearch);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Senarai Pengguna</h1>
            <p className="text-sm text-muted-foreground">
              {users.length} pengguna berdaftar
            </p>
          </div>
        </div>
        <Button
          onClick={() => exportUsersToCSV(users)}
          variant="outline"
          disabled={users.length === 0}
        >
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari nama, email, atau nombor matrik..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <LoadingSpinner className="py-8" />
          ) : users.length === 0 ? (
            <EmptyState
              icon={Users}
              title="Tiada pengguna"
              description={search ? 'Tiada pengguna dijumpai untuk carian ini' : 'Belum ada pengguna berdaftar'}
            />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>No. Matrik</TableHead>
                    <TableHead>Fakulti</TableHead>
                    <TableHead className="text-right">Transaksi</TableHead>
                    <TableHead className="text-right">Jumlah</TableHead>
                    <TableHead>Tarikh Daftar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      key={user.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => router.push(`/admin/users/${user.id}`)}
                    >
                      <TableCell>
                        <div className="font-medium">{user.full_name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </TableCell>
                      <TableCell>{user.matric_number || '-'}</TableCell>
                      <TableCell>{user.faculty || '-'}</TableCell>
                      <TableCell className="text-right">{user.expense_count}</TableCell>
                      <TableCell className="text-right">{formatRM(user.total_spending)}</TableCell>
                      <TableCell>{formatDate(user.created_at)}</TableCell>
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
