import React, { useEffect, useState } from "react"
import { ArrowUpDown, MoreHorizontal, } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useModalStore } from "@/store"
import styles from "./styles.module.css"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export const columnCalls = [
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
        accessorKey: "PRIORITY",
        header: "PRIORITY",
        cell: ({ row }) => <div>{row.getValue("PRIORITY")}</div>,
    },
    {
        accessorKey: "CUSTOMER",
        header: "Πελάτης",
        cell: ({ row }) => <div>{row.getValue("CUSTOMER")}</div>,
    },
    {
        accessorKey: "FROMDATE",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
               FROMDATE
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
          cell: ({ row }) => <div>{row.getValue("FROMDATE")}</div>,
        },
    {
        accessorKey: "CCCASK",
        header: "CCCASK",
        cell: ({ row }) => <div >{row.getValue("CCCASK")}</div>,
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
export const taskColumns = [
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
    // {
    //     accessorKey: "NAME",
    //     header: "NAME",
    //     cell: ({ row }) => <div>{row.getValue("NAME")}</div>,
    // },
    {
        accessorKey: "CUSTOMER",
        header: "Πελάτης",
        cell: ({ row }) => <div>{row.getValue("CUSTOMER")}</div>,
    },
    {
        accessorKey: "SOACTIONCODE",
        // header: "SOACTIONCODE",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
               SOACTION
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        cell: ({ row }) => <Soaction row={row} />,
    },
    {
        accessorKey: "ACTSTATES",
        header: "ACTSTATES",
        cell: ({ row }) => <div >{row.getValue("ACTSTATES")}</div>,
    },
    {
        accessorKey: "ACTSTATUS",
        header: "ACTSTATUS",
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






//CUSTOM COLUMN COMPONENTS:

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
    let value = row.getValue("ACTSTATUS")
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