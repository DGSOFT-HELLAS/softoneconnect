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
    const { openSidebar, setOpenSidebar } = sidebarStore()

    return (
        <div className="nav_container">
            < Logo />
            <nav>
               <Button onClick={setOpenSidebar} variant="outline" size="icon">
                    <MenuIcon className="h-[1.2rem] w-[1.2rem]"  />
                </Button> 
            </nav>
            <div className="nav_buttons">
                <ThemeSwitch />
                <ProfileAvatar />
            </div>

        </div>
    )
}



export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}





