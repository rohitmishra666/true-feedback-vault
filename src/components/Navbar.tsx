'use client'

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import React from "react"
import { User } from 'next-auth'
import { Button } from "@/components/ui/button"

const Navbar = () => {

    const { data: session } = useSession()
    const user: User = session?.user as User

    return (
        <nav className="p-4 md:p-6 shadow-md bg-slate-800">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <a href="/" className="text-xl font-bold mb-4 md:mb-0 text-white">True Feedback</a>
                {
                    session ? (
                        <>
                            <span className="mr-4 text-sm">Welcome, {user?.username || user?.email}</span>
                            <Button className="w-full md:w-auto" onClick={() => signOut()}>Sign Out</Button>
                        </>
                    ) : (
                        <Link href="/sign-in">
                            <Button className="w-full md:w-auto hover:bg-slate-300">Login</Button>
                        </Link>
                    )
                }
            </div>
        </nav>
    )

}

export default Navbar