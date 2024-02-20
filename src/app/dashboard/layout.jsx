

import { Nav } from "../_components/Nav"
import { SidebarItems } from "../_components/Sidebar"
import { getSession } from "next-auth/react"
export default async function DashboardLayout({children}) {
    const session = await getSession()
    console.log('fuckjing session')
    console.log(session)

    return (
        <section className="dash_wrapper">
             <Nav />
             <section className="dash_content">
                        <SidebarItems />
                    <main className="main">{children}</main>
             </section>
        </section>
    )
}



