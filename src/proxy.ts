import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const intlMiddleware = createMiddleware(routing);

const SECRET_KEY = process.env.JWT_SECRET || 'fallback_secret_for_development_only';
const key = new TextEncoder().encode(SECRET_KEY);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.includes('/admin') && !pathname.includes('/admin/login') && !pathname.startsWith('/api/');

  if (isAdminRoute) {
    const session = request.cookies.get('admin_token')?.value;

    if (!session) {
      const loginUrl = new URL(`/en/admin/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      await jwtVerify(session, key, { algorithms: ['HS256'] });
    } catch (error) {
      const loginUrl = new URL(`/en/admin/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
