'use client'
import { Card, Typography } from "@material-tailwind/react";
import { SignupForm } from "@/components/Buttons/SignupForm";
import Link from "next/link";

export default function Login() {
  return (
    <main className={"flex flex-col items-center justify-center lg:py-10"}>
      <Card
        color="transparent"
        shadow={false}
        className="flex items-center rounded-none"
      >
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <div className={"flex flex-col space-y-8 w-[500px] items-center"}>
          <SignupForm />
        </div>
        <Typography className=" justify-self-start w-full mt-10 text-xl">
          Already have account?{" "}
          <Link href="/login" className="text-primary font-semibold">
            Login
          </Link>
        </Typography>
      </Card>
    </main>
  );
}
