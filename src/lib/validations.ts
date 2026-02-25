import { z } from 'zod';

export const expenseSchema = z.object({
  description: z
    .string()
    .min(1, 'Description is required')
    .max(100, 'Description must be less than 100 characters'),
  amount: z
    .number({ error: 'Amount must be a valid number' })
    .positive('Amount must be greater than 0')
    .max(99999, 'Amount must be less than RM 99,999'),
  category_id: z.string().min(1, 'Please select a category'),
  expense_date: z.date({ error: 'Please select a date' }),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional().or(z.literal('')),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;

export const budgetSchema = z.object({
  total_budget: z
    .number({ error: 'Budget must be a valid number' })
    .positive('Budget must be greater than 0')
    .max(999999, 'Budget must be less than RM 999,999'),
  alert_threshold_percent: z
    .number()
    .min(50, 'Threshold must be at least 50%')
    .max(100, 'Threshold must be at most 100%'),
});

export type BudgetFormValues = z.infer<typeof budgetSchema>;

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    full_name: z.string().min(2, 'Name must be at least 2 characters'),
    matric_number: z
      .string()
      .min(3, 'Matric number must be at least 3 characters')
      .max(20, 'Matric number must be less than 20 characters'),
    faculty: z.string().max(100, 'Faculty must be less than 100 characters').optional().or(z.literal('')),
    program: z.string().max(100, 'Program must be less than 100 characters').optional().or(z.literal('')),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirm_password: z.string().min(6, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const profileSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  university: z.string().optional().or(z.literal('')),
  matric_number: z
    .string()
    .min(3, 'Matric number must be at least 3 characters')
    .max(20, 'Matric number must be less than 20 characters'),
  faculty: z.string().max(100, 'Faculty must be less than 100 characters').optional().or(z.literal('')),
  program: z.string().max(100, 'Program must be less than 100 characters').optional().or(z.literal('')),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const completeProfileSchema = z.object({
  matric_number: z
    .string()
    .min(3, 'Matric number must be at least 3 characters')
    .max(20, 'Matric number must be less than 20 characters'),
  faculty: z.string().max(100, 'Faculty must be less than 100 characters').optional().or(z.literal('')),
  program: z.string().max(100, 'Program must be less than 100 characters').optional().or(z.literal('')),
});

export type CompleteProfileFormValues = z.infer<typeof completeProfileSchema>;
