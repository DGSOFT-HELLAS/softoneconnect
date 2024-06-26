'use client'
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import './styles.css';
import { menuData } from "./menuConfig"
import { sidebarStore } from "@/store"

export function SidebarItems() {
    const [active, setActive] = useState(null)
    const { openSidebar, setOpenSidebar } = sidebarStore()
    return (
        <div className="sidebar_container">
            {
                openSidebar ? (
                    <>
                        <div className="sidebar_shadow"></div>
                        <aside className="sidebar">
                            <div className="sidebar_inner" >
                                <p className="sidebar_header">MENU</p>
                                {menuData.map((item, index) => {
                                    return (
                                        <ul
                                            className="sidebar_item_container"
                                            key={index}
                                            onClick={() => setActive(item.id !== active ? item.id : null)}
                                        >
                                            <li className="sidebar_item">
                                                <span className="sidebar_item_start">
                                                    <span className="sidebar_icon">{item.icon}</span>
                                                    <span className="sidebar_title">{item.title}</span>
                                                </span>
                                                {item.links ? <ChevronDown className="sidebar_item_arrow" /> : null}
                                            </li>
                                            {item.id === active ? (
                                                <div className="subitems_container">
                                                    {item.links && item.links.map((subItem, index2) => {
                                                        return (
                                                            <li className="sidebar_subitem" key={index2}>
                                                                <Link href={subItem.href}>{subItem.title}</Link>
                                                            </li>
                                                        )
                                                    })}
                                                </div>
                                            ) : null}
                                        </ul>
                                    )
                                })}
                            </div>
                        </aside>
                    </>
                ) : null
            }
        </div>
    )
}