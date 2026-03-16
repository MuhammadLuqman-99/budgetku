import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import webpush from 'web-push';

webpush.setVapidDetails(
  'mailto:smartspendipt@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Get users who need push reminders
  const { data: users, error } = await supabase.rpc('get_users_needing_push_reminder');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let sent = 0;
  let failed = 0;

  const payload = JSON.stringify({
    title: 'SMARTSPENDIPT',
    body: 'Anda belum catat perbelanjaan hari ini. Jom rekod sekarang!',
    url: '/expenses/new',
  });

  for (const user of users || []) {
    try {
      await webpush.sendNotification(user.push_subscription, payload);
      sent++;
    } catch (err: unknown) {
      failed++;
      // If subscription expired (410 Gone), remove it
      if (err && typeof err === 'object' && 'statusCode' in err && (err as { statusCode: number }).statusCode === 410) {
        await supabase
          .from('notification_settings')
          .update({ push_subscription: null })
          .eq('user_id', user.user_id);
      }
    }
  }

  return NextResponse.json({ sent, failed });
}
