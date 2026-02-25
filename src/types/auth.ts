export interface Profile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  university: string | null;
  currency: string;
  role: 'user' | 'admin';
  matric_number: string | null;
  faculty: string | null;
  program: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminUserRow {
  id: string;
  full_name: string;
  email: string;
  matric_number: string | null;
  faculty: string | null;
  program: string | null;
  university: string | null;
  created_at: string;
  expense_count: number;
  total_spending: number;
}

export interface AdminUserExpense {
  id: string;
  description: string;
  amount: number;
  expense_date: string;
  notes: string | null;
  created_at: string;
  categories: {
    name: string;
    color: string;
    icon: string;
  } | null;
}

export interface AdminAppStats {
  total_users: number;
  total_expenses: number;
  total_spending: number;
  users_with_budgets: number;
  avg_expenses_per_user: number;
}
