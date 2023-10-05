"use client";
import {useState} from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
    Avatar,
    IconButton,
} from "@/utils/material_tailwind";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    ClockIcon,
    UserGroupIcon
} from "@heroicons/react/24/solid";
import {
    ChevronRightIcon,
    ChevronDownIcon,
    Bars3Icon,
} from "@heroicons/react/24/outline";
import {useRouter} from "next/navigation";
import classnames from "classnames";
import {ChatBubbleLeftRightIcon, UsersIcon} from "@heroicons/react/20/solid";

export default function DashbaordLayout({children}) {
    const [open, setOpen] = useState(0);
    const router = useRouter();

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const messageMenu = [
        {
            id: 1,
            label: "All messages",
            link: "/dashboard/messages",
        },
        {
            id: 2,
            label: "Send New Message",
            link: "/dashboard/messages",
        },

        {
            id: 3,
            label: "Send To group",
            link: "/dashboard/messages/sendtogroup",
        },
        {
            id: 4,
            label: "Send From Csv",
            link: "/dashboard/messages/sendfromcsv",
        },
    ];
    const contactsMenu = [
        {
            id: 1,
            label: "All contacts",
            icon: <ClockIcon className="h-5 w-5"/>,
            link: "/dashboard/contacts",
        },
        {
            id: 2,
            label: "Add New Contact",
            icon: <ClockIcon className="h-5 w-5"/>,
            link: "/dashboard/contacts",
        },
        {
            id: 3,
            label: "Add From Csv",
            icon: <PresentationChartBarIcon className="h-5 w-5"/>,
            link: "/dashboard/contacts/addfromcsv",
        },
    ];

    const groupsMenu = [
        {
            id: 1,
            label: "All groups",
            link: "/dashboard/groups",
        },
        {
            id: 2,
            label: "Create Group",
            link: "/dashboard/groups",
        },
    ];

    const sideNav = [
        {
            id: 1,
            label: "Messages",
            icon: <ChatBubbleLeftRightIcon className="h-5 w-5"/>,
            href: "/dashboard/messages",
            suffix: (
                <Chip
                    value="14"
                    size="sm"
                    variant="ghost"
                    className="rounded-full text-secondary"
                />
            ),
        },

        {
            id: 2,
            label: "Contacts",
            icon: <UsersIcon className="h-5 w-5"/>,
            href: "/dashboard/contacts",
        },
        {
            id: 3,
            label: "Groups",
            icon: <UserGroupIcon className="h-5 w-5"/>,
            href: "/dashboard/groups",
        },
    ];
    const handleRoute = (value) => {
        console.log("value", value);
        router.push(value);
    };

    const [showSidebar, setShowSidebar] = useState(true);

    return (
        <div className="flex relative w-full">
            <Card
                className={classnames(
                    "h-inherit w-full p-4 border-r shadow-xl shadow-blue-gray-900/5 bg-primary text-secondary " +
                    "rounded-none hidden lg:block",
                    {"max-w-[20rem]": showSidebar},
                    {"max-w-[7rem]": !showSidebar},
                )}
            >
                <div className="mb-2 flex items-center justify-between p-4">
                    {showSidebar && (
                        <img src="/img/logo-ct-dark.png" alt="Logo" className="h-8 w-8"/>
                    )}
                    {showSidebar && (
                        <Typography variant="h5" className="">
                            SMS Dashboard
                        </Typography>
                    )}
                    <Bars3Icon
                        strokeWidth={2.5}
                        className={`h-4 w-4 transition-transform cursor-pointer`}
                        onClick={() => {
                            setShowSidebar(!showSidebar);
                        }}
                    />
                </div>
                <List className="min-w-full h-screen flex justify-between text-secondary hover:bg-none">
                    <div className="py-8">
                        <ListItem onClick={() => handleRoute("/dashboard")} ripple={false} className="hover:bg-none">
                            <ListItemPrefix className="cursor-pointer">
                                <PresentationChartBarIcon className="h-5 w-5"/>
                            </ListItemPrefix>
                            {showSidebar && "Dashboard"}
                        </ListItem>
                        {sideNav.map((item, index) => (
                            <Accordion
                                key={index}
                                open={open === item.id}
                                icon={
                                    <ChevronDownIcon
                                        strokeWidth={2.5}
                                        className={`mx-auto h-4 w-4 transition-transform text-secondary ${
                                            open === 1 ? "rotate-180" : ""
                                        }`}
                                    />
                                }
                            >
                                <ListItem className="p-0 flex items-center justify-center" selected={open === 1}>
                                    {showSidebar ? <AccordionHeader
                                        onClick={() => handleOpen(item.id)}
                                        className="border-b-0 p-3"
                                    >
                                        <ListItemPrefix className="text-secondary">{item.icon}</ListItemPrefix>
                                        <Typography
                                            className="mr-auto font-normal text-secondary"
                                        >
                                            {item.label}
                                        </Typography>
                                        <ListItemSuffix className="text-secondary">{item.suffix}</ListItemSuffix>
                                    </AccordionHeader> : <div className="p-3 bg-none text-secondary">
                                        <ListItemPrefix className="">{item.icon}</ListItemPrefix>
                                    </div>
                                    }
                                </ListItem>
                                {showSidebar && <AccordionBody className="py-1">
                                        <List className="p-0 text-secondary">
                                            {item.label === "Messages" && messageMenu?.map((subItem, subIndex) => (
                                                <ListItem
                                                    key={subIndex}
                                                    onClick={() => handleRoute(subItem.link)}
                                                >
                                                    <ListItemPrefix>
                                                        <ChevronRightIcon
                                                            strokeWidth={3}
                                                            className="h-3 w-5"
                                                        />
                                                    </ListItemPrefix>
                                                    {subItem.label}
                                                </ListItem>
                                            ))}
                                            {item.label === "Contacts" && contactsMenu?.map((subItem, subIndex) => (
                                                <ListItem
                                                    key={subIndex}
                                                    onClick={() => handleRoute(subItem.link)}
                                                >
                                                    <ListItemPrefix>
                                                        <ChevronRightIcon
                                                            strokeWidth={3}
                                                            className="h-3 w-5"
                                                        />
                                                    </ListItemPrefix>
                                                    {subItem.label}
                                                </ListItem>
                                            ))}
                                            {item.label === "Groups" && groupsMenu?.map((subItem, subIndex) => (
                                                <ListItem
                                                    key={subIndex}
                                                    onClick={() => handleRoute(subItem.link)}
                                                >
                                                    <ListItemPrefix>
                                                        <ChevronRightIcon
                                                            strokeWidth={3}
                                                            className="h-3 w-5"
                                                        />
                                                    </ListItemPrefix>
                                                    {subItem.label}
                                                </ListItem>
                                            ))}
                                        </List>
                                    </AccordionBody>
                                }
                            </Accordion>
                        ))}
                    </div>
                </List>
            </Card>
            <main className="h-screen w-full bg-secondary">
                <header className="flex items-center justify-end gap-4 p-8 border-b">
                    <Menu>
                        <MenuHandler>
                            <IconButton variant="text" className="rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </IconButton>
                        </MenuHandler>
                        <MenuList className="flex flex-col gap-2">
                            <MenuItem className="flex items-center gap-4 py-2 pr-8 pl-2">
                                <Avatar
                                    variant="circular"
                                    alt="tania andrew"
                                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                />
                                <div className="flex flex-col gap-1">
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal"
                                    >
                    <span className="font-medium text-blue-gray-900">
                      Tania
                    </span>{" "}
                                        send you a message
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        className="flex items-center gap-1 text-xs text-gray-600"
                                    >
                                        13 minutes ago
                                    </Typography>
                                </div>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuHandler>
                            <Avatar
                                variant="circular"
                                alt="tania andrew"
                                className="cursor-pointer hover:border border-primary"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                            />
                        </MenuHandler>
                        <MenuList>
                            <MenuItem className="flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <Typography variant="small" className="font-normal">
                                    My Profile
                                </Typography>
                            </MenuItem>
                            <MenuItem className="flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <Typography variant="small" className="font-normal">
                                    Edit Profile
                                </Typography>
                            </MenuItem>
                            <MenuItem className="flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288"
                                    />
                                </svg>
                                <Typography variant="small" className="font-normal">
                                    Help
                                </Typography>
                            </MenuItem>
                            <hr className="my-2 border-blue-gray-50"/>
                            <MenuItem className="flex items-center gap-2 ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                                    />
                                </svg>
                                <Typography variant="small" className="font-normal">
                                    Sign Out
                                </Typography>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </header>
                {children}
            </main>
        </div>
    )
        ;
}
