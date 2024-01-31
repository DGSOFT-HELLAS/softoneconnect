

import { Nav } from "../_components/Nav"
import { SidebarItems } from "../_components/Sidebar"
export default function DashboardLayout({children}) {
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



