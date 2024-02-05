import { NextResponse, NextRequest } from 'next/server'

export function middleware(request) {
	// Get a cookie
	request.cookies.get('auth-cookie')?.value
    console.log(request.cookies.getAll())
    console.log('middleware')
    let cookie = request.cookies.get('auth-cookie')?.value
    console.log(cookie)
	// Get all cookies

	// To change a cookie, first create a response
	
}