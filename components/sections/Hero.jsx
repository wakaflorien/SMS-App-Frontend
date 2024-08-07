"use client";
import Link from "next/link";
import {Button} from "@material-tailwind/react";
export function Hero() {
  return (
    <div className="flex justify-center items-center text-center flex-col gap-72 mt-20 min-h-full">
      <div className="flex flex-col gap-4 items-center px-5 ">
        <h1 className=" text-3xl xl:text-6xl font-extrabold">
            Connect to your audience in one simple click.
        </h1>
        <div className="max-w-[25rem]">
          <p className="text-xl">
              Effective Messaging.
              Simplified.
          </p>
        </div>
      </div>
      <Link href={"/login"}>
        <Button
          className="rounded-none py-3 px-8"
          variant="outlined"
          color="white"
          size={"lg"}
        >
          Get Started
        </Button>
      </Link>
    </div>
  );
}
