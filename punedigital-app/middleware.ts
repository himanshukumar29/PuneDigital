import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Edge Middleware Route Guard
 * 
 * Protects internal agency tools (/agency and /api/pipeline/*) on public deployments (Vercel).
 * - On Localhost (your PC): Always accessible with 0 friction.
 * - On Vercel / Production: Returns a strict 404 Not Found to clients/visitors unless authorized.
 */
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Intercept /agency and /api/pipeline/*
  if (pathname.startsWith('/agency') || pathname.startsWith('/api/pipeline')) {
    const forwardedHost = request.headers.get('x-forwarded-host') || '';
    const host = (forwardedHost || request.headers.get('host') || request.nextUrl.hostname || '').toLowerCase();
    const isVercel = Boolean(process.env.VERCEL || process.env.NEXT_PUBLIC_VERCEL_ENV);
    const isLocalhost = !isVercel && (host.includes('localhost') || host.includes('127.0.0.1'));

    // 1. Local PC Mode: Always allowed without any credentials
    if (isLocalhost) {
      return NextResponse.next();
    }

    // 2. Production / Vercel Mode:
    const secretPasscode = process.env.AGENCY_SECRET_PASSCODE;

    // If no secret passcode is configured in Vercel env, completely cloak with 404 Not Found
    if (!secretPasscode) {
      return NextResponse.rewrite(new URL('/404', request.url), { status: 404 });
    }

    // 3. One-time secret link unlock: https://yourdomain.vercel.app/agency?secret=YOUR_PASSCODE
    const querySecret = searchParams.get('secret') || searchParams.get('key');
    if (querySecret && querySecret === secretPasscode) {
      const cleanUrl = new URL(request.url);
      cleanUrl.searchParams.delete('secret');
      cleanUrl.searchParams.delete('key');

      const response = NextResponse.redirect(cleanUrl);
      response.cookies.set('agency_session', secretPasscode, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30, // 30-day session
        path: '/',
      });
      return response;
    }

    // 4. Verify existing authenticated session cookie
    const sessionCookie = request.cookies.get('agency_session')?.value;
    if (sessionCookie && sessionCookie === secretPasscode) {
      return NextResponse.next();
    }

    // 5. Verify API header for programmatic calls
    const authHeader = request.headers.get('x-agency-secret');
    if (authHeader && authHeader === secretPasscode) {
      return NextResponse.next();
    }

    // 6. Cloak completely: Return 404 Page Not Found so clients see non-existent route
    return NextResponse.rewrite(new URL('/404', request.url), { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/agency/:path*', '/agency', '/api/pipeline/:path*'],
};
