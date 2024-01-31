import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import LoginForm from "@/app/_components/LoginForm";
export const metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}

export default function Login() {
    return (
        <div className="auth_container">
            <div className="auth_form_container">
                <div className="register_text">
                    <h1>Login to your account</h1>
                    <p>Enter your credentials below to login</p>
                </div>
                <LoginForm />
                
            </div>
        </div>
    )
}