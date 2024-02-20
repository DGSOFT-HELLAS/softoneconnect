import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import RegisterForm from "@/app/_components/RegisterForm"
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}




export default function AuthenticationPage() {
    return (
        <div className="auth_container">
            <div className="auth_form_container">
                <div className="register_text">
                    <h1>Create an account</h1>
                    <p>Enter your email below to create your account</p>
                </div>
                <RegisterForm  />
            </div>
        </div>
    )
}