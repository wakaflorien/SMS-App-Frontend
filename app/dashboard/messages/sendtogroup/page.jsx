"use client";
import {
    Card, Typography,
    CardBody,
    Textarea,
    Select,
    Option,
    CardFooter,
    Button,
    SpeedDial,
    SpeedDialHandler,
    IconButton,
} from "../../../../utils/material_tailwind";
import { DefaultPagination } from "@/app/components/Pagination";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftCircleIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline"; 
import { ContentModal } from "@/app/components/ContentModal";
import { MessageModalContent } from "@/app/components/ModalMessage";


export default function SendGroup() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const router = useRouter();
    return (
        <>
            <ContentModal
                title="Message / Send to number"
                open={open}
                handleOpen={handleOpen}
                okText="Send" cancelText="Cancel"
                modalContent={<MessageModalContent />}
            />
            <div className="flex flex-col w-full shadow-none p-4 space-y-3">
                <header className="self-center">Message / Send to group</header>
                <div className="flex items-center justify-between cursor-pointer">
                    <div className="w-fit normal-case flex gap-2" onClick={() => router.back()}>
                        <ArrowLeftCircleIcon className="w-5" />
                        <span>Back</span>
                    </div>
                </div>
                <Card className="h-fit w-full rounded-none">
                    <div className="px-6 pt-6">
                        <div className="w-full">
                            <Select label="Select Group">
                                <Option>Group 1</Option>
                                <Option>Group 2</Option>
                            </Select>
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
                            Search using group name.
                        </Typography>
                    </div>
                    <CardBody className="space-y-4">
                        <div className="w-full">
                            <Textarea label="Message" className="w-full" />
                        </div>
                    </CardBody>
                    <CardFooter>
                        <div className="flex items-center justify-between">
                            <Button color="green" className="normal-case">
                                Send
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
                <div className="flex items-center justify-between">
                    <DefaultPagination className="mt-4" />
                </div>
                <div className="flex items-center justify-end">
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