"use client";
import {useEffect, useState} from "react";
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
    Navbar,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon, ShoppingBagIcon, UserCircleIcon, ClockIcon, UserGroupIcon, Cog6ToothIcon
} from "@heroicons/react/24/solid";
import {
    ChevronRightIcon, ChevronDownIcon, Bars3Icon, LifebuoyIcon, PowerIcon, XMarkIcon,
} from "@heroicons/react/24/outline";
import {usePathname, useRouter} from "next/navigation";
import classnames from "classnames";
import {BellIcon, ChatBubbleLeftRightIcon, UsersIcon} from "@heroicons/react/20/solid";
import Link from "next/link";
import {Collapse} from "@material-tailwind/react";
import Image from "next/image";

export default function DashbaordLayout({children}) {
    const [open, setOpen] = useState(0);
    const [openNav, setOpenNav] = useState(false)
    const [showSideNav, setShowSideNav] = useState(true)
    const [showSidebar, setShowSidebar] = useState(true);

    const router = useRouter();
    const pathname = usePathname()

    useEffect(() => {
        if (pathname === "/dashboard/profile") {
            setShowSideNav(false)
        } else {
            setShowSideNav(true)
        }
    }, [pathname]);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const messageMenu = [
        {
        id: 1, label: "All messages", link: "/dashboard/messages",
    }, {
        id: 2, label: "Send New Message", link: "/dashboard/messages",
    },

        {
            id: 3, label: "Send To group", link: "/dashboard/messages/sendtogroup",
        }, {
            id: 4, label: "Send From Csv", link: "/dashboard/messages/sendfromcsv",
        },];
    const contactsMenu = [{
        id: 1, label: "All contacts", icon: <ClockIcon className="h-5 w-5"/>, link: "/dashboard/contacts",
    }, {
        id: 2, label: "Add New Contact", icon: <ClockIcon className="h-5 w-5"/>, link: "/dashboard/contacts",
    },
        {
            id: 3,
            label: "Add From Csv",
            icon: <PresentationChartBarIcon className="h-5 w-5"/>,
            link: "/dashboard/contacts/addfromcsv",
        },
    ];

    const groupsMenu = [{
        id: 1, label: "All groups", link: "/dashboard/groups",
    }, {
        id: 2, label: "Create Group", link: "/dashboard/groups",
    },];

    const sideNav = [{
        id: 1,
        label: "Messages",
        icon: <ChatBubbleLeftRightIcon className="h-5 w-5"/>,
        href: "/dashboard/messages",
        suffix: (<Chip
            value="14"
            size="sm"
            variant="ghost"
            className="rounded-full text-secondary"
        />),
    },

        {
            id: 2, label: "Contacts", icon: <UsersIcon className="h-5 w-5"/>, href: "/dashboard/contacts",
        }, {
            id: 3, label: "Groups", icon: <UserGroupIcon className="h-5 w-5"/>, href: "/dashboard/groups",
        },];
    const handleRoute = (value) => {
        console.log("value", value);
        router.push(value);
    };
    const profileMenu = [{
        label: "My Profile", link: "/dashboard/profile", icon: <UserCircleIcon className={"h5- w-5"}/>,
    }, {
        label: "Settings", link: "/dashboard/#", icon: <Cog6ToothIcon className={" h-5 w-5"}/>,
    }, {
        label: "Help", link: "/dashboard/#", icon: <LifebuoyIcon className={"h-5 w-5"}/>,
    }, {
        label: "Logout", link: "/", icon: <PowerIcon className={" h-5 w-5"}/>,
    },

    ]

    return (
        <div className="flex relative w-full">
            {showSideNav ? <Card
                className={classnames("h-inherit w-full p-4 border-r shadow-xl shadow-blue-gray-900/5 bg-primary text-secondary " + `rounded-none hidden ${showSideNav ? "lg:block" : "lg:hidden"}`, {"max-w-[20rem]": showSidebar}, {"max-w-[7rem]": !showSidebar},)}
            >
                <div className="mb-2 flex items-center justify-between p-4">
                    {showSidebar && (<Image src={"/images/logo.png"} alt={"Logo"} width={200} height={200}/>)}
                    <Bars3Icon
                        strokeWidth={2.5}
                        className={`h-4 w-4 transition-transform cursor-pointer`}
                        onClick={() => {
                            setShowSidebar(!showSidebar);
                        }}
                    />
                </div>
                <List className="min-w-full h-screen flex justify-between text-secondary hover:bg-none ">
                    <div className="py-8">
                        <ListItem onClick={() => handleRoute("/dashboard")} ripple={false} className="hover:bg-none">
                            <ListItemPrefix className="cursor-pointer">
                                <PresentationChartBarIcon className="h-5 w-5"/>
                            </ListItemPrefix>
                            {showSidebar && "Dashboard"}
                        </ListItem>
                        {sideNav.map((item, index) => (<Accordion
                            key={index}
                            open={open === item.id}
                            icon={<ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mx-auto h-4 w-4 transition-transform text-secondary ${open === 1 ? "rotate-180" : ""}`}
                            />}
                        >
                            <ListItem className="p-0 flex items-center justify-center" selected={open === 1}>
                                {showSidebar ? <AccordionHeader
                                    onClick={() => handleOpen(item.id)}
                                    className="border-b-0 p-3"
                                >
                                    {item.icon !== "" ?
                                        <ListItemPrefix className="text-secondary">{item.icon}</ListItemPrefix> : ""}
                                    <Typography
                                        className="mr-auto font-normal text-secondary"
                                    >
                                        {item.label}
                                    </Typography>
                                    <ListItemSuffix className="text-secondary">{item?.suffix}</ListItemSuffix>
                                </AccordionHeader> : <div className="p-3 bg-none text-secondary">
                                    <ListItemPrefix className="">{item.icon}</ListItemPrefix>
                                </div>}
                            </ListItem>
                            {showSidebar && <AccordionBody className="py-1">
                                <List className="p-0 text-secondary">
                                    {item.label === "Messages" && messageMenu?.map((subItem, subIndex) => (<ListItem
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
                                    </ListItem>))}
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
                                        </ListItem>))}
                                    {item.label === "Groups" && groupsMenu?.map((subItem, subIndex) => (<ListItem
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
                                    </ListItem>))}
                                </List>
                            </AccordionBody>}
                        </Accordion>))}
                    </div>
                </List>
            </Card> : ""}
            <main className="h-screen w-full bg-secondary">
                <Navbar
                    className="w-full py-2 lg:py-4 px-4 lg:shadow-none lg:bg-transparent lg:border-none lg:rounded-none">
                    <div className="flex flex-col text-primary lg:items-end">
                        <div className={"flex items-center justify-between"}>
                            <IconButton
                                variant="text"
                                className={"block lg:hidden"}
                                ripple={false}
                                onClick={() => setOpenNav(!openNav)}
                            >
                                {openNav ? <XMarkIcon className={"h-5 w-5"}/> : <Bars3Icon className={"h-5 w-5"}/>}
                            </IconButton>
                            <div className={"h-full"}>
                                <Menu>
                                    <MenuHandler>
                                        <IconButton variant="text" className="rounded-full">
                                            <BellIcon className={"h-5 w-5"}/>
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
                                                    sent you a message
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
                                        {profileMenu.map((item, index) => <Link key={index} href={item.link}>
                                            <MenuItem className="flex items-center gap-2">
                                                {item.icon}
                                                <Typography variant="small" className="font-normal">
                                                    {item.label}
                                                </Typography>
                                            </MenuItem>
                                        </Link>)}
                                    </MenuList>
                                </Menu>
                            </div>
                        </div>
                        <div>
                            <Collapse open={openNav} className={"block lg:hidden"}>
                                <div className="container">
                                    <List className="min-w-full h-fit flex justify-between text-primary hover:bg-none ">
                                        <div className="py-8">
                                            <ListItem onClick={() => handleRoute("/dashboard")} ripple={false}
                                                      className="hover:bg-none">
                                                <ListItemPrefix className="cursor-pointer">
                                                    <PresentationChartBarIcon className="h-5 w-5"/>
                                                </ListItemPrefix>
                                                {showSidebar && "Dashboard"}
                                            </ListItem>
                                            {sideNav.map((item, index) => (
                                                <ListItem key={index} onClick={() => handleRoute(item.href)}
                                                          ripple={false} className="hover:bg-none">
                                                    <ListItemPrefix className="cursor-pointer">
                                                        {item.icon}
                                                    </ListItemPrefix>
                                                    <Typography variant={"lead"}>{item.label}</Typography>
                                                </ListItem>
                                            ))}
                                        </div>
                                    </List>
                                </div>
                            </Collapse>
                        </div>
                    </div>
                </Navbar>
                {children}
            </main>
        </div>);
}
