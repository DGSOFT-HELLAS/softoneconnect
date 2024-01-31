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
import axios from "axios";
import { toast} from 'react-toastify';
import { CheckboxWithText } from "./InputCheck";
import Link from "next/link"


const FormSchema = z.object({
    email: z.string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
    password: z.string()
    .min(5, {message: "Password must be at least 5 characters."})
})

export default function LoginForm() {
    const [inputType, setInputType] = useState('password');
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data) => {
      
        try {
            const res = await axios.post(`http://localhosft:4000/auth/login`, data);
            console.log(res.data)
            if(!res.data.success) {
                toast.error("Wrong credentials!  Try again", {
                    position: "top-right"
                  });
            } else {
                toast.success("Login successful!", {
                    position: "top-right"
                  });
            }

        } catch (error) {
            console.log('error')
            console.log(error)
            throw new Error('this is a very bad nasty error')
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
                <Link href="/auth/register">New here? Register now!</Link>
                </div>
            </form>
        </Form>

    )
}
