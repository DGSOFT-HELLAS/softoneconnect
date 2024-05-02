'use client'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import TasksTable from './table'
import {
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
import { Button } from '@/components/ui/button'
import { ListFilter } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from '@/components/ui/label'


const useCustomTable = (data, columns) => {
    const [columnVisibility, setColumnVisibility] = useState({
        // SOACTION: false,
    })

    const [rowSelection, setRowSelection] = useState({})
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState()
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });


    console.log(pagination)
    const table = useReactTable({
        data,
        columns,
        state: {
            // pagination,
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
        },
        // onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
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
            <Tabs
                defaultValue="tasks" className="w-full">
                <TabsList className=" bg-card">
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    <TabsTrigger value="calls">Calls</TabsTrigger>
                </TabsList>
                <TabsContent value="tasks">
                    <TasksTable user={user} data={tasks} columns={taskColumns} table={tableTasks}>
                        <TastToolbar table={tableTasks} />
                    </TasksTable>
                </TabsContent>
                <TabsContent value="calls">
                    <TasksTable user={user} data={calls} columns={columnCalls} table={tableCalls}>

                        {/* <FacetedFilter 
                            column={tableTasks.getColumn("ACTSTATUS")} 
                            options={['Το Do', 'StandBy', 'Waiting from customer']} 
                            title="Κατάσταση"
                        /> */}
                    </TasksTable>
                </TabsContent>
            </Tabs>
        </div>
    )
}





const TastToolbar = ({ table }) => {
    const [select, setSelect] = useState({
        actstates: null,
        actstatus: null,
    })


    useEffect(() => {
        console.log(select)
    }, [select])
   
    const handleClearFilters = () => {
        table.getColumn("ACTSTATUS").setFilterValue(null)
        table.getColumn("ACTSTATES").setFilterValue(null)
        setSelect({
            actstates: null,
            actstatus: null,
        })
    }
    return (
        <>
            <DropdownMenu modal={false} >
                <DropdownMenuTrigger asChild>
                    <Button className="bg-background text-foreground gap-1 border">
                        <ListFilter className="w-4 h-4" />
                        Φίλτρα
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" >
                    <DropdownMenuLabel>Όλα τα φίλτρα</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                        <FilterSelect
                            value={select.actstatus}
                            onChange={(val) => {
                                console.log('val')
                                console.log(val)
                                setSelect({ ...select, actstatus: val })
                            }}
                            column="ACTSTATES"
                            label="Κατάσταση"
                            table={table}
                            placeholder="Φίτρο Κατάστασης"
                            options={[
                                { value: "To Do", label: "Το Do" },
                                { value: "StandBy", label: "StandBy" },
                                { value: "Waiting from customer", label: "Waiting from customer" },
                                { value: null, label: "Όλα (Default)" }
                            ]}
                        />
                    <DropdownMenuSeparator />
                        <FilterSelect
                           value={select.actstates}
                           onChange={(val) => {
                               setSelect({ ...select, actstates: val })
                           }}
                           column="ACTSTATUS"
                           label="Actstatus"
                            table={table}
                            placeholder="Φίτρο Actstatus"
                            options={[
                                { value: "Προς Έναρξη", label: "Προς Έναρξη" },
                                { value: "Σε Εξέλιξη", label: "Σε Εξέλιξη" },
                                { value: null, label: "Όλα (Default)" }
                            ]}
                        />
                           <DropdownMenuSeparator />
                        <div className='p-2'>
                        <span onClick={handleClearFilters} className='underline text-sm text-primary cursor-pointer'>
                            Εκκαθάριση
                          </span>
                        </div>
                </DropdownMenuContent>
            </DropdownMenu>


        </>

    )
}




const FilterSelect = ({ column, placeholder, options, table, label, onChange, value }) => {

  
    return (
        <div className='p-2'>
            <Label className="mb-1 block text-muted-foreground text-xs">{label}</Label>
            <Select defaultValue={value} value={value} onValueChange={(event) => {
                onChange(event)
                table.getColumn(column)?.setFilterValue(event)
            }}>
                <SelectTrigger className="w-[180px] bg-background">
                    <SelectValue placeholder={placeholder}  value={value}/>
                </SelectTrigger>
                <SelectContent  className="w-full" align="start" side="right" sideOffset={12}>
                    <SelectGroup>
                        <SelectLabel>{column}</SelectLabel>
                        {options.map((option, index) => (
                            <SelectItem value={option.value}   key={index} >{option.label}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};