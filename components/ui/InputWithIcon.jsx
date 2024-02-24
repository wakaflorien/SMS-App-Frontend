"use client";
import { UserIcon } from "@heroicons/react/24/solid";
import { Input, Button } from "@material-tailwind/react";
import { useState } from "react";

export function InputWithButton({ placeHolder, type }) {
  const [email, setEmail] = useState("");
  const onChange = ({ target }) => setEmail(target.value);

  return (
    <div className="relative flex w-full">
      <div className="w-full flex items-center justify-center bg-white/25 py-2 px-3 rounded-none">
        <UserIcon className="h-6 w-6 mx-3" />
        <input type={type} placeholder={placeHolder} className="flex-grow bg-transparent !border-none !outline-transparent focus:!border-none  placeholder-white" />
      </div>
    </div>
  );
}
