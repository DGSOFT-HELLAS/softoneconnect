"use client"
import styles from './styles.module.css'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { CustomDropSearch } from '../InfiniteDropdownWithSearch'
import { useSession } from 'next-auth/react'
import { format } from 'date-fns'
import { InputText } from '../Inputs/InputText'
import { getClients, getCompanyContacts } from '@/app/actions'
import { CustomDropdown } from '../Dropdown'
import { useEffect } from 'react'
import { TextArea } from '../Inputs/TextArea'
import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '@/app/actions'
import { handleSubmitTask } from '@/app/actions'
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"




const FormSchema = z.object({
    TRDR: z.string({
        required_error: "Παρακαλώ επιλέξτε πελάτη.",
    }),
    TRDPRSN: z.string({}).optional(),
    TRNDATE: z.string({}).optional(),
    FROMDATE: z.string({}).optional(),
    ORDERBYNAME: z.string({}),
    ACTOR: z.string({}).optional(),
    ORDERBY: z.number({}),
    REMARKS: z.string({
        required_error: "Υποχρεωτικό πεδίο"
    }),
    ACT: z.string({}),
    COMMENTS: z.string({}).optional(),
})




export function AddForm({ }) {
    const { toast } = useToast();
    const session = useSession();
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            TRNDATE: format(new Date(), 'yyyy-MM-dd HH:mm'),
            FROMDATE: format(new Date(), 'yyyy-MM-dd HH:mm'),
            ORDERBYNAME: "Χρήστης",
            ACTOR: '',
            ACT: 'Ενεργό',
            COMMENTS: '',
            TRDPRSN: '',

        }
    })
    const usersQuery = useQuery({
        queryKey: ['users'],
        queryFn: () => fetchUsers(),
    })

    //fetch data for the contacts dropdown, if the user has selected a client:
    const contactsQuery = useQuery({
        queryKey: [form.watch('TRDR')],
        queryFn: () => getCompanyContacts(form.watch('TRDR')),
    })





    //set default values for values coming from the session:
    useEffect(() => {
        if (!session) return;
        form.reset({
            ORDERBYNAME: session?.data?.name,
            ORDERBY: session?.data?.usercode,
        })
    }, [session])



    //Final submit:
    async function onSubmit(data) {
        let formData = data;
        delete formData['ACT']
        const _data = {
            ...formData,
            SERIES: "9060",
            ORDERBYNAME: session?.data?.name,
            ACTSTATUS: 1,
            UTBL04: 400,
            ACTSTATES: 1000,
        }
        let result = await handleSubmitTask(_data, session?.data?.clientID)
        if (result.success) {
            toast({
                title: "Επιτυχία Καταχώρησης",
                description: "Θα επιστρέψετε στην λίστα των tasks σε λίγο.",
                type: 'error'
            })
            router.push('/dashboard/tickets')
        } else {
            toast({
                title: "Σφάλμα καταχώρησης",
                description: "Παρακαλώ προσπαθήστε ξανά.",
                type: 'error'
            })
        }
    }

    return (
        <div className={styles.form}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <div className={styles.grid}>
                        < InputText
                            name="ORDERBYNAME"
                            label="Εντολέας"
                            control={form.control}
                            disabled={true}
                        />
                        < CustomDropdown
                            label="Χρήστες"
                            placeholder="Επιλογή Χειριστή"
                            control={form.control}
                            form={form}
                            name="ACTOR"
                            optionValue="code"
                            optionLabel="name"
                            disabled={false}
                            data={usersQuery.data}
                        />

                    </div>
                    <div className={styles.grid}>
                        < InputText
                            name="TRNDATE"
                            label="Ημερομηνία καταχώρησης"
                            placeholder="Ημερομηνία Έναρξης"
                            control={form.control}
                            disabled={true}
                        />
                        < InputText
                            name="FROMDATE"
                            label="Ημερομηνία Έναρξης"
                            placeholder="Ημερομηνία Έναρξης"
                            control={form.control}
                            disabled={true}
                        />
                    </div>
                    <div className={styles.grid}>
                        < CustomDropSearch
                            fetcher={getClients}
                            label="Πελάτες"
                            placeholder="Επιλογή Πελάτη"
                            control={form.control}
                            form={form}
                            name="TRDR"
                            optionValue="TRDR"
                            optionLabel="NAME"
                        />

                        < CustomDropdown
                            disabled={!form.watch('TRDR')}
                            label="Eπαφές"
                            placeholder="Eπαφή πελάτη"
                            control={form.control}
                            form={form}
                            name="TRDPRSN"
                            optionValue="TRDPRSN"
                            optionLabel="NAME"
                            data={contactsQuery.data}
                        />
                    </div>
                    <div className={styles.grid}>
                        < TextArea
                            name="REMARKS"
                            label="Αναλυτική Περιγραφή"
                            placeholder="Περιγραφή του task"
                            control={form.control}
                            rows={5} />
                        < TextArea
                            name="COMMENTS"
                            label="Σχόλια"
                            placeholder="Γράψτε το σχόλιο σας"
                            control={form.control}
                            rows={5} />
                    </div>
                    <div className={styles.grid}>
                        < InputText
                            name="ACT"
                            label="Κατάσταση"
                            control={form.control}
                            disabled={true}
                        />
                    </div>
                    <div className='flex gap-2'>
                        <Button type="submit">Καταχώρηση</Button>
                        <Button onClick={() => router.push('/dashboard/tickets')} className='mr-4' variant="secondary">Ακύρωση</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}


