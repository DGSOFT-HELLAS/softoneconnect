export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server'
// This function can be marked `async` if using `await` inside
export async function middleware(request) {

  // const token = await getToken({
  //   req: request,
  //   secret: process.env.SECRET,
  //   encryption: true,
  // });
 
  // if (!token) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }


  // if (request.nextUrl.pathname === '/' && token) {
  //   return NextResponse.redirect(new URL('/dashboard/tickets', request.url))
  // }
  // if (request.nextUrl.pathname === '/' && !token) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  
}


export const config = {
  matcher: '/:path*',
}
