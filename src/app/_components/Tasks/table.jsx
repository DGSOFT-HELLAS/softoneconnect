"use client"
import React, { use, useEffect, useRef, useState } from "react"
import {
    flexRender,
} from "@tanstack/react-table"

import { SlidersHorizontal, ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight } from "lucide-react"
import styles from "./styles.module.css"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useModalStore } from "@/store"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"

import {
    Avatar,
    AvatarImage,
} from "@/components/ui/avatar"


export default function TasksTable({ columns, children, table, user }) {
    const [value, setValue] = useState(null)
    const [pageSize, setPageSize] = useState(10)



    const handleValueChange = (event) => {
        setValue(event);
        table.getColumn("ACTOR")?.setFilterValue(event)
    }
    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
                <SelectUser user={user} value={value} handleValueChange={handleValueChange} />
            </div>
            <div className={styles.tableBody}>
                <div className="mb-3 flex">
                    {children}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Στήλες  <SlidersHorizontal className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell, index, array) => (
                                            <TableCell
                                                style={{
                                                    width: cell.column.getSize()
                                                }}
                                                className={index !== array.length - 1 ? "border-r" : ""} key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex items-center justify-between space-x-2 py-4">
                    <Select onValueChange={(rowNum) => table.setPageSize(Number(rowNum))} value={table.getState().pagination.pageSize}>
                        <SelectTrigger className="w-[80px]">
                            <SelectValue placeholder="Theme" defaultValue={table.getState().pagination.pageSize} onValueChange={() => {
                                table.setPageSize(Number(e.target.value))
                            }} />
                        </SelectTrigger>
                        <SelectContent>
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <SelectItem key={pageSize} value={pageSize} onValueChange={() =>table.setPageSize(Number(e.target.value))}>{pageSize}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <div className={styles.paginationContainer}>

                        <Button
                            variant="outline" size="icon"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline" size="icon"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="flex items-center gap-1 text-sm">
                            <div>Σελίδα</div>
                            <strong>
                                {table.getState().pagination.pageIndex + 1}
                            </strong>
                            από{' '}
                            <strong>{table.getPageCount()}</strong>
                        </span>
                        <Button
                            variant="outline" size="icon"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline" size="icon"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                    <EditDialog />
                </div>
            </div>


        </div>
    )
}



function SelectUser({ value, handleValueChange, user }) {
    return (
        <Select
            className="e"
            onValueChange={(event) => handleValueChange(event)}
            value={value}
        >
            <SelectTrigger className="w-[200px] flex items-center bg-background">
                <SelectValue placeholder={"Επιλογή Χρήστη"} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup >
                    <SelectLabel >Actor</SelectLabel>
                    <SelectItem value={user?.name}>
                        <span className="flex ">
                            <Avatar className="w-[15px] h-[15px] mr-2">
                                <AvatarImage src="/avatar1.png" alt="agent" />
                            </Avatar>
                            <span className="text-xs">
                                {user > 40 ? user?.name.slice(0, 35) + '...' : user?.name}
                            </span>
                        </span>
                    </SelectItem>
                    <SelectItem value="TECH">
                        <span className="flex ">
                            <Avatar className="w-[15px] h-[15px] mr-2">
                                <AvatarImage src="/avatar2.png" alt="agent" />
                            </Avatar>
                            <span className="text-xs">
                                TECH
                            </span>
                        </span>
                    </SelectItem>
                    <SelectItem value="CUSTOM">
                        <span className="flex ">
                            <Avatar className="w-[15px] h-[15px] mr-2">
                                <AvatarImage src="/avatar2.png" alt="agent" />
                            </Avatar>
                            <span className="text-xs">
                                CUSTOM
                            </span>
                        </span>
                    </SelectItem>
                    <SelectItem value={null}>
                        <span className="flex ">
                            <Avatar className="w-[15px] h-[15px] mr-2">
                                <AvatarImage src="/avatar2.png" alt="agent" />
                            </Avatar>
                            <span className="text-xs">
                                ΌΛΑ ΤΑ TASKS
                            </span>
                        </span>
                    </SelectItem>
                </SelectGroup>

            </SelectContent>


        </Select>

    )
}

const EditDialog = () => {
    const modal = useModalStore((state) => state.openEditModal)
    const setOpen = useModalStore((state) => state.setOpenEditModal)
    const modalData = useModalStore((state) => state.modalData)

    return (
        <Dialog open={modal} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Info</DialogTitle>
                    <DialogDescription>
                        <p className={styles.stringifyText}>
                            {JSON.stringify(modalData)}
                        </p>
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}