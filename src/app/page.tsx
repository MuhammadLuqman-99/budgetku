import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Wallet, TrendingDown, PieChart, Bell, Shield, Smartphone, ArrowRight, CheckCircle2, GraduationCap, Users, Target, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { APP_NAME, SURVEY_FORM_URL } from '@/lib/constants';

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">{APP_NAME}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log Masuk</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Mula Sekarang</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <GraduationCap className="h-4 w-4" />
            Projek Akhir — Diploma Pengajian Perniagaan (DPM5A)
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Kawal Kewangan Anda
            <span className="text-primary block mt-1">Sebagai Pelajar Politeknik</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            Rekod perbelanjaan harian, tetapkan bajet pintar, dan dapatkan ringkasan mingguan — semua dalam Ringgit Malaysia.
            Cara paling mudah untuk pelajar mengurus wang dengan bijak.
          </p>
          <p className="text-sm font-medium text-primary mb-10">
            Politeknik Merlimau Melaka
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="text-base px-8 h-12 w-full sm:w-auto">
                Mula Percuma
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="text-base px-8 h-12 w-full sm:w-auto">
                Saya ada akaun
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-4">Tiada kad kredit diperlukan. 100% percuma selamanya.</p>
        </div>
      </section>

      {/* Dashboard Preview Mock */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border bg-card shadow-2xl shadow-primary/5 overflow-hidden">
            <div className="border-b bg-muted/50 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-muted-foreground ml-2">smartspendipt.vercel.app</span>
            </div>
            <div className="p-6 sm:p-8">
              {/* Mock Dashboard */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
                  <p className="text-sm text-muted-foreground">Bajet Bulanan</p>
                  <p className="text-2xl font-bold mt-1">RM 800.00</p>
                  <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: '45%' }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">RM 360 dibelanjakan daripada RM 800</p>
                </div>
                <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-4">
                  <p className="text-sm text-muted-foreground">Baki</p>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">RM 440.00</p>
                  <p className="text-xs text-muted-foreground mt-3">55% bajet masih ada</p>
                </div>
                <div className="rounded-xl bg-amber-500/5 border border-amber-500/10 p-4">
                  <p className="text-sm text-muted-foreground">Perbelanjaan Hari Ini</p>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">RM 25.50</p>
                  <p className="text-xs text-muted-foreground mt-3">3 transaksi</p>
                </div>
              </div>
              {/* Mock Weekly Chart */}
              <div className="rounded-xl border p-4">
                <p className="text-sm font-medium mb-4">Perbelanjaan Mingguan</p>
                <div className="flex items-end gap-2 h-32">
                  {[40, 25, 65, 30, 80, 55, 20].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-md bg-primary/80 hover:bg-primary transition-colors"
                        style={{ height: `${h}%` }}
                      />
                      <span className="text-[10px] text-muted-foreground">
                        {['Isn', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab', 'Ahd'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tujuan Projek */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Target className="h-4 w-4" />
              Tujuan Projek
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Mengapa Aplikasi Ini Dibangunkan?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Projek ini dibangunkan untuk membantu pelajar politeknik mengurus kewangan peribadi dengan lebih berkesan.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: TrendingDown,
                title: 'Rekod Perbelanjaan Harian',
                description: 'Membantu pelajar merekod perbelanjaan harian dan mengkategorikan antara Keperluan dan Kehendak untuk kesedaran kewangan.',
                color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
              },
              {
                icon: Bell,
                title: 'Amaran Pintar',
                description: 'Memberi amaran pintar apabila baki rendah atau perbelanjaan kehendak terlalu tinggi supaya pelajar dapat mengawal perbelanjaan.',
                color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
              },
              {
                icon: PieChart,
                title: 'Ringkasan Mingguan',
                description: 'Menyediakan ringkasan mingguan untuk kesedaran kewangan dan cadangan tindakan bagi memperbaiki tabiat perbelanjaan.',
                color: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border bg-card p-6 text-center">
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-full ${item.color} mb-4`}>
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Semua Yang Anda Perlukan Untuk Mengurus Wang</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ciri-ciri ringkas dan berkuasa, direka khas untuk kehidupan pelajar politeknik.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: TrendingDown,
                title: 'Rekod Perbelanjaan',
                description: 'Rekod perbelanjaan harian mengikut kategori Keperluan dan Kehendak. Ketahui ke mana wang anda dibelanjakan.',
                color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
              },
              {
                icon: PieChart,
                title: 'Bajet Pintar',
                description: 'Tetapkan bajet bulanan dan lihat bar kemajuan visual. Ketahui baki perbelanjaan anda dengan tepat.',
                color: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
              },
              {
                icon: Bell,
                title: 'Amaran Pintar',
                description: 'Terima amaran apabila baki rendah atau perbelanjaan kehendak terlalu tinggi. Elak berbelanja melebihi had.',
                color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
              },
              {
                icon: Smartphone,
                title: 'Pasang Sebagai App',
                description: 'Pasang SMARTSPENDIPT di telefon anda seperti aplikasi biasa. Boleh digunakan secara offline — tanpa perlu app store.',
                color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
              },
              {
                icon: Shield,
                title: 'Selamat & Peribadi',
                description: 'Data kewangan anda dilindungi dengan keselamatan peringkat baris. Hanya anda boleh melihat perbelanjaan dan bajet anda.',
                color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
              },
              {
                icon: PieChart,
                title: 'Ringkasan Mingguan',
                description: 'Carta visual menunjukkan corak perbelanjaan mengikut hari dan kategori. Buat keputusan kewangan yang lebih bijak.',
                color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
              },
            ].map((feature, i) => (
              <div key={i} className="rounded-xl border bg-card p-6 hover:shadow-lg transition-shadow">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.color} mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Mula dalam 3 Langkah Mudah</h2>
            <p className="text-lg text-muted-foreground">Sedia digunakan dalam kurang dari seminit.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Cipta Akaun',
                description: 'Daftar dengan emel atau Google. Tiada pengesahan diperlukan untuk mula.',
              },
              {
                step: '2',
                title: 'Tetapkan Bajet',
                description: 'Masukkan bajet bulanan dalam RM. Tetapkan had amaran.',
              },
              {
                step: '3',
                title: 'Rekod Perbelanjaan',
                description: 'Tambah perbelanjaan setiap hari. Lihat papan pemuka dikemas kini secara langsung.',
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why SMARTSPENDIPT */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Kenapa {APP_NAME}?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Dibina khas untuk pelajar politeknik Malaysia',
              'Semua jumlah dalam Ringgit Malaysia (RM)',
              'Percuma selamanya — tiada pelan premium',
              'Berfungsi di semua peranti — telefon, tablet, laptop',
              'Pasang sebagai app — tanpa perlu app store',
              'Data anda peribadi dan selamat',
              'Mod gelap untuk pengurusan bajet waktu malam',
              'Eksport ke CSV dan PDF untuk laporan',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ahli Kumpulan */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Users className="h-4 w-4" />
              Ahli Kumpulan
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">Dibangunkan Oleh</h2>
            <p className="text-lg text-muted-foreground">
              Pelajar Diploma Pengajian Perniagaan (DPM5A)
            </p>
            <p className="text-sm font-medium text-primary mt-1">Politeknik Merlimau Melaka</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Nur Hafizah binti Abdul Aziz',
                id: '14DPM23F2007',
              },
              {
                name: 'Siti Aishah binti Suhaimi',
                id: '14DPM23F2025',
              },
              {
                name: 'Sathis Kumar A/L Arivanandan',
                id: '14DPM23F1803',
              },
            ].map((member, i) => (
              <div key={i} className="rounded-xl border bg-card p-6 text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold mb-4">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-sm font-semibold mb-1">{member.name}</h3>
                <p className="text-xs text-muted-foreground font-mono">{member.id}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-2xl bg-primary/5 border border-primary/10 p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Sedia Untuk Kawal Kewangan?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Sertai SMARTSPENDIPT hari ini dan mulakan perjalanan ke pengurusan kewangan yang lebih baik.
              Percuma, ringkas, dan dibina khas untuk anda.
            </p>
            <Link href="/register">
              <Button size="lg" className="text-base px-10 h-12">
                Cipta Akaun Percuma
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Survey Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-purple-50/50 dark:bg-purple-950/20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 dark:bg-purple-900/30 px-4 py-1.5 text-sm font-medium text-purple-700 dark:text-purple-400 mb-4">
            <ClipboardList className="h-4 w-4" />
            Borang Kajian
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Bantu Kami Menambah Baik Aplikasi Ini
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Sila isi borang kajian keberkesanan untuk membantu kami memahami pengalaman anda menggunakan {APP_NAME}.
            Maklum balas anda amat bermakna untuk kajian ini.
          </p>
          <a href={SURVEY_FORM_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white text-base px-8 h-12">
              <ClipboardList className="mr-2 h-5 w-5" />
              Isi Borang Kajian
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                <Wallet className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">{APP_NAME}</span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-medium">Projek Akhir — Diploma Pengajian Perniagaan (DPM5A)</p>
              <p>Politeknik Merlimau Melaka</p>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {APP_NAME}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
