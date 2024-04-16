'use client'
import styles from './styles.module.css'
import { useState } from 'react'
import  TasksTable  from './table'
import { taskColumns, columnCalls } from "@/app/_components/Tasks/columns";

const tabs = [
    {
        name: 'All',
        id: 0
    },
    {
        name: 'Assigned',
        id: 1
    },
    {
        name: 'Done',
        id: 2
    },
]





export function TasksTabs({ setActiveTab, activeTab }) {

    const handleClick = (index) => {
        setActiveTab(index)
    }
    return (
        <div className={styles.tabs}>
            {tabs.map((tab, index) => {
                return (
                    <div 
                        key={tab.id} 
                        className={`${styles.tab} ${activeTab === index ? styles.active : ''}`} 
                        onClick={() => handleClick(index)}>{tab.name}</div>
                )
            })}
        </div>
    )
}


export default function Tasks({calls, tasks}) {
    const [activeTab, setActiveTab] = useState(0)
    return (
        <div >
            <TasksTabs 
                setActiveTab={setActiveTab} 
                activeTab={activeTab}
            />
            {activeTab === 0 && <TasksTable data={tasks} columns={taskColumns} />}
            {activeTab === 1 && <TasksTable data={calls} columns={ columnCalls} />}
         
        </div>
    )
}