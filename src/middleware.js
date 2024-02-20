import { NextResponse } from 'next/server'
import cookie from 'cookie'
import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    try {
        const token = await getToken({req: request, secret })
        if(!token) {
            return NextResponse.redirect(new URL('/login', request.url))
    
        }
    }  catch (e) {
        console.log(e)
        throw new Error(e)
    }
    
    

}
 
export const config = {
  matcher: '/dashboard',
}