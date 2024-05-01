import React, { useEffect, useState } from "react"
import { ArrowUpDown, MoreHorizontal, Plus, Pencil} from "lucide-react"
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
import Link from "next/link"
import ActStateModal from "./ActstateModal"
import { FaSmileBeam } from "react-icons/fa"
import { size } from "lodash"
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
    // {
    //     id: "select",
    //     enableResizing: false,
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={
    //                 table.getIsAllPageRowsSelected() ||
    //                 (table.getIsSomePageRowsSelected() && "indeterminate")
    //             }
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label="Select all"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             className="mr-6"
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {accessorKey: "SOACTION",
    header: "SOACTION",
    size: 10,
    // enableHiding: true,

},
    {
        accessorKey: "ACTOR",
        header: "ACTOR",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("ACTOR")}</div>
        ),
    },
   
    {
        accessorKey: "CUSTOMER",
        header: "Πελάτης",
        size: 800,
        cell: ({ row }) => <div>
            <span className="text-sm">
            {row.getValue("CUSTOMER")}
            </span>
        </div>,
    },
    {
        accessorKey: "SOACTIONCODE",
        size: 20,

        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
               Κωδικός
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        cell: ({ row }) => (
            <div >
               <span className="text-xs text-muted-foreground">
               {row.getValue("SOACTIONCODE")}
               </span>
            </div>
        ),
    },
    {
        accessorKey: "ACTSTATES",
        header: "ACTSTATES",
        cell: ({ row }) => <ActStates row={row} value={row.getValue("ACTSTATES")} />,
    },
    {
        accessorKey: "ACTSTATUS",
        header: "ACTSTATUS",
        cell: ({ row }) => <Status row={row} />,
    },


    {
        id: "actions",
        size: 10,
        enableHiding: false,
        cell: ({ row }) => {
           

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
                        {/* <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Aντιγραφή Σειράς
                        </DropdownMenuItem> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link className="flex align-center" href="/dashboard/tickets/add">
                            <  Plus className="h-4 w-4 mr-2" /> 
                                Προβολή Task
                            </Link>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
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
            <span className={`${styles.status}  ${statusState}`}>
                {value}
            </span>
    )
}


const ActStates= ({row}) => {
    let value = row.getValue("ACTSTATES")
    let soaction = row.getValue("SOACTION")
    return (
       
        <ActStateModal ACTSTATES={value} SOACTION={soaction} />
    )
}