"use client";
import {ContentModal} from "../../../components/Modals/ContentModal";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useCallback, useState} from "react";
import {
    Card,
    IconButton,
    SpeedDial,
    SpeedDialHandler,
    Input,
} from "../../../utils/material_tailwind";
import {UserGroupIcon} from "@heroicons/react/24/outline";
import {DefaultPagination} from "../../../components/Pagination";
import {DynamicTable} from "../../../components/Tables/DynamicTable";
import {
    TABLE_HEAD_GROUP,
    TABLE_ROWS_GROUPS,
} from "../../../components/Tables/Tablecolumns";
import {GroupsModalContent} from "../../../components/Modals/CreateModals";
import {Alert, CardBody, Textarea, Typography} from "@/utils/material_tailwind";
import {useMutation, useQuery} from "react-query";
import {createGroup, getGroups} from "@/utils/https/groups";
import {Loading} from "@/components/ui/Loading";
import moment from "moment";

export default function Groups() {
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [groupBody, setGroupBody] = useState({
        name: "",
        description: ""
    })
    const router = useRouter();
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
    const handleOpen = () => setOpen(!open);
    const handleAlertOpen = () => setOpenAlert(!openAlert);

    const {data: groupsData, error, isLoading, refetch} = useQuery("groupsData", getGroups)
    const createGroupMutation = useMutation((newGroup) => {
        createGroup(newGroup);
    })

    const handleSubmit = () => {
        createGroupMutation.mutate(groupBody)
    }
    const handleChange = (event) => {
        const { name, value } = event.target
        setGroupBody((prevState) => (
            {
                ...prevState, [name]: value
            }
        ))
    }

    if (createGroupMutation.isLoading) {
        return router.push("/dashboard/groups")
    }
    if (createGroupMutation.isError) {
        return <Alert open={openAlert} color="red" onClose={handleAlertOpen}>{createGroupMutation.error.message}</Alert>
    }

    if(createGroupMutation.isSuccess) {
        refetch()
    }

    return (
        <>
            <ContentModal
                title="Create new Group"
                open={open}
                handleOpen={handleOpen}
                handleSubmit={handleSubmit}
                okText="Create" cancelText="Cancel"
                modalContent={
                    <>
                        <Card className="w-full shadow-none">
                            <CardBody className="space-y-4">
                                <Typography color="gray" className="mt-1 font-normal">
                                    Enter your details to create a new Group.
                                </Typography>
                                <div className="mb-4 flex flex-col gap-6">
                                    <Input name={"name"} size="lg" label="Group Name" onChange={handleChange}/>
                                </div>
                                <div className="w-full">
                                    <Textarea name={"description"} label="Description" className="w-full" onChange={handleChange}/>
                                </div>
                            </CardBody>
                        </Card>
                    </>
                }
            />
            {isLoading ? <Loading/> :
                error ?
                    <div className="flex items-center justify-between">
                        <Alert color="red">{error.message}</Alert>
                    </div> :
                    <div className="flex flex-col  p-4 space-y-3">
                        <header className="self-center">All Groups</header>
                        <Card className="h-fit w-full rounded-none space-y-4">
                            <div className="w-full px-6 pt-6">
                                <Input
                                    label="Search group by name, number"
                                    size="lg"
                                    icon={<UserGroupIcon className="h-5 w-5"/>}
                                />
                            </div>
                            <table className="w-full table-auto text-left">
                                <thead>
                                <tr>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        Name
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        Description
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        Date Created
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {groupsData?.map((item, index) => {
                                        const isLast = index === groupsData.length - 1;
                                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                        return (
                                            <tr key={index} className="cursor-pointer"
                                                onClick={() => router.push(pathname + '/single?' + createQueryString("id", item._id))}>
                                                <td className={`${classes} capitalize`}>
                                                    {item.name}
                                                </td>
                                                <td className={classes}>
                                                    {item.description}
                                                </td>
                                                <td className={classes}>
                                                    {moment(item.createdAt).format("YYYY-MM-DD HH:mm A")}
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
                                        <UserGroupIcon className="h-5 w-5 transition-transform group-hover:rotate-45"/>
                                    </IconButton>
                                </SpeedDialHandler>
                            </SpeedDial>
                        </div>
                    </div>
            }
        </>
    );
}
