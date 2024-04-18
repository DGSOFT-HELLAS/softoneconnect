"use client"
import React, { use, useEffect, useRef, useState } from "react"
import {
    flexRender,

} from "@tanstack/react-table"
import { ReloadIcon } from "@radix-ui/react-icons"

import { SlidersHorizontal, ChevronRight, ChevronLeft } from "lucide-react"
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
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                    <div className="space-x-2">
                        <Button
                            variant="outline" size="icon"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline" size="icon"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronRight className="h-4 w-4" />
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
                onValueChange={(event) => handleValueChange(event)}
                value={value}
            >
                <SelectTrigger className="w-[200px] flex items-center">
                    <SelectValue  placeholder={"Επιλογή Χρήστη"} />
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