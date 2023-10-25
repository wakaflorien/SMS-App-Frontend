"use client";
import {ConfirmModal} from "../../../components/Modals/ConfirmModal";
import {ContentModal} from "../../../components/Modals/ContentModal";
import {Button, Card, CardBody, Typography} from "@material-tailwind/react";
import {ArrowLeftCircleIcon} from "@heroicons/react/24/outline";
import {useRouter, useSearchParams} from "next/navigation"
import {useState} from "react"
import {useMutation, useQuery} from "react-query";
import {deleteContact, getContact, updateContact} from "../../../../utils/https/contacts";
import {Loading} from "../../../components/ui/Loading";
import {Input, Textarea} from "@material-tailwind/react";

export default function ViewMessage() {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const handleOpenConfirm = () => setOpenConfirm(!openConfirm);
    const handleOpenEdit = () => setOpenEdit(!openEdit);

    const router = useRouter()
    const searchParams = useSearchParams();
    const contactId = searchParams.get("id")

    const {
        data: responseContact,
        error,
        isLoading,
        refetch
    } = useQuery(["contactData", contactId], () => getContact(contactId));

    const [contactBody, setContactBody] = useState({
        name: responseContact?.name || "",
        email: responseContact?.email || "",
        phone_number: responseContact?.phone_number || "",
        description: responseContact?.description || "",
    })

    const deleteMutation = useMutation(["deleteContact", contactId], () => deleteContact(contactId));
    const updateMutation = useMutation(["updateContact", contactId, contactBody], () => {
        updateContact(contactId, contactBody)
    });

    const handleOk = () => {
        deleteMutation.mutate();
    }
    const handleSubmit = () => {
        updateMutation.mutate();
        setOpenEdit(false)
    }
    const handleCancel = () => {
        setOpenConfirm(false);
    }
    const handleChange = (e) => {
        const {name, value} = e.target
        setContactBody((prevState) => (
            {
                ...prevState, [name]: value
            }
        ));
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (error) {
        return <span>Error...</span>;
    }

    if (deleteMutation.isLoading || updateMutation.isLoading) {
        return <Loading/>;
    }

    if (deleteMutation.isError || updateMutation.isError) {
        return <span>Error: {deleteMutation.isError ? deleteMutation.error.message : updateMutation.isError}</span>;
    }

    if (deleteMutation.isSuccess) {
        return router.push("/dashboard/contacts");
    }

    if (updateMutation.isSuccess) refetch();
    return (
        <>
            <ContentModal
                title="Edit Contact"
                open={openEdit}
                handleOpen={handleOpenEdit}
                okText="Edit" cancelText="Cancel"
                handleSubmit={handleSubmit}
                modalContent={
                    <>
                        <Card className="mt-6 w-full shadow-none ">
                            <div className="px-6">
                                <div className="w-full space-y-4">
                                    <Input type="text" label="Contact Name" value={contactBody.name} name={"name"}
                                           className="w-full"
                                           onChange={handleChange}/>
                                    <Input type="telephone" label="Telephone" value={contactBody.phone_number}
                                           name={"phone_number"}
                                           className="w-full"
                                           onChange={handleChange}/>
                                    <Input size="lg" label="Email" value={contactBody.email} name={"email"}
                                           onChange={handleChange}/>
                                </div>
                            </div>
                            <CardBody className="space-y-4">
                                <div className="w-full">
                                    <Textarea label="Description" value={contactBody.description}
                                              className="w-full"
                                              name={"description"}
                                              onChange={handleChange}/>
                                </div>
                            </CardBody>
                        </Card>
                    </>
                }
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
                        <ArrowLeftCircleIcon className="w-5"/>
                        <span>Back</span>
                    </div>
                </div>
                <Card className="mt-6 w-full">
                    <CardBody className="space-y-4">
                        <Typography variant="lead" color="blue-gray" className="flex justify-between capitalize">
                            Name: {responseContact.name}
                            <Button variant="outlined" size="small" className="normal-case w-24"
                                    onClick={handleOpenEdit}>
                                Edit
                            </Button>
                        </Typography>
                        <Typography className="flex justify-between space-y-4">
                            <span>Tel: {responseContact.phone_number}</span>
                            <span>Email: {responseContact.email}</span>
                            <Button color="red" size="small" className="normal-case w-24" onClick={handleOpenConfirm}>
                                Delete
                            </Button>
                        </Typography>
                    </CardBody>
                </Card>
            </div>
        </>)
}