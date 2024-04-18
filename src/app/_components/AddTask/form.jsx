"use client"
import styles from './styles.module.css'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { CustomDropSearch } from '../CustomDropSearch'

const FormSchema = z.object({
    email: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email(),
    client: z.string({
        required_error: "Please select a language.",
    }),
})

export function AddForm({ clients }) {
    const form = useForm({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data) {
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
                    < CustomDropSearch
                     control={form.control} 
                     form={form} 
                     name="client"
                     options={clients}
                        optionValue="TRDR"
                        optionLabel="NAME"
                     />
                    < CustomDropSearch
                     control={form.control} 
                     form={form} 
                     name="client"
                     options={clients}
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


