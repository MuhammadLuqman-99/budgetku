import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { subscription } = await request.json();

  if (!subscription) {
    return NextResponse.json({ error: 'Missing subscription' }, { status: 400 });
  }

  const { error } = await supabase
    .from('notification_settings')
    .upsert(
      {
        user_id: user.id,
        push_subscription: subscription,
        daily_reminder_enabled: true,
      },
      { onConflict: 'user_id' }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
