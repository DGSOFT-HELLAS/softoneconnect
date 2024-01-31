

'use client'
import { Nav } from "../_components/Nav"
export default function DashboardLayout({children}) {
    return (
        <section className="dash_wrapper">
             <Nav />
             <section className="dash_content">
                    <aside className="sidebar">
                        <p>sidebar</p>
                        <p>sidebar</p>
                    </aside>
                    <main className="main">{children}</main>
             </section>
        </section>
    )
}



