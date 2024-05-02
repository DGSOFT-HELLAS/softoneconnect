'use client'
import styles from './styles.module.css'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { sidebarStore } from '@/store'
export default function ToggleSidebar() {
    const { openSidebar, setOpenSidebar } = sidebarStore()
    return (
        <div className={styles.toggle} onClick={setOpenSidebar }>
            {openSidebar ? <ChevronLeft className='w-4 h-4' /> : <ChevronRight className='w-4 h-4' />}
        </div>
    )
}