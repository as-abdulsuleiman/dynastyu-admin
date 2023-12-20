import { NextResponse } from 'next/server'
// import { getAuth } from "firebase/auth";

import type { NextRequest } from 'next/server'
import { projectAuth } from './services/firebase/config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
 
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

}