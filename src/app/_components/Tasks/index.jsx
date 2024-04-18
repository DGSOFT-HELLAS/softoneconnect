'use client'
import styles from './styles.module.css'
import { useState } from 'react'
import TasksTable from './table'
import {
    flexRender,
    getFacetedUniqueValues,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { taskColumns, columnCalls } from '@/app/_components/Tasks/columns';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FacetedFilter } from './faceterFilter'



const useCustomTable = (data, columns) => {
    const [columnVisibility, setColumnVisibility] = useState({})
    const [rowSelection, setRowSelection] = useState({})
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState()

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
        },
        enableRowSelection: true,
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
    });

    return table;
};





export default function Tasks({ calls, tasks, user }) {
    const tableTasks = useCustomTable(tasks, taskColumns);
    const tableCalls = useCustomTable(calls, columnCalls);

    return (
        <div >

            <Tabs defaultValue="tasks" className="w-full">
                <TabsList>
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    <TabsTrigger value="calls">Calls</TabsTrigger>
                </TabsList>
                <TabsContent value="tasks">
                    <TasksTable user={user} data={tasks} columns={taskColumns} table={tableTasks}>
                        <TastToolbar table={tableTasks} />
                    </TasksTable>
                </TabsContent>
                <TabsContent value="calls">
                    <TasksTable  user={user} data={calls} columns={columnCalls} table={tableCalls}>
                        <FacetedFilter 
                            column={tableTasks.getColumn("ACTSTATUS")} 
                            options={['Το Do', 'StandBy', 'Waiting from customer']} 
                            title="Κατάσταση"
                        />

                    </TasksTable>
                </TabsContent>
            </Tabs>
        </div>
    )
}





const TastToolbar = ({ table }) => {
    return (
        <Select onValueChange={(event) => {
            table.getColumn("ACTSTATES")?.setFilterValue(event)
        }}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Φίτρο Κατάστασης" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Κατάσταση</SelectLabel>
                    <SelectItem value="Το Do">Το Do</SelectItem>
                    <SelectItem value="StandBy">StandBy</SelectItem>
                    <SelectItem value="Waiting from customer">Waiting from customer</SelectItem>
                    <SelectItem value={null}>All</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}