

import SidebarLayout from "../_components/Layouts/SidebarLayout"
import DashboardLayout from "../_components/DashboardLayout"
export default async function Layout({children}) {
    return (
        < SidebarLayout>
            {children}
        </ SidebarLayout>
    )
}



