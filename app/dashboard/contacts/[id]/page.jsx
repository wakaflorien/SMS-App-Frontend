"use client";
import { ConfirmModal } from "@/app/components/Modals/ConfirmModal";
import { ContentModal } from "@/app/components/Modals/ContentModal";
import { Button, Card, CardBody, CardFooter, Typography, Textarea } from "@/utils/material_tailwind"
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation"
import { useState } from "react";
import {EditContactModalContent} from "@/app/components/Modals/EditForms";

export default function ViewMessage() {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const handleOpenConfirm = () => setOpenConfirm(!openConfirm);
    const handleOpenEdit = () => setOpenEdit(!openEdit);
    const router = useRouter()
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
                title="Edit Contact"
                open={openEdit}
                handleOpen={handleOpenEdit}
                okText="Edit" cancelText="Cancel"
                modalContent={<EditContactModalContent />}
            />
            <ConfirmModal
                title="Edit Message"
                open={openConfirm}
                handleOpen={handleOpenConfirm}
                okText="Send" cancelText="Cancel"
                color="red"
                message={"Are you sure you want to delete this contact?"}
                showButtons={true}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />
            <div className="flex flex-col  p-4 space-y-11 cursor-pointer">
                <header className="self-center">Contact / Single contact</header>
                <div className="flex items-center justify-between cursor-pointer">
                    <div className="w-fit normal-case flex gap-2" onClick={() => router.back()}>
                        <ArrowLeftCircleIcon className="w-5" />
                        <span>Back</span>
                    </div>
                </div>
                <Card className="mt-6 w-full">
                    <CardBody className="space-y-4">
                        <Typography variant="lead" color="blue-gray" className="flex justify-between">
                            Contact: Ojomo Keyune
                            <Button variant="outlined" size="small" className="normal-case w-24" onClick={handleOpenEdit}>
                                Edit
                            </Button>
                        </Typography>
                        <Typography className="flex justify-between">
                            Tel: +34 123 456 789
                            <Button color="red" size="small" className="normal-case w-24" onClick={handleOpenConfirm}>
                                Delete
                            </Button>
                        </Typography>
                        <Typography variant="lead" color="blue-gray" className="w-1/2">
                            Groups
                        </Typography>
                        <div className="flex justify-between">
                            <Typography variant="small" color="blue-gray">
                                Group 1
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                                02/10/2022 at 10:00, By Peter
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                                02/10/2022 at 10:00, By John
                            </Typography>
                        </div>
                        <div className="flex justify-between">
                            <Typography variant="small" color="blue-gray">
                                Group 2
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                                02/10/2022 at 10:00, By John
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                                02/10/2022 at 10:00, By Peter
                            </Typography>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}