

import { SidebarContent } from "../_components/Nav"
import { Nav } from "../_components/Nav"
export default function DashboardLayout({children}) {
    return (
        <section className="dash_wrapper">
             <Nav />
             <section className="dash_content">
                       <SidebarContent />
                    <main className="main">{children}</main>
             </section>
        </section>
    )
}



