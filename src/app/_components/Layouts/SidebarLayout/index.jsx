'use client'
import styles from './styles.module.css'
import { ChevronLeft, ChevronDown, Gauge, LogOut, ClipboardList, Settings } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from 'next-auth/react'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import SignOut from './signOut'
import ToggleSidebar from './toggleSidebar'
import { sidebarStore } from '@/store'
const navConfig = [
    {
        title: 'Dashboard',
        path: '#',
        icon: <Gauge />,
    },
    {
        divider: true,
        title: 'MENU'
    },
    {
        title: 'Εργασίες',
        path: '/dashboard/tickets',
        icon: <ClipboardList />,
    },
    {
        divider: true,
        title: 'GENERAL'
    },
    {
        title: 'Ρυθμίσεις',
        path: '#',
        icon: <Settings />,
    },


]


export default  function SidebarLayout({ children }) {
    const { openSidebar, setOpenSidebar } = sidebarStore()

    
    const session = useSession();
    const name = session?.data?.name;
    return (
        <section className={styles.container}>
            <aside className={`${styles.sidebar} ${openSidebar ? styles.sidebarOpen : styles.sidebarClose}` }>
                <div className={styles.logoContainer}>
                    <div className={styles.logoInitials}>
                        DG
                    </div>
                    {openSidebar ? (
                          <div className={styles.logoTextContainer}>
                          <p>DGSOFT Dashboard</p>
                          <span>Workplace</span>
                      </div>
                    ) : null}
                  
                   <ToggleSidebar />
                </div>
                <div className={styles.sidebarNav}>
                    <ul className={ `${styles.navContainer} ${openSidebar ? styles.navContainerOpen : null }`}>
                        {navConfig.map((item, index) => {
                            // if (item.divider) {
                            //     return (
                            //         <>
                            //          {openSidebar ? (
                            //             <li key={index} className={styles.divider}>{item.title}</li>
                            //          ) : (
                            //             <li key={index} className={styles.dividerLine}></li>
                            //          )}
                            //         </>
                            //     )
                            // }
                            return (
                                <>
                                    {openSidebar ? (
                                        <NavItem
                                        key={index}
                                        item={item}
                                    />
                                    ) : (
                                        <NavClosed
                                        key={index}
                                        item={item} 
                                        />
                                    )}
                                </>
                            )
                        })}
                    </ul>
                </div>
                <Popover>
                    <PopoverTrigger>
                        <div className={styles.footer}>
                            <div className={styles.avatar} >
                                {name && name[0]}
                            </div>
                            { openSidebar ? (
                              <>
                                  <span>{name}</span>
                                <span>
                                <ChevronDown className='w-4 h-4 text-muted-foreground' />
                            </span>
                              </>
                            ) : null }
                          
                           
                        </div>
                    </PopoverTrigger>
                    <PopoverContent
                        className={'w-[240px]'}
                    >
                       < SignOut />
                    </PopoverContent>
                </Popover>

            </aside>
            <section className={styles.main}>
                {children}
            </section>
        </section>
    )
}



const NavItem = ({ key, item }) => {
    const { openSidebar } = sidebarStore()
    let { path, icon, title, divider } = item
    if (divider ) {
        return (
              <li  className={styles.divider}>{title}</li>
        )
    }
    return (
        <li key={key} >
            <Link href={path} className={styles.navItem}>
                <span className={styles.icon}>
                    {React.cloneElement(icon, { style: { width: '19px', height: '19px' } })}
                </span>
                     <span className={styles.navItemTitle}>
                     {title}
                 </span>
               
            </Link>
        </li>
    )
}
const NavClosed = ({ key, item }) => {
    let { path, icon, title, divider } = item
    if (divider ) {
        return (
            <>
              <li  className={styles.dividerLine}></li>
            </>
        )
    }
    return (
        <li key={key} >
            <Link href={path} className={styles.navItemClose}>
                <span className={styles.icon}>
                    {React.cloneElement(icon, { style: { width: '19px', height: '19px' } })}
                </span>
            </Link>
        </li>
    )
}



