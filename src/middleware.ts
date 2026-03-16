import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect unauthenticated users away from protected routes
  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/register') &&
    !request.nextUrl.pathname.startsWith('/forgot-password') &&
    !request.nextUrl.pathname.startsWith('/auth') &&
    request.nextUrl.pathname !== '/'
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from auth pages
  if (
    user &&
    (request.nextUrl.pathname.startsWith('/login') ||
      request.nextUrl.pathname.startsWith('/register') ||
      request.nextUrl.pathname.startsWith('/forgot-password'))
  ) {
    // Check if admin to redirect to admin dashboard instead
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const url = request.nextUrl.clone();
    url.pathname = profile?.role === 'admin' ? '/admin' : '/dashboard';
    return NextResponse.redirect(url);
  }

  // Fetch profile once for all remaining checks
  if (
    user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/register') &&
    !request.nextUrl.pathname.startsWith('/forgot-password') &&
    !request.nextUrl.pathname.startsWith('/auth') &&
    request.nextUrl.pathname !== '/'
  ) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, matric_number')
      .eq('id', user.id)
      .single();

    const isAdmin = profile?.role === 'admin';

    // If no profile exists (pre-migration user), redirect to complete profile
    if (
      !profile &&
      !request.nextUrl.pathname.startsWith('/profile/complete')
    ) {
      const url = request.nextUrl.clone();
      url.pathname = '/profile/complete';
      return NextResponse.redirect(url);
    }

    // Redirect admin users from /dashboard to /admin
    if (isAdmin && request.nextUrl.pathname === '/dashboard') {
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }

    // Protect admin routes - non-admin cannot access
    if (!isAdmin && request.nextUrl.pathname.startsWith('/admin')) {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }

    // Redirect users without matric number to complete profile
    if (
      !isAdmin &&
      !request.nextUrl.pathname.startsWith('/profile/complete') &&
      profile &&
      !profile.matric_number
    ) {
      const url = request.nextUrl.clone();
      url.pathname = '/profile/complete';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons|manifest\\.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
