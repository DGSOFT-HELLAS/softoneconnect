'use client'
import { useState, useEffect } from "react"
import { Moon, Sun, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import ThemeSwitch from "./ToggleTheme"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { menuData } from "@/menuConfig"
import Link from "next/link"
import Logo from "./Logo"
import ProfileAvatar from "./ProfileAvatar"


export function Nav() {
    return (
        <div className="nav_container">
           
            < Logo />
            <nav>
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



function Profile() {
    return (
        <div className="avatar_container">
            <Button className="h-10 w-10"   >
                <span >JC</span>
            </Button>
            <div className="avatar_text">
                <p>John Chioutakos</p>
                <span>@admin</span>
            </div>
        </div>
    )
}


export function SidebarContent() {
    const [active, setActive] = useState(null)


    useEffect(() => {
        console.log('layout main')
        console.log(menuData)
    }, [])
    return (
        <aside className="sidebar">
            <div className="sidebar_inner" >
                <p className="sidebar_header">MENU</p>
                <div>
                    <div>
                        {menuData.map((item, index) => {
                            return (
                                <ul className="sidebar_item_container" key={index} onClick={() => setActive(item.id !== active ? item.id : null)}>
                                    <div className="sidebar_item">
                                        <li>{item.title}</li>
                                        < ChevronDown />
                                    </div>
                                    {item.id === active ? (
                                        <>
                                            {item.links.map((subItem, index2) => {
                                                return (
                                                    <li className="sidebar_subitems" key={index2}>
                                                        <Link href={subItem.href}>{subItem.title}</Link>

                                                    </li>
                                                )
                                            })}
                                        </>
                                    ) : null}
                                </ul>
                            )
                        })}
                    </div>
                </div>
            </div>
        </aside>
    )
}