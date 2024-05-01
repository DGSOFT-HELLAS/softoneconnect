import styles from './styles.module.css'
import { ChevronLeft, ChevronDown, Gauge, LogOut } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import SignOut from './signOut'
const navConfig = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <Gauge />,
    },
    {
        divider: true,
        title: 'MENU'
    },
    {
        title: 'Dashboard',
        path: '#',
        icon: <Gauge />,
    },
    {
        title: 'Εργασίες',
        path: '#',
        icon: <Gauge />,
    },
    {
        divider: true,
        title: 'GENERAL'
    },
    {
        title: 'Ρυθμίσεις',
        path: '#',
        icon: <Gauge />,
    },


]


export default async function SidebarLayout({ children }) {
    const session = await getServerSession(authOptions);
    console.log(session)
    const name = session?.name;
    return (
        <section className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.logoContainer}>
                    <div className={styles.logoInitials}>
                        DG
                    </div>
                    <div className={styles.logoTextContainer}>
                        <p>DGSOFT Dashboard</p>
                        <span>Workplace</span>
                    </div>
                    <div className={styles.toggle}>
                        <ChevronLeft className='w-4 h-4' />
                        {/* <ChevronRight /> */}
                    </div>
                </div>
                <div className={styles.sidebarNav}>
                    <ul className={styles.navContainer}>
                        {navConfig.map((item, index) => {
                            if (item.divider) {
                                return <li key={index} className={styles.divider}>{item.title}</li>
                            }
                            return (
                                <NavItem
                                    key={index}

                                    item={item}
                                />
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
                            <span>{name}</span>
                            <span>
                                <ChevronDown className='w-4 h-4 text-muted-foreground' />
                            </span>
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
    let { path, icon, title, divider } = item
    if (divider) {
        return (
            <li key={key} className={styles.divider}>{title.toUpperCase()}</li>
        )
    }
    return (
        <li key={key} >
            <Link href={path} className={styles.navItem}>
                <span className={styles.icon}>
                    {/* <Icon  className="w-5 h-5"/> */}
                    {React.cloneElement(icon, { style: { width: '19px', height: '19px' } })}
                </span>
                <span className={styles.navItemTitle}>
                    {title}
                </span>
            </Link>
        </li>
    )
}
