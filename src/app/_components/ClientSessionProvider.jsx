'use client'
import { SessionProvider } from "next-auth/react"
const ClientSessionProvider = ({ children, session }) => {
    console.log('session ------a-a-a')
    console.log(session)
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}

export default ClientSessionProvider;