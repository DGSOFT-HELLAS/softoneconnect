'use client'
import { Moon, Sun, Menu as MenuIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import ThemeSwitch from "../ToggleTheme"
import Logo from "../Logo"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ProfileAvatar from "../ProfileAvatar"
import { sidebarStore } from "@/store"

 export function Nav() {
    const { setOpenSidebar } = sidebarStore()

    return (
        <div className="nav_container">
            <div>
            < Logo />
            <nav>
               <Button onClick={setOpenSidebar}  className="nav_burger" size="icon">
                    <MenuIcon   />
                </Button> 
            </nav>
            <div className="nav_buttons">
                <ThemeSwitch />
                <ProfileAvatar />
            </div>

            </div>
        </div>
    )
}









