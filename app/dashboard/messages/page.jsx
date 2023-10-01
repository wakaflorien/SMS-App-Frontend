"use client";
import {
    Card, Typography, IconButton,
    SpeedDial,
    SpeedDialHandler,
} from "../../../utils/material_tailwind";
import {
    ChatBubbleBottomCenterTextIcon, UserPlusIcon
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

    return (
        <>
            <ConfirmModal open={open} handleOpen={handleOpen} />
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
                                <UserPlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                            </IconButton>
                        </SpeedDialHandler>
                    </SpeedDial>
                </div>
            </div>
        </>
    )
}