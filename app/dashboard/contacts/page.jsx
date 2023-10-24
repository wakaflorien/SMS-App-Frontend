"use client";
import { ContentModal } from "../../components/Modals/ContentModal";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
    Card, IconButton,
    SpeedDial,
    SpeedDialHandler, Input, CardBody, Typography, Textarea, Alert
} from "../../../utils/material_tailwind";
import {
    UserIcon, UserPlusIcon
} from "@heroicons/react/24/outline";
import { DefaultPagination } from "../../components/Pagination";
import { DynamicTable } from "../../components/Tables/DynamicTable";
import { ContactModalContent } from "../../components/Modals/CreateModals";
import { TABLE_HEAD_CONTACTS, TABLE_ROWS_CONTACTS } from "../../components/Tables/Tablecolumns";
import { useMutation, useQuery } from "react-query";
import { getContacts, createContact } from "../../../utils/https/contacts"
import { Loading } from "../../components/ui/Loading";

export default function Contacts() {
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [contactBody, setContactBody] = useState({
        name: "",
        email: "",
        phone_number: "",
        description: "",
    })
    const router = useRouter()
    const pathname = usePathname()

    const handleAlertOpen = () => setOpenAlert(!openAlert);

    const handleOpen = () => setOpen(!open);
    const { data: result, error, isLoading } = useQuery("contactsData", getContacts);

    const mutation = useMutation((newContact) => {
        createContact(newContact);
    })

    const handleSubmit = () => {
        mutation.mutate(contactBody)
    }

    return (
        <>
            <ContentModal
                title="Create new Contact"
                open={open}
                handleOpen={handleOpen}
                handleSubmit={handleSubmit}
                okText="Create" cancelText="Cancel"
                modalContent={
                    <Card className="w-full shadow-none">
                        {mutation.isLoading ? <Loading /> :
                            mutation.isError ? <Alert open={openAlert} color="red" onClose={handleAlertOpen}>{mutation.error.message}</Alert> :
                                <Alert open={openAlert} color="green" onClose={handleAlertOpen}>Message sent successfully</Alert>}
                        <CardBody className="space-y-4">
                            <Typography color="gray" className="mt-1 font-normal">
                                Enter your details to create a new contact.
                            </Typography>
                            <div className="mb-4 flex flex-col gap-6">
                                <Input size="lg" label="Name" onChange={(e) => setContactBody({ ...contactBody, name: e.target.value })} />
                                <Input size="lg" label="Email" onChange={(e) => setContactBody({ ...contactBody, email: e.target.value })} />
                                <Input type="phone" size="lg" label="Phone" onChange={(e) => setContactBody({ ...contactBody, phone_number: e.target.value })} />
                            </div>
                            <div className="w-full">
                                <Textarea label="Description" className="w-full" onChange={(e) => setContactBody({ ...contactBody, description: e.target.value })} />
                            </div>
                        </CardBody>
                    </Card>
                }
            />
            {isLoading ? <Loading /> :
                error ?
                    <div className="flex items-center justify-between">
                        <Alert color="red">{error.message}</Alert>
                    </div> :
                    <div className="flex flex-col  p-4 space-y-3">
                        <header className="self-center">All Contacts</header>
                        <Card className="h-fit w-full rounded-none space-y-4">
                            <div className="w-full px-6 pt-6">
                                <Input label="Search contact" size="lg" icon={<UserIcon className="h-5 w-5" />} />
                            </div>
                            {/* <DynamicTable columns={TABLE_HEAD_CONTACTS} data={TABLE_ROWS_CONTACTS} /> */}
                            <table className="w-full table-auto text-left">
                                <thead>
                                    <tr>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                            Name
                                        </th>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                            Phone Number
                                        </th>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                            Email
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result?.map((item, index) => {
                                        const isLast = index === result.length - 1;
                                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                        return (
                                            <tr key={index} className="cursor-pointer">
                                                <td className={`${classes} capitalize`} onClick={() => router.push(`${pathname}/{${item._id}`)}>
                                                    {item.name}
                                                </td>
                                                <td className={classes} onClick={() => router.push(`${pathname}/{${index}`)}>
                                                    {item.phone_number}
                                                </td>
                                                <td className={classes} onClick={() => router.push(`${pathname}/{${index}`)}>
                                                    {item.email}
                                                </td>

                                            </tr>)
                                    }
                                    )}
                                </tbody>
                            </table >
                        </Card>
                        <div className="flex items-center justify-between  w-full overflow-x-scroll">
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
            }
        </>
    )
}