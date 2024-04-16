"use client"
import React, { useEffect, useState } from "react"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, SlidersHorizontal, ChevronRight, ChevronLeft } from "lucide-react"
import styles from "./tickets.module.css"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
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
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { max } from "lodash"

export const columns = [
    {
        id: "select",
        enableResizing: false,
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                className="mr-6"
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "ACTOR",
        header: "ACTOR",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("ACTOR")}</div>
        ),
    },
    {
        accessorKey: "NAME",
        header: "NAME",
        cell: ({ row }) => <div>{row.getValue("NAME")}</div>,
    },
    {
        accessorKey: "CUSTOMER",
        header: "Πελάτης",
        cell: ({ row }) => <div>{row.getValue("CUSTOMER")}</div>,
    },
    {
        accessorKey: "SOACTIONCODE",
        header: "SOACTIONCODE",
        cell: ({ row }) => <Soaction row={row} />,
    },
    {
        accessorKey: "Χαρακτηρισμός",
        header: "Χαρακτηρισμός",
        cell: ({ row }) => <div >{row.getValue("Χαρακτηρισμός")}</div>,
    },
    {
        accessorKey: "Κατάσταση",
        header: "Κατάσταση",
        cell: ({ row }) => <Status row={row} />,
    },


    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function TicketsTable({ data }) {
    const [columnVisibility, setColumnVisibility] = React.useState({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnFilters, setColumnFilters] = React.useState()

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            columnVisibility,
            rowSelection,
            columnFilters,
        },
    })

    return (
        <div className="w-full rounded-md p-8 bg-background shadow">
            <TableComponent data={data} columns={columns} table={table} />
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
    )
}


const TableComponent = ({ data, columns, table }) => {
    return (
        <div className="">
            <div className="mb-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            View  <SlidersHorizontal className="ml-2 h-4 w-4" />
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
        </div>
    )
}

const Soaction = ({ row }) => {
    const setData = useModalStore((state) => state.setModalData)
    const setModal = useModalStore((state) => state.setOpenEditModal)

    useEffect(() => {
        setData(row.original)
    }, [])
    return (
        <div >
            <p className={styles.ticketUnderline} onClick={setModal} >{row.getValue("SOACTIONCODE")}</p>
        </div>
    )
}

const Status = ({ row }) => {
    let value = row.getValue("Κατάσταση")
    let statusState;
    switch (value) {
        case "Προς Έναρξη":
            statusState = styles.statusToBe
            break;
        case "Σε Εξέλιξη":
            statusState = styles.statusActive
            break;


    }
    return (
        <div >
            <span className={`${styles.status}  ${statusState}`}>
                {value}
            </span>
        </div>
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