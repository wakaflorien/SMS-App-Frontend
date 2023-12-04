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
    ChatBubbleBottomCenterTextIcon, MagnifyingGlassIcon, UserIcon,
} from "@heroicons/react/24/outline";
import {DefaultPagination} from "@/components/Pagination";
import {useCallback, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Loading} from "../../../components/ui/Loading";
import {useQuery} from "react-query";
import {getMessages, sendMessage} from "@/utils/https/messages";
import {useMutation} from "react-query";
import moment from "moment";

export default function Messages() {
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [sendBody, setSendBody] = useState({
        from: "InfoText",
        numbers: "+250786461106",
        message: "",
        isGroup: false

    })

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    const handleOpen = () => setOpen(!open);

    const {
        data: messages,
        error,
        isLoading,
        refetch
    } = useQuery("postsData", getMessages);

    const sendMessageMutation = useMutation((newMessage) => {
        sendMessage(newMessage);
    })

    const handleSend = () => {
        sendMessageMutation.mutate(sendBody)
        setOpen(false)
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setSendBody((prevState) => (
            {
                ...prevState, [name]: value
            }
        ))
    }
    const handleAlertOpen = () => setOpenAlert(!openAlert);

    if (sendMessageMutation.isLoading) {
        return <Loading/>
    }
    if (sendMessageMutation.isError) {
        return <Alert open={openAlert} color="red" onClose={handleAlertOpen}>{sendMessageMutation.error.message}</Alert>
    }
    if(sendMessageMutation.isSuccess){
        // refetch();
    }

    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Message / Send to number</DialogHeader>
                <DialogBody divider>
                    <Card className="mt-6 w-full shadow-none">
                        <div className="px-6">
                            <div className="w-full space-y-4">
                                <form>
                                    <label htmlFor="default-search"
                                           className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <MagnifyingGlassIcon className={"h-5 w-5 "}/>
                                        </div>
                                        <input type="search"
                                               className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               name={"numbers"}
                                               placeholder="Search contact by names, number..." required
                                               onChange={handleChange}
                                        />
                                    </div>
                                </form>

                            </div>

                        </div>
                        <CardBody className="space-y-4">
                            <div className="w-full">
                                <Textarea label="Message" name={"message"} className="w-full" onChange={handleChange}/>
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

            {isLoading ? <Loading/> :
                error ?
                    <div className="flex items-center justify-between">
                        <Alert color="red">{error.message}</Alert>
                    </div> :
                    <div className="flex flex-col p-4 space-y-3">
                        <header className="self-center">Messages</header>
                        <Card className="h-fit w-full rounded-none relative overflow-x-auto">
                            <table className="w-full table-auto text-left">
                                <thead>
                                <tr>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        Name
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        Message Content
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        Target
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        Email
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        Date Time
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        Group
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {messages?.map((item, index) => {
                                        const isLast = index === messages.length - 1;
                                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                        return (
                                            <tr key={index} className="cursor-pointer"
                                                onClick={() => router.push(pathname + '/single?' + createQueryString("id", item._id))}>
                                                <td className={`${classes} capitalize`}>
                                                    {item.name}
                                                </td>
                                                <td className={classes}>
                                                    {item.messageBody}
                                                </td>
                                                <td className={classes}>
                                                    {item.target}
                                                </td>
                                                <td className={classes}>
                                                    {item.email}
                                                </td>
                                                <td className={classes}>
                                                    {moment(item.createdAt).format("YYYY-MM-DD HH:mm A")}
                                                </td>
                                                <td className={classes}>
                                                    {moment(item.updatedAt).format("YYYY-MM-DD")}
                                                </td>
                                            </tr>)
                                    }
                                )}
                                </tbody>
                            </table>
                        </Card>
                        <div className="flex items-center justify-between w-full overflow-x-scroll">
                            <DefaultPagination className="mt-4"/>
                            <SpeedDial>
                                <SpeedDialHandler onClick={handleOpen}>
                                    <IconButton size="lg" className="rounded-full">
                                        <ChatBubbleBottomCenterTextIcon
                                            className="h-5 w-5 transition-transform group-hover:rotate-45"/>
                                    </IconButton>
                                </SpeedDialHandler>
                            </SpeedDial>
                        </div>
                    </div>}
        </>
    )
}