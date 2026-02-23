export const CATEGORIES = [
  { name: 'Food & Drinks', slug: 'food', icon: 'utensils', color: '#F59E0B' },
  { name: 'Transport', slug: 'transport', icon: 'car', color: '#3B82F6' },
  { name: 'Education', slug: 'education', icon: 'book-open', color: '#8B5CF6' },
  { name: 'Entertainment', slug: 'entertainment', icon: 'gamepad-2', color: '#EC4899' },
  { name: 'Shopping', slug: 'shopping', icon: 'shopping-bag', color: '#10B981' },
  { name: 'Bills & Utilities', slug: 'bills', icon: 'receipt', color: '#EF4444' },
  { name: 'Others', slug: 'others', icon: 'ellipsis', color: '#6B7280' },
] as const;

export const CATEGORY_COLORS: Record<string, string> = {
  food: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  transport: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  education: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400',
  entertainment: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
  shopping: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  bills: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  others: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
};

export const BUDGET_THRESHOLDS = {
  WARNING: 80,
  CRITICAL: 100,
} as const;

export const APP_NAME = 'BudgetKu';
export const APP_DESCRIPTION = 'Student Financial Management App';
export const APP_VERSION = '1.0.0';
