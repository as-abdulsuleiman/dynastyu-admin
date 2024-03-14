import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
  const dynastyuToken = request.cookies.has('token_dynastyu')
  
  if (!dynastyuToken) {
    return NextResponse.redirect(new URL('/sign-in',request.nextUrl))
  }

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
  }
}

export const config = {
  matcher: ['/', '/dashboard', '/coaches', '/coach/:path*', '/settings','/fans', '/fan/:path*', "/athletes",'/athlete/:path*', '/schools', '/school/:path*', '/users', '/user/:path*', '/settings' ],
}