'use client'
import { Card, Typography } from "@material-tailwind/react";
import { usePathname, useRouter } from "next/navigation";
import {  GoogleSignInButton } from "@/components/Buttons/AuthButtons";
import { CredentialsForm } from "@/components/Buttons/CredentialsForm";
import { NavBar } from "@/components/sections/NavBar";

export default function Login() {
    const router = useRouter()

    const pathname = usePathname()

    return (
        <>
            <NavBar />
            <div className="h-screen flex items-center justify-center">
            <main className={"flex flex-col items-center justify-center lg:py-10"}>
                <header className={"lg:w-full w-full mx-auto"}>
                </header>
                <Card color="transparent" shadow={false} className="flex items-center rounded-none">
                    <Typography variant="h4" color="blue-gray">
                        Sign In
                    </Typography>
                    <div className={"flex flex-col space-y-8 w-[500px] items-center"}>
                        <div className={"w-full"}>
                            <GoogleSignInButton />
                        </div>
                        <span className={"font-bold text-base"}>Or</span>
                        <CredentialsForm />
                    </div>
                </Card>
            </main>
            </div>
        </>
    )
}
