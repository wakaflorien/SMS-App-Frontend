"use client"
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip, IconButton,
} from "@/utils/material_tailwind";
import {ArrowLeftCircleIcon, AtSymbolIcon, PencilIcon, PhoneIcon} from "@heroicons/react/24/outline";
import {UserCircleIcon} from "@heroicons/react/24/solid";
import {EditContactModalContent, EditUserModalContent} from "@/components/Modals/EditForms";
import {ContentModal} from "@/components/Modals/ContentModal";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function ProfileCard() {
    const [openEdit, setOpenEdit] = useState(false);
    const router = useRouter()
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
            <Card className="w-full h-screen lg:rounded-none">
                {/*<CardHeader floated={false} className="relative h-1/2 shadow-none flex justify-center bg-secondary">*/}
                {/*    <ArrowLeftCircleIcon className={"absolute h-5 w-5 cursor-pointer left-0 top-0 m-2 lg:m-4"} onClick={() => router.back()}/>*/}
                {/*    <img*/}
                {/*        src="https://static.vecteezy.com/system/resources/thumbnails/001/838/754/small_2x/elegant-business-woman-working-in-laptop-free-vector.jpg"*/}
                {/*        className="w-fit md:h-64 w-fit md:w-64 rounded-full border border-secondary"*/}
                {/*    />*/}
                {/*</CardHeader>*/}
                <CardBody className="text-center lg:p-12 p-4">
                    <ArrowLeftCircleIcon className={"absolute h-5 w-5 cursor-pointer left-0 top-0 m-2 lg:m-4"} onClick={() => router.back()}/>
                    <Typography variant="h4" className="mb-2 text-primary">
                        Sheldon Group
                    </Typography>
                    <Typography variant="lead" className="text-primary font-normal">
                        FinTech Buzz
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
                    <div className="w-fill space-y-8">
                        <div className="flex items-center justify-between border-b mt-4">
                            <Typography variant="h5" className="text-primary font-normal ">Message History</Typography>
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
