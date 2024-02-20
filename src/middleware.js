import { NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt";
// import { getSession } from "next-auth/react"


// This function can be marked `async` if using `await` inside
// export async function middleware(request) {
//     const session = await getSession({ req: request });
//     console.log('do i have the fucking session')
//     console.log('sefseffesjfes;ojse;sjefesoij')
//     console.log(session)
//     const secret = process.env.NEXTAUTH_SECRET
//     try {
//         const token = await getToken({req: request, secret })
//         console.log(token)
//         if(!token) {
//             return NextResponse.redirect(new URL('/login', request.url))
    
//         }
//     }  catch (e) { 
//         console.log(e)
//         throw new Error(e)
//     }

    
    

// }
 
export { default } from "next-auth/middleware"

export const config = {
  matcher: '/dashboard',
}