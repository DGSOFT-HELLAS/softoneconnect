"use client"
import styles from './styles.module.css'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { CustomDropSearch } from '../InfiniteDropdownWithSearch'

import { format } from 'date-fns'
import { InputText } from '../Inputs/InputText'
import { getClients, getCompanyContacts } from '@/app/actions'
import { CustomDropdown } from '../Dropdown'
import { useEffect } from 'react'
const FormSchema = z.object({
    
    client: z.string({
        required_error: "Please select a language.",
    }),
    TRNDATE: z.string({
       
    }),
})




export function AddForm({  }) {
   
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            TRNDATE: format(new Date(), 'yyyy-MM-dd HH:mm'),
        }
    })

    useEffect(() => {
        let client = form.watch('client')
        console.log(client)
    }, [form.watch('client')])

    function onSubmit(data) {
        console.log(data)
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <div className={styles.form}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <div className='w-full gap-2 grid grid-cols-2'>
                  < InputText 
                    name="TRNDATE"
                    label="Ημερομηνία καταχώρησης"
                    placeholder="Ημερομηνία Έναρξης"
                    control={form.control}
                    disabled={true}
                  />
                  < InputText 
                    name="TRNDATE"
                    label="Ημερομηνία Έναρξης"
                    placeholder="Ημερομηνία Έναρξης"
                    control={form.control}
                    disabled={true}
                  />
                </div>
                    <div className='w-full gap-2 grid grid-cols-2'>
                    < CustomDropSearch
                    fetcher={getClients}
                    label="Πελάτες"
                    placeholder="Επιλογή Πελάτη"
                     control={form.control} 
                     form={form} 
                     name="client"
                    optionValue="TRDR"
                    optionLabel="NAME"
                     />
                    < CustomDropdown
                    disabled={!form.watch('client')}
                    trdr={form.watch('client')}
                    fetcher={getCompanyContacts}
                    label="Eπαφές"
                    placeholder="Eπαφή πελάτη"
                     control={form.control} 
                     form={form} 
                     name="contacts"
                        optionValue="TRDR"
                        optionLabel="NAME"
                     />
                   
                    </div>
                  
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}


