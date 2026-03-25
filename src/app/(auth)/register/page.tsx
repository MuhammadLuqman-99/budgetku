'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@/lib/supabase/client';
import { registerSchema, type RegisterFormValues } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { toast } from 'sonner';
import { Loader2, Wallet } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);


  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: '',
      matric_number: '',
      faculty: '',
      program: '',
      email: '',
      password: '',
      confirm_password: '',
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    setIsLoading(true);
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: values.full_name,
          matric_number: values.matric_number,
          faculty: values.faculty || null,
          program: values.program || null,
        },
      },
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    toast.success('Account created! Please check your email to verify your account.');
    router.push('/login');
  }


  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
          <Wallet className="h-6 w-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl">Create Account</CardTitle>
        <CardDescription>Sertai {APP_NAME} untuk mula mengurus kewangan anda</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ahmad bin Ali" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="matric_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombor Matrik</FormLabel>
                  <FormControl>
                    <Input placeholder="cth: 01DIP22F1234" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="faculty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fakulti / Jabatan (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="cth: Jabatan Teknologi Maklumat" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="program"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program Pengajian (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="cth: Diploma Teknologi Maklumat" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    <Input placeholder="Min 6 characters" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Re-enter your password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </form>
        </Form>

      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground w-full text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
