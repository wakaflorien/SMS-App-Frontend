'use client'
import { createElement, useState } from "react"
import {
    Button,
    Card,
    Checkbox,
    Input,
    Tab,
    TabPanel,
    Tabs,
    TabsBody,
    TabsHeader,
    Typography
} from "@/utils/material_tailwind";
import {
    UserCircleIcon,
    UserPlusIcon
} from "@heroicons/react/24/solid";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {BreadCrumbs} from "@/app/components/BreadCrumbs";

export default function Login() {

    const navList = [
        {
            label: "Signup",
            value: "signup",
            icon: UserPlusIcon,
        },
        {
            label: "Login",
            value: "login",
            icon: UserCircleIcon,
        }
    ]
    const [defaultTab, setDefaultTab] = useState("login")
    const router = useRouter()
    const pathname = usePathname()
    return (
        <main>
            <Tabs value={defaultTab}>
                <TabsHeader className="bg-secondary">
                    {navList.map(({ label, value, icon }) => (
                        <Tab key={value} value={value}>
                            <div className="flex items-center gap-2 text-primary">
                                {createElement(icon, { className: "w-5 h-5" })}
                                {label}
                            </div>
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody className="dark:bg-primary h-screen flex flex-col mb-8 ">
                    <BreadCrumbs pathname={pathname} />
                    <TabPanel key="signup" value="signup">
                        <Card color="transparent" shadow={false} className="h-full flex items-center rounded-none">
                            <Typography variant="h4" color="blue-gray">
                                Sign Up
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Enter your details to register.
                            </Typography>
                            <form className="mt-8 mb-2 w-full lg:w-96 max-w-screen-lg">
                                <div className="mb-4 flex flex-col gap-6">
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
                    </TabPanel>
                    <TabPanel key="login" value="login">
                        <Card color="transparent" shadow={false} className="flex items-center rounded-none">
                            <Typography variant="h4" color="blue-gray">
                                Login
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Enter your credentials to continue.
                            </Typography>
                            <form className="mt-8 mb-2 w-full lg:w-96 max-w-screen-lg">
                                <div className="mb-4 flex flex-col gap-6">
                                    <Input size="lg" label="Email" />
                                    <Input type="password" size="lg" label="Password" />
                                </div>
                                <Button className="mt-6 bg-primary normal-case" ripple={true} fullWidth
                                    onClick={() => router.push("/dashboard")}>
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
                    </TabPanel>
                </TabsBody>
            </Tabs>

        </main>
    )
}