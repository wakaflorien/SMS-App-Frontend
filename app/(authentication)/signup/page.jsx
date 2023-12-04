'use client'
import { useState } from "react"
import {
    Button,
    Card,
    Checkbox,
    Input,
    Typography
} from "@material-tailwind/react";
import { usePathname, useRouter } from "next/navigation";
import { BreadcrumbsDefault } from "../../../components/Crumbs";

export default function Signup() {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <main className={"flex flex-col items-center justify-center lg:py-20"}>
            <header className={"lg:w-1/2 w-full mx-auto"}>
                <BreadcrumbsDefault pathname={pathname} />
            </header>
            <Card color="transparent" shadow={false} className="h-full flex items-center rounded-none">
                <Typography variant="h4" color="blue-gray">
                    Sign Up
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Enter your details to register.
                </Typography>
                <form className="mt-8 mb-2 w-full lg:w-1/2 max-w-screen-lg">
                    <div className="flex flex-col gap-6">
                        <Input type="text" size="lg" label="Firstname" />
                        <Input type="text" size="lg" label="Lastname" />
                        <Input type="text" size="lg" label="Email" />
                        <Input type="tel" size="lg" label="Phone number" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
                        <Input type="password" size="sm" label="Password" />
                    </div>
                    <Checkbox
                        label={
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center font-normal"
                            >
                                I agree the
                                <a
                                    href="#"
                                    className="font-medium transition-colors hover:text-gray-900"
                                >
                                    &nbsp;Terms and Conditions
                                </a>
                            </Typography>
                        }
                        containerProps={{ className: "-ml-2.5" }}
                    />
                    <Button className="mt-6 bg-primary normal-case" ripple={true} fullWidth>
                        Sign up
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Already have an account?{" "}
                        <a href="#" className="font-medium text-gray-900">
                            Sign In
                        </a>
                    </Typography>
                </form>
            </Card>
        </main>
    )
}