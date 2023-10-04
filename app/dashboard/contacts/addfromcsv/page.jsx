"use client";
import {
    Card, Typography,
    CardBody,
    Textarea,
    Select,
    Option,
    CardFooter,
    Button,
    SpeedDialHandler,
    IconButton,
    SpeedDial,
} from "../../../../utils/material_tailwind";
import { DefaultPagination } from "@/app/components/Pagination";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftCircleIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { ContactModalContent } from "@/app/components/CreateModals";
import { ContentModal } from "@/app/components/ContentModal";


export default function AddFromCsv() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleOpen = () => setOpen(!open);
    return (
        <>
            <ContentModal
                title="Create new Contact"
                open={open}
                handleOpen={handleOpen}
                okText="Create" cancelText="Cancel"
                modalContent={<ContactModalContent />}
            />
            <div className="flex flex-col w-full shadow-none p-4 space-y-3">
                <header className="self-center">Contact / Create from csv</header>
                <div className="flex items-center justify-between cursor-pointer">
                    <div className="w-fit normal-case flex gap-2" onClick={() => router.back()}>
                        <ArrowLeftCircleIcon className="w-5" />
                        <span>Back</span>
                    </div>
                </div>
                <Card className="h-fit w-full rounded-none">
                    <div className="px-6 pt-6">
                        <div className="w-full">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload Csv file</label>
                            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                        </div>
                    </div>
                    <CardBody className="">
                        <div className="w-full">
                            <Textarea label="Description" className="w-full" />
                        </div>
                    </CardBody>
                    <CardFooter>
                        <div className="flex items-center justify-between">
                            <Button color="green" className="normal-case">
                                Create
                            </Button>
                        </div>
                    </CardFooter>
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