import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Route protection rules:
 *
 * PROTECTED (requires tnea_token cookie):
 *   /dashboard/**  → redirect to /login if no cookie
 *
 * AUTH-ONLY (redirect away if already logged in):
 *   /login         → redirect to /dashboard
 *   /register      → redirect to /dashboard
 *
 * PUBLIC (guests allowed):
 *   / /predict /college/** /guide /verify-email /forgot-password /reset-password
 *
 * Note: Middleware only checks cookie presence — actual JWT validation
 * happens server-side in Spring Boot. An expired/invalid cookie will
 * result in a 401 from the API, handled by the useAuth hook.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('tnea_token')?.value
  const isLoggedIn = !!token

  // Protected routes — must be logged in
  const protectedRoutes = ['/dashboard']
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Auth routes — redirect away if already logged in
  const authRoutes = ['/login', '/register']
  const isAuthRoute = authRoutes.includes(pathname)

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static, _next/image, favicon.ico
     * - API routes (handled by Next.js rewrites → Spring Boot)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
}