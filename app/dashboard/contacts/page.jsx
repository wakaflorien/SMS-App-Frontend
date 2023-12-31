"use client";
import {ContentModal} from "@/components/Modals/ContentModal";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useCallback, useState} from "react";
import {
    Card, IconButton,
    SpeedDial,
    SpeedDialHandler, Input, CardBody, Typography, Textarea, Alert
} from "@material-tailwind/react";
import {
    UserIcon, UserPlusIcon
} from "@heroicons/react/24/outline";
import {DefaultPagination} from "@/components/Pagination";
import {useMutation, useQuery} from "react-query";
import {getContacts, createContact} from "@/utils/https/contacts"
import {Loading} from "@/components/ui/Loading";

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
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    const handleAlertOpen = () => setOpenAlert(!openAlert);
    const handleOpen = () => setOpen(!open);

    const {data: result, error, isLoading, refetch} = useQuery("contactsData", getContacts);

    const createMutation = useMutation((newContact) => {
        createContact(newContact);
    })

    const handleSubmit = () => {
        createMutation.mutate(contactBody)
    }
    if (createMutation.isLoading) {
        return router.push("/dashboard/contacts")
    }
    if (createMutation.isError) {
        return <Alert open={openAlert} color="red" onClose={handleAlertOpen}>{createMutation.error.message}</Alert>
    }

    if(createMutation.isSuccess) {
        refetch()
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
                        <CardBody className="space-y-4">
                            <Typography color="gray" className="mt-1 font-normal">
                                Enter your details to create a new contact.
                            </Typography>
                            <div className="mb-4 flex flex-col gap-6">
                                <Input size="lg" label="Name"
                                       onChange={(e) => setContactBody({...contactBody, name: e.target.value})}/>
                                <Input size="lg" label="Email"
                                       onChange={(e) => setContactBody({...contactBody, email: e.target.value})}/>
                                <Input type="phone" size="lg" label="Phone" onChange={(e) => setContactBody({
                                    ...contactBody,
                                    phone_number: e.target.value
                                })}/>
                            </div>
                            <div className="w-full">
                                <Textarea label="Description" className="w-full" onChange={(e) => setContactBody({
                                    ...contactBody,
                                    description: e.target.value
                                })}/>
                            </div>
                        </CardBody>
                    </Card>
                }
            />
            {isLoading ? <Loading/> :
                error ?
                    <div className="flex items-center justify-between">
                        <Alert color="red">{error.message}</Alert>
                    </div> :
                    <div className="flex flex-col  p-4 space-y-3">
                        <header className="self-center">All Contacts</header>
                        <Card className="h-fit w-full rounded-none space-y-4">
                            <div className="w-full px-6 pt-6">
                                <Input label="Search contact" size="lg" icon={<UserIcon className="h-5 w-5"/>}/>
                            </div>
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
                                            <tr key={index} className="cursor-pointer"
                                                onClick={() => router.push(pathname + '/single?' + createQueryString("id", item._id))}>
                                                <td className={`${classes} capitalize`}>
                                                    {item.name}
                                                </td>
                                                <td className={classes}>
                                                    {item.phone_number}
                                                </td>
                                                <td className={classes}>
                                                    {item.email}
                                                </td>

                                            </tr>)
                                    }
                                )}
                                </tbody>
                            </table>
                        </Card>
                        <div className="flex items-center justify-between  w-full overflow-x-scroll">
                            <DefaultPagination className="mt-4"/>
                            <SpeedDial>
                                <SpeedDialHandler onClick={handleOpen}>
                                    <IconButton size="lg" className="rounded-full">
                                        <UserPlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45"/>
                                    </IconButton>
                                </SpeedDialHandler>
                            </SpeedDial>
                        </div>
                    </div>
            }
        </>
    )
}