export interface Expense {
  id: string;
  user_id: string;
  category_id: string;
  description: string;
  amount: number; // In sen (cents), e.g., 850 = RM8.50
  expense_date: string; // ISO date string "2026-02-23"
  notes: string | null;
  created_at: string;
  updated_at: string;
  categories?: Category;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  is_default: boolean;
  sort_order: number;
}
