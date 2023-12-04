"use client";
import { ConfirmModal } from "../../../../components/Modals/ConfirmModal";
import { ContentModal } from "../../../../components/Modals/ContentModal";
import { EditMessageModalContent } from "../../../../components/Modals/EditForms";
import {
    Button, Card, CardBody, CardFooter, Typography, SpeedDial, IconButton,
    SpeedDialHandler
} from "@material-tailwind/react";
import { ChatBubbleBottomCenterTextIcon, ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import {useRouter, useSearchParams} from "next/navigation"
import { useState } from "react";
import {MessageModalContent} from "../../../../components/Modals/CreateModals";
import {useQuery} from "react-query";
import {getContact} from "@/utils/https/contacts";
import {getMessages} from "@/utils/https/messages";

export default function ViewMessage() {
    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);

    const router = useRouter()
    const searchParams = useSearchParams();
    const messageId = searchParams.get("id")

    const handleOpen = () => setOpen(!open);
    const handleOpenConfirm = () => setOpenConfirm(!openConfirm);

    // const {
    //     data: responseMessage,
    //     error,
    //     isLoading,
    //     refetch
    // } = useQuery(["messageData", messageId], () => getMessages(messageId));
    //
    // const [messageBody, setMessageBody] = useState({
    //     name: responseMessage?.name || "",
    //     email: responseMessage?.email || "",
    //     phone_number: responseMessage?.phone_number || "",
    //     description: responseMessage?.description || "",
    // })

    const handleOk = () => {
        console.log("ok")
        setOpenConfirm(false);
    }
    const handleCancel = () => {
        console.log("cancel")
        setOpenConfirm(false);
    }


    return (
        <>
            <ContentModal
                title="Message / Send to number"
                open={open}
                handleOpen={handleOpen}
                okText="Send" cancelText="Cancel"
                modalContent={<MessageModalContent />}
            />
            <ConfirmModal
                title="Edit Message"
                open={openConfirm}
                handleOpen={handleOpenConfirm}
                okText="Send" cancelText="Cancel"
                color="red"
                message={"Are you sure you want to delete this message?"}
                showButtons={true}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />
            <div className="flex flex-col  p-4 space-y-3 cursor-pointer">
            <header className="self-center">Single Message</header>
                <div className="w-fit normal-case flex gap-2" onClick={() => router.back()}>
                    <ArrowLeftCircleIcon className="w-5" />
                    <span>Back</span>
                </div>
                <Card className="mt-6 w-full">
                    <CardBody className="space-y-4">
                        <Typography variant="lead" color="blue-gray" className="flex justify-between">
                            Contact: +34 123 456 789
                            <Button color="red" size="small" className="normal-case w-24" onClick={handleOpenConfirm}>
                                Delete
                            </Button>
                        </Typography>
                        <Typography className="flex justify-between">
                            Is group message? True
                        </Typography>
                        <Typography variant="p" color="blue-gray" className="w-1/2">
                            The place is close to Barceloneta Beach and bus stop just 2 min by
                            walk and near to &quot;Naviglio&quot; where you can enjoy the main
                            night life in Barcelona.The place is close to Barceloneta Beach and bus stop just 2 min by
                            walk and near to &quot;Naviglio&quot; where you can enjoy the main
                            night life in Barcelona.
                        </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Typography variant="small" color="blue-gray">
                            02/10/2022 at 10:00, By John
                        </Typography>
                    </CardFooter>
                </Card>
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