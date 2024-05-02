'use client'
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import styles from './styles.module.css'

import {     LogOut } from 'lucide-react'

export default function SignOut() {
    const router = useRouter();
    const handleSignOut = async () => {
       await signOut({ redirect: false }).then(() => {
            router.push("/login");
        });
    };
    return (
        <div
            onClick={handleSignOut}
            className={styles.logout}>
            <LogOut />
            <span>
                Logout
            </span>
        </div>
    );
}