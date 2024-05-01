'use client'
import { Pencil, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import styles from './styles.module.css'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useForm } from "react-hook-form"
import Link from "next/link"
 
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { changeStatus } from "@/app/actions"

const options = [
    {
        name: 'To Do',
        value: 1000
    },
    {
        name: 'Doing',
        value: 1001
    },
    {
        name: 'Done',
        value: 1002
    },
    {
        name: 'Waiting from Softone',
        value: 2000000
    },
    {
        name: 'Waiting from customer',
        value: 2000001
    },
    {
        name: 'New Spec',
        value: 2000002
    }
]

export default function ActStateModal({ ACTSTATES, SOACTION }) {

    let actcolor = '';
    switch (ACTSTATES) {
        case 'Waiting from Softone':
            actcolor = 'bg-red-500';
            break;
        case 'To Do':
            actcolor = 'bg-green-500';
            break;
        case 'Waiting from customer':
            actcolor = 'bg-blue-500';
            break;
        case 'Doing':
            actcolor = 'bg-orange-500';
            break;
        default:
            actcolor = 'bg-gray-500';
    }

    
    let value = options.find((item) => item.name === ACTSTATES)?.name
    const form = useForm({
        defaultValues: {
          ACTSTATES: value
        }
    })
     
      function onSubmit(data) {
      
       let ACTSTATUS = options.find((item) => item.name === data.ACTSTATES)?.value
        let call = changeStatus(SOACTION, ACTSTATUS )
      }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={styles.actstates_container}>
                    <div className={`${styles.actstates_dot} ${actcolor}`}></div>
                    <span>
                        {ACTSTATES}
                    </span>
                    <ChevronDown className="w-3 h-3 ml-1" />
                </div>
            </DialogTrigger>
            <DialogContent className="w-full">
            <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <DialogHeader>
                    <DialogTitle>Διόρθωση ACTSTATE</DialogTitle>
                    <DialogDescription>
                        Κάντε αλλαγή στην κατάσταση του task. Πατήστε το κουμπί για να αποθηκεύσετε τις αλλαγές.
                    </DialogDescription>
                </DialogHeader>
             
                        <FormField
                            control={form.control}
                            name="ACTSTATES"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Κατάσταση:</FormLabel>
                                    {console.log('value')}
                                    {console.log(field.value)}
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={ACTSTATES}  />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {options.map((item) => {
                                                return (
                                                    <SelectItem key={item.value} value={item.name}>
                                                        {item.name}
                                                    </SelectItem>
                                                )
                                            })}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
       
                <DialogFooter>
                    <Button type="submit">Αποθήκευση αλλαγών</Button>
                </DialogFooter>
                </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}