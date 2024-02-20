"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState } from "react"
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
import { Sura } from "next/font/google"

const FormSchema = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long",
    })
})

export default function RegisterForm() {
    const [inputType, setInputType] = useState('password');
    const [error, setError] = useState();

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
            surname: "",
        },
    })

    useEffect(() => {
        console.log('error', error)
        if (error) {
            throw new Error(error)
        }
    }, [error])

    async function onSubmit(data) {
        try {
            const resp = await axios.post('/api/auth', {
                email: data.email,
                password: data.password
            })
        } catch (e) {
         
        }

    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
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
                <Button className="w-full" type="submit">Submit</Button>
            </form>
        </Form>

    )
}


