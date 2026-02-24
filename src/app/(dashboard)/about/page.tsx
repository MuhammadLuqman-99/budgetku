import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { APP_NAME, APP_VERSION } from '@/lib/constants';
import { Wallet, Target, BarChart3, Bell, Shield, Heart, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
          <Wallet className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold">{APP_NAME}</h1>
        <p className="text-muted-foreground">Aplikasi Pengurusan Kewangan Pelajar Politeknik</p>
        <Badge variant="secondary">v{APP_VERSION}</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tentang Aplikasi Ini</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {APP_NAME} adalah aplikasi pengurusan kewangan pelajar politeknik yang direka untuk membantu
            pelajar merekod perbelanjaan harian dan mengurus kewangan mereka dengan lebih sistematik.
            Dibina sebagai Projek Akhir (Final Project), aplikasi ini bertujuan untuk meningkatkan
            kesedaran kewangan dalam kalangan pelajar politeknik.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Dengan kos sara hidup yang semakin meningkat, adalah penting bagi pelajar untuk mempunyai
            alat yang membolehkan mereka memantau tabiat perbelanjaan (Keperluan vs Kehendak), menetapkan
            bajet, dan menerima amaran pintar apabila baki rendah atau perbelanjaan kehendak terlalu tinggi.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tujuan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {[
              {
                icon: Target,
                title: 'Rekod Perbelanjaan',
                description: 'Merekod perbelanjaan harian mengikut kategori Keperluan dan Kehendak dengan antara muka mesra pengguna.',
              },
              {
                icon: Bell,
                title: 'Amaran Pintar',
                description: 'Memberi amaran pintar apabila baki rendah atau perbelanjaan kehendak terlalu tinggi.',
              },
              {
                icon: BarChart3,
                title: 'Ringkasan Mingguan',
                description: 'Menyediakan ringkasan mingguan untuk kesedaran kewangan dan cadangan tindakan.',
              },
              {
                icon: Shield,
                title: 'Pengurusan Bajet',
                description: 'Tetapkan bajet bulanan dan peruntukkan had perbelanjaan mengikut kategori.',
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Ahli Kumpulan (DPM5A)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {[
              { name: 'Nur Hafizah binti Abdul Aziz', id: '14DPM23F2007' },
              { name: 'Siti Aishah binti Suhaimi', id: '14DPM23F2025' },
              { name: 'Sathis Kumar A/L Arivanandan', id: '14DPM23F1803' },
            ].map((member) => (
              <div key={member.id} className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-sm font-medium">{member.name}</span>
                <Badge variant="outline" className="font-mono text-xs">{member.id}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Teknologi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              'Next.js 14',
              'TypeScript',
              'Tailwind CSS',
              'shadcn/ui',
              'Supabase',
              'PWA',
              'Recharts',
            ].map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="text-center text-sm text-muted-foreground pb-4">
        <p className="flex items-center justify-center gap-1">
          Dibina dengan <Heart className="h-3 w-3 text-red-500 fill-red-500" /> untuk pelajar politeknik
        </p>
        <p className="mt-1">Projek Akhir (DPM5A) 2026 — Politeknik Merlimau Melaka</p>
      </div>
    </div>
  );
}
