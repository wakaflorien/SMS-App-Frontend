"use client";
import {
    Card, IconButton,
    SpeedDial,
    SpeedDialHandler,
    Alert,
    Dialog,
    DialogHeader,
    DialogBody,
    CardBody,
    Textarea,
    DialogFooter,
    Button,
} from "../../../utils/material_tailwind";
import {
    ChatBubbleBottomCenterTextIcon, UserIcon,
} from "@heroicons/react/24/outline";
import { DefaultPagination } from "@/app/components/Pagination";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DynamicTable } from "@/app/components/Tables/DynamicTable";
import { ContentModal } from "@/app/components/Modals/ContentModal";
import { Loading } from "../../components/ui/Loading";
import { TABLE_HEAD_MESSAGE, TABLE_ROWS_MESSAGE } from "../../components/Tables/Tablecolumns";
import { MessageModalContent } from "@/app/components/Modals/CreateModals";
import { useQuery } from "react-query";
import { getMessages, sendMessage } from "@/utils/https/messages";
import { useMutation } from "react-query";

export default function Messages() {
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const router = useRouter()

    const handleOpen = () => setOpen(!open);

    const {
        data: posts,
        error,
        isLoading,
    } = useQuery("postsData", getMessages);

    const mutation = useMutation((newMessage) => {
        sendMessage(newMessage);
    })

    const handleSend = () => {
        setOpenAlert(true)
        mutation.mutate({
            "from": "InfoText",
            "numbers": "+250786461106",
            "message": "Waguan Bad man Testing 1",
            "isGroup": false
        }
        )
    }
    const handleAlertOpen = () => setOpenAlert(!openAlert);

    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Message / Send to number</DialogHeader>
                <DialogBody divider>
                    <Card className="mt-6 w-full shadow-none">
                        <div className="px-6">
                            <div className="w-full space-y-4">
                                {mutation.isLoading ? <Loading /> :
                                    mutation.isError ? <Alert open={openAlert} color="red" onClose={handleAlertOpen}>{mutation.error.message}</Alert> :
                                        <Alert open={openAlert} color="green" onClose={handleAlertOpen}>Message sent successfully</Alert>}
                                <form>
                                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                            </svg>
                                        </div>
                                        <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search contact by names, number..." required />
                                    </div>
                                </form>

                            </div>

                        </div>
                        <CardBody className="space-y-4">
                            <div className="w-full">
                                <Textarea label="Message" className="w-full" />
                            </div>
                        </CardBody>
                    </Card>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="outlined"
                        onClick={handleOpen}
                        className="mr-1 normal-case"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="blue" onClick={handleSend} className="normal-case">
                        <span>Send</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            {/* <ContentModal
                title="Message / Send to number"
                open={open}
                handleOpen={handleOpen}
                okText="Send" cancelText="Cancel"
                modalContent={
                    
                }
            /> */}
            {isLoading ? <Loading /> :
                error ?
                    <div className="flex items-center justify-between">
                        <Alert color="red">{error.message}</Alert>
                    </div> :
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
                    </div>}
        </>
    )
}