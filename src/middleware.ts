import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('inzira_token')?.value;
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboard && !token) {
    // Redirect to login if token is missing in cookies
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
