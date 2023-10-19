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
import { DefaultPagination } from "@/app/components/Pagination";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DynamicTable } from "@/app/components/Tables/DynamicTable";
import { ContentModal } from "@/app/components/Modals/ContentModal";
import { TABLE_HEAD_MESSAGE, TABLE_ROWS_MESSAGE } from "@/app/components/Tables/Tablecolumns";
import { MessageModalContent } from "@/app/components/Modals/CreateModals";


export default function Messages() {
    const [open, setOpen] = useState(false);
    const router = useRouter()

    const handleOpen = () => setOpen(!open);

    return (
        <>
            <ContentModal
                title="Message / Send to number"
                open={open}
                handleOpen={handleOpen}
                okText="Send" cancelText="Cancel"
                modalContent={<MessageModalContent />}
            />
            {/* <ConfirmModal
                title="Delete Message"
                open={open}
                handleOpen={handleOpen}
                okText="Send" cancelText="Cancel"
                modalContent={modalContent}
            /> */}
            <div className="flex flex-col p-4 space-y-3">
                <header className="self-center">Messages</header>
                <Card className="h-fit w-full rounded-none relative overflow-x-auto">
                    <DynamicTable columns={TABLE_HEAD_MESSAGE} data={TABLE_ROWS_MESSAGE} />
                </Card>
                <div className="flex items-center justify-between w-full overflow-x-scroll">
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