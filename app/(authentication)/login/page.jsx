'use client'
import {useState} from "react"
import {
    Button, Card, Checkbox, Input, Typography
} from "@material-tailwind/react";
import {usePathname, useRouter} from "next/navigation";
import {BreadcrumbsDefault} from "../../../components/Crumbs";
import {signIn, signOut, useSession} from "next-auth/react";
import {
    CredentialsSignInButton, FaceBookSignInButton,
    GithubSignInButton,
    GoogleLoginButton,
    GoogleSignInButton
} from "@/components/Buttons/AuthButtons";
import {CredentialsForm} from "@/components/Buttons/CredentialsForm";

export default function Login() {
    const {data: session} = useSession()
    console.log("logged in user", session)
    const router = useRouter()

    const pathname = usePathname()
    if (session && session.user) {
        return router.push("/dashboard")
    }

    return (
        <main className={"flex flex-col items-center justify-center lg:py-10"}>
        <header className={"lg:w-full w-full mx-auto"}>
            <BreadcrumbsDefault pathname={pathname} />
        </header>
        <Card color="transparent" shadow={false} className="flex items-center rounded-none">
            <Typography variant="h4" color="blue-gray">
                Sign In
            </Typography>
            <div className={"flex flex-col space-y-8 w-[500px] items-center"}>
                <div className={"w-full"}>
                    <GoogleSignInButton />
                    {/*<FaceBookSignInButton />*/}
                    <GithubSignInButton />
                </div>
                <span className={"font-bold text-base"}>Or</span>
                <CredentialsForm />
            </div>
        </Card>
    </main>)
}
