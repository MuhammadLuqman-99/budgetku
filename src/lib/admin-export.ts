import type { AdminUserRow } from '@/types/auth';

export function exportUsersToCSV(users: AdminUserRow[]) {
  const headers = [
    'Full Name',
    'Email',
    'Matric Number',
    'Faculty',
    'Program',
    'University',
    'Registered Date',
    'Total Expenses',
    'Total Spending (RM)',
  ];

  const rows = users.map((u) => [
    `"${u.full_name.replace(/"/g, '""')}"`,
    u.email,
    u.matric_number || '',
    `"${(u.faculty || '').replace(/"/g, '""')}"`,
    `"${(u.program || '').replace(/"/g, '""')}"`,
    `"${(u.university || '').replace(/"/g, '""')}"`,
    u.created_at.split('T')[0],
    u.expense_count.toString(),
    (u.total_spending / 100).toFixed(2),
  ]);

  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `smartspendipt_users_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();

  URL.revokeObjectURL(url);
}
