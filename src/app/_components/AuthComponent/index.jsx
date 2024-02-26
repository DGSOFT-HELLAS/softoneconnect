'use client'
import { useSession } from 'next-auth/react';
import {redirect} from 'next/navigation'

const AuthComponent = async ({redirectTo}) => {
    const {data: session} = useSession()
    console.log('session in auth component: ')
    console.log(session)
    if(!session) {
        redirect(redirectTo)
    }


    return (
        <div>
            <h1>AuthComponent</h1>
            <p>You are not authorized to see this content</p>
            <p>You will be redirected to the login page</p>
        </div>
    )
}

export default AuthComponent;