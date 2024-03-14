'use client';
import {useState} from "react"
import {Card,Typography} from "@material-tailwind/react";
import {usePathname, useRouter} from "next/navigation";
import {SignupForm} from "@/components/Buttons/SignupForm";
import Link from "next/link";


export default function Login() {
    const router = useRouter()
    const [error, setError] = useState(null);

    const pathname = usePathname()

    const handleSignup = async (email,password,lastname,firstname) => {
        try {
            const res = await fetch('api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password,lastname,firstname}),
            })
            const data = await res.json()
            console.log('DATA',data)

            if (data.error) {
                setError(data.error);
              } 
            //   else {
            //     router.push('/dashboard');
            //   }
        } catch (error) {
            console.error(error);
            setError('Internal Server Error');
        }
    }

    return (
        <main className={"flex flex-col items-center justify-center lg:py-10"}>
            <Card color="transparent" shadow={false} className="flex items-center rounded-none">
                <Typography variant="h4" color="blue-gray">
                    Sign Up
                </Typography>
                <div className={"flex flex-col space-y-8 w-[500px] items-center"}>
                    <SignupForm handleSignup={handleSignup} error={error} />
                </div>
                <Typography className=" justify-self-start w-full mt-10 text-xl">Already have account? <Link href="/login" className="text-blue-700">Login</Link></Typography>
            </Card>
        </main>)
}
