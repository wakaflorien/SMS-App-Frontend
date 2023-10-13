"use client";
import { Button } from "@/utils/material_tailwind";
import Link from "next/link";

export function Hero() {
  return (
    <div className="flex justify-center items-center text-center flex-col gap-72 mt-20">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-6xl font-extrabold">
          Make every message an oportunity.
        </h1>
        <div className="max-w-[25rem]">
          <p className="text-xl">
            Delight your custom with one simple SMS. Simplicity delivered
          </p>
        </div>
      </div>
      <Link href={"/authentication"}>
        <Button
          className="rounded-none py-3 px-8"
          variant="outlined"
          color="white"
        >
          Get Started
        </Button>
      </Link>
    </div>
  );
}
