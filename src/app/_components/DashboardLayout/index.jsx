
import { Nav } from "./nav"
import { SidebarItems } from "./sidebar"

export default function DashboardLayout({children}) {
    return (
        <section className="dash_wrapper">
            <Nav />
            <section className="dash_content">
                <SidebarItems />
                <main className="main">
                    <div>
                {children}

                    </div>
                </main>
            </section>
        </section>
    )
}