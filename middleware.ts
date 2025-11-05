import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!_next|static|favicon.ico).*)'], // run for all routes except assets
};

export function middleware(req: NextRequest) {
  const ua = req.headers.get('user-agent') || '';
  // const url = req.nextUrl.clone();

  // Simple UA check (you can use a lib like 'ua-parser-js' for more accuracy)
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(ua);

  // Read existing cookie to avoid resetting unnecessarily
  const deviceCookie = req.cookies.get('device')?.value;
  if (deviceCookie === (isMobile ? 'mobile' : 'desktop')) {
    return NextResponse.next(); // nothing to change
  }

  // Clone response and set cookie
  const res = NextResponse.next();
  res.cookies.set({
    name: 'device',
    value: isMobile ? 'mobile' : 'desktop',
    path: '/',
    httpOnly: false,
  });

  return res;
}
