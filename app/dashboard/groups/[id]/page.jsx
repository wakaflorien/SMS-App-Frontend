"use client";
import {ConfirmModal} from "@/components/Modals/ConfirmModal";
import {ContentModal} from "@/components/Modals/ContentModal";
import {EditGroupModalContent} from "@/components/Modals/EditForms";
import {Button, Card, CardBody, CardFooter, Typography, Textarea} from "@material-tailwind/react"
import {ArrowLeftCircleIcon} from "@heroicons/react/24/outline";
import {useRouter, useSearchParams} from "next/navigation"
import {useState} from "react";
import {useQuery} from "react-query";
import {getContact} from "@/utils/https/contacts";
import {getGroup, getGroupContacts, getGroupsContacts} from "@/utils/https/groups";
import {Loading} from "@/components/ui/Loading";

export default function ViewGroup() {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const handleOpenConfirm = () => setOpenConfirm(!openConfirm);
    const handleOpenEdit = () => setOpenEdit(!openEdit);

    const router = useRouter()
    const searchParams = useSearchParams();
    const groupId = searchParams.get("id")

    const {
        data: responseGroup,
        error,
        isLoading,
    } = useQuery(["groupData", groupId], () => getGroup(groupId));
    // const {
    //     data: responseGroupContacts,
    //     error: contacterror,
    //     isLoading: contactload
    // } = useQuery(["groupContactsData", groupId], () => getGroupContacts(groupId));
    //
    // console.log("SPECIFIC GROUP", responseGroupContacts)

    const handleOk = () => {
        console.log("ok")
        setOpenConfirm(false);
    }
    const handleCancel = () => {
        console.log("cancel")
        setOpenConfirm(false);
    }

    if (isLoading) {
        return <Loading/>;
    }

    if (error) {
        return <span>Error...</span>;
    }

    return (
        <>
            <ContentModal
                title="Edit Group"
                open={openEdit}
                handleOpen={handleOpenEdit}
                okText="Edit" cancelText="Cancel"
                modalContent={<EditGroupModalContent/>}
            />
            <ConfirmModal
                title="Edit Message"
                open={openConfirm}
                handleOpen={handleOpenConfirm}
                okText="Send" cancelText="Cancel"
                color="red"
                message={"Are you sure you want to delete this Group?"}
                showButtons={true}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />
            <div className="flex flex-col  p-4 space-y-11 cursor-pointer">
                <header className="self-center">Group / Single group</header>
                <div className="flex items-center justify-between cursor-pointer">
                    <div className="w-fit normal-case flex gap-2" onClick={() => router.back()}>
                        <ArrowLeftCircleIcon className="w-5"/>
                        <span>Back</span>
                    </div>
                </div>
                <Card className="mt-6 w-full">
                    <CardBody className="space-y-4">
                        <Typography variant="lead" color="blue-gray" className="flex justify-between">
                            {responseGroup.name}
                            <Button variant="outlined" size="small" className="normal-case w-24"
                                    onClick={handleOpenEdit}>
                                Edit
                            </Button>
                        </Typography>
                        <Typography className="flex justify-between">
                            {responseGroup.description}
                        </Typography>
                        <Typography className="flex justify-between">
                            Members: 789
                            <Button color="red" size="small" className="normal-case w-24" onClick={handleOpenConfirm}>
                                Delete
                            </Button>
                        </Typography>
                        <Typography variant="lead" color="blue-gray" className="w-1/2">
                            Contact List
                        </Typography>
                        <div className="flex justify-between">
                            <Typography variant="small" color="blue-gray">
                                Name 1
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                                02/10/2022 at 10:00, By Peter
                            </Typography>
                        </div>
                        <div className="flex justify-between">
                            <Typography variant="small" color="blue-gray">
                                Name 2
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                                02/10/2022 at 10:00, By John
                            </Typography>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}