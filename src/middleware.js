import { NextResponse, NextRequest } from 'next/server'

export function middleware(req) {
	// Get a cookie
    console.log('middleware')
	req.cookies.get('auth-cookie')?.value
    console.log(req.cookies.getAll())
    let cookie = req.cookies.get('auth-cookie')
    console.log(cookie)
    if(req.nextUrl.pathname.startsWith === '/login'){
        console.log('home')
    }


    

}

export const config = {
    matcher: ['/'],
  }