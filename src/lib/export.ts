import type { Expense } from '@/types/expense';

export function exportToCSV(expenses: Expense[], filename: string = 'expenses') {
  const headers = ['Date', 'Description', 'Category', 'Amount (RM)', 'Notes'];
  const rows = expenses.map((e) => [
    e.expense_date,
    `"${e.description.replace(/"/g, '""')}"`,
    e.categories?.name || 'Others',
    (e.amount / 100).toFixed(2),
    `"${(e.notes || '').replace(/"/g, '""')}"`,
  ]);

  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();

  URL.revokeObjectURL(url);
}

export async function exportToPDF(expenses: Expense[], filename: string = 'expenses') {
  const { jsPDF } = await import('jspdf');
  const autoTable = (await import('jspdf-autotable')).default;

  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text('BudgetKu - Expense Report', 14, 22);

  // Date range
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on ${new Date().toLocaleDateString('en-MY')}`, 14, 30);

  // Total
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  doc.text(`Total: RM ${(total / 100).toFixed(2)}`, 14, 36);

  // Table
  autoTable(doc, {
    startY: 42,
    head: [['Date', 'Description', 'Category', 'Amount (RM)']],
    body: expenses.map((e) => [
      e.expense_date,
      e.description,
      e.categories?.name || 'Others',
      `RM ${(e.amount / 100).toFixed(2)}`,
    ]),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [37, 99, 235] },
  });

  doc.save(`${filename}_${new Date().toISOString().split('T')[0]}.pdf`);
}
