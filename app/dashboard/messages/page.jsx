"use client";
import {
    Card, Typography, IconButton,
    SpeedDial,
    SpeedDialHandler,
    Input,
    CardBody,
    Textarea,
} from "../../../utils/material_tailwind";
import {
    ChatBubbleBottomCenterTextIcon, UserIcon, 
} from "@heroicons/react/24/outline";
import { DefaultPagination } from "@/app/components/pagination";
import { useState } from "react";
import { TABLE_HEAD_MESSAGE, TABLE_ROWS_MESSAGE } from "@/app/components/tablecolumns";
import { ConfirmModal } from "@/app/components/confirmModal";
import { useRouter } from "next/navigation";
import { DynamicTable } from "@/app/components/DynamicTable";


export default function Messages() {
    const [open, setOpen] = useState(false);

    const router = useRouter()

    const handleOpen = () => setOpen(!open);
    const modalContent = (

        <Card className="mt-6 w-full shadow-none ">
            <div className="px-6">
                <div className="w-full">
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
                <div className="w-full">
                    <Textarea label="Message" className="w-full" />
                </div>
            </CardBody>

        </Card>

    )
    return (
        <>
            <ConfirmModal
                title="Message / Send to number"
                open={open}
                handleOpen={handleOpen}
                okText="Send" cancelText="Cancel"
                modalContent={modalContent}
            />
            <div className="flex flex-col  p-4 space-y-3">
                <header className="self-center">Messages</header>
                <Card className="h-fit w-full rounded-none">
                    <DynamicTable columns={TABLE_HEAD_MESSAGE} data={TABLE_ROWS_MESSAGE} />
                </Card>
                <div className="flex items-center justify-between">
                    <DefaultPagination className="mt-4" />
                    <SpeedDial>
                        <SpeedDialHandler onClick={handleOpen}>
                            <IconButton size="lg" className="rounded-full">
                                <ChatBubbleBottomCenterTextIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                            </IconButton>
                        </SpeedDialHandler>
                    </SpeedDial>
                </div>
            </div>
        </>
    )
}