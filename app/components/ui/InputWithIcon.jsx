"use client";
import { UserIcon } from "@heroicons/react/24/solid";
import { Input, Button } from "@material-tailwind/react";
import { useState } from "react";

export function InputWithButton() {
  const [email, setEmail] = useState("");
  const onChange = ({ target }) => setEmail(target.value);

  return (
    <div className="relative flex w-full">
      <div className="w-full flex items-center justify-center bg-white/25 py-2 px-3">
        <UserIcon className="h-6 w-6 mx-3" />
        <input type="text" placeholder="Full Name" className="flex-grow bg-transparent !border-none !outline-transparent placeholder-white" />
      </div>
    </div>
  );
}
