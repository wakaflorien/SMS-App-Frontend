"use client"
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip, IconButton,
} from "@/utils/material_tailwind";
import {AtSymbolIcon, PencilIcon, PhoneIcon} from "@heroicons/react/24/outline";
import {UserCircleIcon} from "@heroicons/react/24/solid";
import {EditContactModalContent, EditUserModalContent} from "@/app/components/EditForms";
import {ContentModal} from "@/app/components/ContentModal";
import {useState} from "react";

export default function ProfileCard() {
    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(!openEdit);
    return (
        <>
            <ContentModal
                title="Edit Contact"
                open={openEdit}
                handleOpen={handleOpenEdit}
                okText="Edit" cancelText="Cancel"
                modalContent={<EditUserModalContent />}
            />
            <Card className="w-full h-screen">
                <CardHeader floated={false} className="h-80 shadow-none flex items-center justify-center">
                    <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/001/838/754/small_2x/elegant-business-woman-working-in-laptop-free-vector.jpg"
                        className="h-full w-80 rounded-full border border-secondary"
                    />
                </CardHeader>
                <CardBody className="text-center lg:p-12 p-4">
                    <Typography variant="h4" className="mb-2 text-primary">
                        Natalie Paisley
                    </Typography>
                    <Typography variant="lead" className="text-primary font-normal">
                        Technical Assistant
                    </Typography>
                    <div className="w-fill space-y-8">
                        <div className="flex items-center justify-between border-b mt-4">
                            <Typography variant="h5" className="text-primary font-normal ">Profile Info</Typography>
                            <IconButton onClick={handleOpenEdit} size="lg" variant="outlined" className="rounded-full border-none">
                                <PencilIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                            </IconButton>
                        </div>
                        <div className="flex flex-col items-start gap-4">
                            <Typography variant="p" className="flex gap-2">
                                <UserCircleIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                                MC Eluomo
                            </Typography>
                            <Typography variant="p" className="flex gap-2">
                                <UserCircleIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                                MC Eluomo
                            </Typography>
                            <Typography variant="p" className="flex gap-2">
                                <AtSymbolIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                                eluomo@gmail.com
                            </Typography>
                            <Typography variant="p" className="flex gap-2">
                                <PhoneIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                                +23709984399
                            </Typography>
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="flex justify-center gap-7 pt-2">
                    <Tooltip content="Like">
                        <Typography
                            as="a"
                            href="#facebook"
                            variant="lead"
                            color="blue"
                            textGradient
                        >
                            <i className="fab fa-facebook"/>
                        </Typography>
                    </Tooltip>
                    <Tooltip content="Follow">
                        <Typography
                            as="a"
                            href="#twitter"
                            variant="lead"
                            color="light-blue"
                            textGradient
                        >
                            <i className="fab fa-twitter"/>
                        </Typography>
                    </Tooltip>
                    <Tooltip content="Follow">
                        <Typography
                            as="a"
                            href="#instagram"
                            variant="lead"
                            color="purple"
                            textGradient
                        >
                            <i className="fab fa-instagram"/>
                        </Typography>
                    </Tooltip>
                </CardFooter>
            </Card>
        </>
    );
}
