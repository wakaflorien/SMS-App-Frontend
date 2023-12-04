'use client'
import {useState} from "react"
import {
    Button, Card, Checkbox, Input, Typography
} from "@material-tailwind/react";
import {usePathname, useRouter} from "next/navigation";
import {BreadcrumbsDefault} from "../../../components/Crumbs";
import {signIn, signOut, useSession} from "next-auth/react";

export default function Login() {
    const {data: session} = useSession()
    console.log("logged in user", session)
    const router = useRouter()

    const pathname = usePathname()
    if (session && session.user) {
        return router.push("/dashboard")
    }

    return (
        <main className={"flex flex-col items-center justify-center lg:py-20"}>
        <header className={"lg:w-full w-full mx-auto"}>
            <BreadcrumbsDefault pathname={pathname} />
        </header>
        <Card color="transparent" shadow={false} className="flex items-center rounded-none">
            <Typography variant="h4" color="blue-gray">
                Login
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Enter your credentials to continue.
            </Typography>
            <form className="mt-8 mb-2 w-full lg:w-full max-w-screen-lg">
                <div className="mb-4 flex flex-col gap-6">
                    <Input size="lg" label="Email" />
                    <Input type="password" size="lg" label="Password" />
                </div>
                <Button className="mt-6 bg-primary normal-case" ripple={true} fullWidth
                    onClick={() => signIn()}>
                    Login
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                    Don&apos;t have an account?{" "}
                    <a href="#" className="font-medium text-gray-900">
                        Sign Up
                    </a>
                </Typography>
            </form>
        </Card>
    </main>)
}
