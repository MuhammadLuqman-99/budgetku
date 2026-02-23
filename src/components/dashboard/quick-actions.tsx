'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle, Receipt, Wallet, BarChart3 } from 'lucide-react';

const actions = [
  { href: '/expenses/new', label: 'Add Expense', icon: PlusCircle, color: 'text-green-500' },
  { href: '/expenses', label: 'View History', icon: Receipt, color: 'text-blue-500' },
  { href: '/budget', label: 'Set Budget', icon: Wallet, color: 'text-purple-500' },
  { href: '/analytics', label: 'Analytics', icon: BarChart3, color: 'text-orange-500' },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {actions.map((action) => (
        <Link key={action.href} href={action.href}>
          <Card className="hover:bg-accent transition-colors cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center p-4 gap-2">
              <action.icon className={`h-6 w-6 ${action.color}`} />
              <span className="text-xs font-medium">{action.label}</span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
