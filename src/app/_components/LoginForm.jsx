"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock } from 'lucide-react';
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
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

import { CheckboxWithText } from "./InputCheck";
import Link from "next/link"
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const FormSchema = z.object({
    email: z.string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
    password: z.string()
    .min(5, {message: "Password must be at least 5 characters."})
})

export default function LoginForm() {
    const [inputType, setInputType] = useState('password');
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

 
       
        async function onSubmit(data) {
            console.log('data')
            try {
                const resp = await axios.get(`/api/auth?pass=${data.password}&email=${data.email}`)
                if(!resp.data.user) {
                    toast.error(resp.data.message)
                    return;
                } 
                router.push('/dashboard')
            } catch (e) {
                throw new Error('Oups! something unexpected happened')
            }
    
        }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid gap-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="email" {...field} />
                            </FormControl>
                            <FormMessage className="form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="password_input">
                            <FormControl>
                                <Input type={inputType} placeholder="password" {...field} />
                            </FormControl>
                            <FormMessage className="form_message" />
                            {inputType === 'password' ? (
                                <EyeOff onClick={() => setInputType('text')} className="password_icon" />
                            ) : (
                                <Eye className="password_icon" onClick={() => setInputType('password')} />
                            )}
                        </FormItem>
                    )}
                />
                <div className="forgot_pass_container">
                    <CheckboxWithText label="keep me signed in" />
                    <span className=" text-sm">Forgot password?</span>
                </div>
                <Button type="submit">
                    <Lock className="button_icon" />
                    Login
                </Button>
                <div className="go_back_link">
                <Link href="/register">New here? Register now!</Link>
                </div>
            </form>
        </Form>

    )
}
