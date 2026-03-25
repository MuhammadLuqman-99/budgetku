'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@/lib/supabase/client';
import { loginSchema, type LoginFormValues } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { toast } from 'sonner';
import { Loader2, Wallet } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);


  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    // Check if admin to redirect to admin dashboard
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      toast.success('Welcome back!');
      router.push(profile?.role === 'admin' ? '/admin' : '/dashboard');
      router.refresh();
    }
  }


  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
          <Wallet className="h-6 w-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl">{APP_NAME}</CardTitle>
        <CardDescription>Log masuk untuk mengurus kewangan anda</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>
        </Form>

      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Link href="/forgot-password" className="text-sm text-muted-foreground hover:text-primary">
          Forgot password?
        </Link>
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </p>
        <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
          ← Kembali ke Laman Utama
        </Link>
      </CardFooter>
    </Card>
  );
}
