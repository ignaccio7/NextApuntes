import NextAuth from 'next-auth';
import { auth as authConfig } from './auth.config';
 
export default authConfig;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};