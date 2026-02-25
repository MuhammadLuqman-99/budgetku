'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@/lib/supabase/client';
import { completeProfileSchema, type CompleteProfileFormValues } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { Loader2, UserCheck } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

export default function CompleteProfilePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CompleteProfileFormValues>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      matric_number: '',
      faculty: '',
      program: '',
    },
  });

  async function onSubmit(values: CompleteProfileFormValues) {
    setIsSubmitting(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error('Not authenticated');
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        matric_number: values.matric_number,
        faculty: values.faculty || null,
        program: values.program || null,
      })
      .eq('id', user.id);

    if (error) {
      toast.error(error.message);
      setIsSubmitting(false);
      return;
    }

    toast.success('Profile completed!');
    router.push('/dashboard');
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <UserCheck className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Lengkapkan Profil</CardTitle>
          <CardDescription>
            Sila lengkapkan maklumat anda untuk meneruskan menggunakan {APP_NAME}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="matric_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombor Matrik *</FormLabel>
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
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Simpan & Teruskan
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
