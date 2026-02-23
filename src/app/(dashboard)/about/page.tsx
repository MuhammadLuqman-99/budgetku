import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { APP_NAME, APP_VERSION } from '@/lib/constants';
import { Wallet, Target, BarChart3, Bell, Shield, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
          <Wallet className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold">{APP_NAME}</h1>
        <p className="text-muted-foreground">Student Financial Management App</p>
        <Badge variant="secondary">v{APP_VERSION}</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About This App</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {APP_NAME} is a student financial management application designed to help university
            students track their daily expenses and manage their finances more systematically. Built
            as a Final Year Project (FYP), this app aims to promote financial awareness among
            students.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            With rising costs of living, it is crucial for students to have a tool that allows them
            to monitor their spending habits, set budgets, and receive alerts when they are about to
            exceed their financial limits.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Objectives</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {[
              {
                icon: Target,
                title: 'Expense Tracking',
                description: 'Record and categorize daily expenses easily with a user-friendly interface.',
              },
              {
                icon: BarChart3,
                title: 'Financial Insights',
                description: 'View weekly summaries and spending patterns to understand your financial habits.',
              },
              {
                icon: Bell,
                title: 'Smart Alerts',
                description: 'Receive notifications when spending approaches or exceeds your set budget.',
              },
              {
                icon: Shield,
                title: 'Budget Management',
                description: 'Set monthly budgets and allocate spending limits per category.',
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
          <CardTitle>Technology Stack</CardTitle>
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
          Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for students
        </p>
        <p className="mt-1">Final Year Project (FYP) 2026</p>
      </div>
    </div>
  );
}
