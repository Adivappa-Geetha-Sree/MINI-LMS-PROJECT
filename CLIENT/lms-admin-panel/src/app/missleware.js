import { NextResponse } from 'next/server';

export function middleware(request) {
  const isLoggedIn = request.cookies.get('adminLoggedIn')?.value;

  const protectedRoutes = [
    '/dashboard',
    '/admin-details',
    '/change-password',
    // Add other protected routes here
  ];

  const { pathname } = request.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/dashboard/:path*', '/admin-details/:path*', '/change-password/:path*'],
};
