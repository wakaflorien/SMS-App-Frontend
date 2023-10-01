"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Textarea,
  Input,
  CardHeader,
} from "@/utils/material_tailwind";
import { useRouter } from "next/navigation";
import { UserIcon } from "@heroicons/react/24/outline";
export default function SendToNumber() {
  const router = useRouter();
  return (
    <div className="flex flex-col  p-4 space-y-3 cursor-pointer">
      <header className="self-center">Message / Send To Number</header>
      <Button
        variant="outlined"
        className="w-fit normal-case"
        onClick={() => router.back()}
      >
        Back To List
      </Button>
      <Card className="mt-6 w-full">
        <div className="px-6 pt-6">
          <div className="w-full lg:w-3/5">
            <Input
              label="Search contact"
              size="lg"
              className="w-full"
              icon={<UserIcon className="h-5 w-5" />}
            />
          </div>
          <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center gap-1 font-normal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-px h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            Search using names, phone number or email.
          </Typography>
        </div>
        <CardBody className="space-y-4">
          <div className="w-full lg:w-3/5">
            <Textarea label="Message" className="w-full" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button>Send</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
