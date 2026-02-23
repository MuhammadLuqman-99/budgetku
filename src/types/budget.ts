import { Category } from './expense';

export interface Budget {
  id: string;
  user_id: string;
  month: number;
  year: number;
  total_budget: number; // In sen (cents)
  alert_threshold_percent: number;
  created_at: string;
  updated_at: string;
  category_budgets?: CategoryBudget[];
}

export interface CategoryBudget {
  id: string;
  budget_id: string;
  category_id: string;
  allocated_amount: number; // In sen
  categories?: Category;
}
