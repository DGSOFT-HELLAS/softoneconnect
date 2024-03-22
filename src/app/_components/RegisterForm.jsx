"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {  useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios'
import { toast } from 'react-toastify';
import { ReloadIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"



const FormSchema = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }),
    name: z.string().min(1, { message: "First Name is required" }),
    surname: z.string().min(1, { message: "Last Name is required" }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long",
    })
})

export default function RegisterForm() {
    const [inputType, setInputType] = useState('password');
    const router = useRouter()
    const [state, setState] = useState({
        loading: false,
        disabled: false,
    })

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
            surname: "",
        },
    })

    

    async function onSubmit(data) {
        setState(prev => ({...prev, loading: true, disabled: true}))
        try {
            const resp = await axios.post('/api/auth/register', {
                email: data.email,
                password: data.password,
                name: data.name,
                surname: data.surname
            })
            console.log(resp)
            setState(prev => ({...prev, loading: false, disabled: false}))

            if(resp.data.success) {
                toast.success(resp.data.message);
                router.push('/login')
            } else {
                toast.error(resp.data.message);
            }
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
             
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="name" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="surname"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="surname" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                   <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="email" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="password_input">
                            <FormControl>
                                <Input className="w-full" type={inputType} placeholder="password" {...field} />
                            </FormControl>
                            {inputType === 'password' ? (
                                <EyeOff onClick={() => setInputType('text')} className="password_icon" />
                            ) : (
                                <Eye className="password_icon" onClick={() => setInputType('password')} />
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <Button className="w-full" disabled={state.disabled}>
                    {state.loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                    Submit
                </Button>
            </form>
        </Form>

    )
}


