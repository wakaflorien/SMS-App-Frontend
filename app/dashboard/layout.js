"use client";
import { useState } from "react";
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
    IconButton
} from "@/utils/material_tailwind";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    ClockIcon,
} from "@heroicons/react/24/solid";
import {
    ChevronRightIcon,
    ChevronDownIcon,
    Bars3Icon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function DashbaordLayout({ children }) {
    const [open, setOpen] = useState(0);
    const router = useRouter()

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const sideNav = [
        {
            label: "Dashboard",
            icon: <PresentationChartBarIcon />,
            href: "/dashboard",
            sub: [],
        },
        {
            label: "Inbox",
            icon: <InboxIcon className="h-5 w-5" />,
            href: "/dashboard/messages",
            sub: < Chip
                value="14"
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full"
            />,
        },

        {
            label: "Messages",
            icon: <UserCircleIcon className="h-5 w-5" />,
            href: "/dashboard/messages",
            sub: [],
        }, {
            label: "Settings",
            icon: <Cog6ToothIcon className="h-5 w-5" />,
            href: "/dashboard/messages",
            sub: [],
        },
        {
            label: "Logout",
            icon: <PowerIcon className="h-5 w-5" />,
            href: "/dashboard/awards",
        }
    ];
    const handleRoute = (value) => {
        router.push(value)
    }

    return (
        <div className="flex">
            <Card className="h-screen w-full max-w-[20rem] p-4 border-r shadow-xl shadow-blue-gray-900/5 rounded-none">
                <div className="mb-2 flex items-center justify-between p-4">
                    <img src="/img/logo-ct-dark.png" alt="Logo" className="h-8 w-8" />
                    <Typography variant="h5" color="blue-gray">
                        SMS Dashboard
                    </Typography>
                    <Bars3Icon
                        strokeWidth={2.5}
                        className={`h-4 w-4 transition-transform`}
                    />
                </div>
                <List>
                    <Accordion
                        className=""
                        open={open === 1}
                        icon={
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""
                                    }`}
                            />
                        }
                    >
                        <ListItem className="p-0" selected={open === 1}>
                            <AccordionHeader
                                onClick={() => handleOpen(1)}
                                className="border-b-0 p-3 hover:bg-primary"
                            >
                                <ListItemPrefix>
                                    <PresentationChartBarIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="mr-auto font-normal">
                                    Dashboard
                                </Typography>
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Analytics
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Reporting
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Projects
                                </ListItem>
                            </List>
                        </AccordionBody>
                    </Accordion>
                    <Accordion
                        open={open === 2}
                        icon={
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""
                                    }`}
                            />
                        }
                    >
                        <ListItem className="p-0" selected={open === 2}>
                            <AccordionHeader
                                onClick={() => handleOpen(2)}
                                className="border-b-0 p-3"
                            >
                                <ListItemPrefix>
                                    <ShoppingBagIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="mr-auto font-normal">
                                    E-Commerce
                                </Typography>
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Orders
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Products
                                </ListItem>
                            </List>
                        </AccordionBody>
                    </Accordion>
                    <hr className="my-2 border-blue-gray-50" />
                    <>
                        {sideNav.map((item, index) => (
                            <ListItem key={index} className="cursor-pointer" onClick={() => handleRoute(item.href)}>
                                <ListItemPrefix>
                                    {item.icon}
                                </ListItemPrefix>
                                {item.label}
                                <ListItemSuffix>
                                    {item.sub}
                                </ListItemSuffix>
                            </ListItem>
                        ))}
                    </>
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
                                    <Typography variant="small" color="gray" className="font-normal">
                                        <span className="font-medium text-blue-gray-900">Tania</span> send
                                        you a message
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        className="flex items-center gap-1 text-xs text-gray-600"
                                    >

                                        13 minutes ago
                                    </Typography>
                                </div>
                            </MenuItem>
                            <MenuItem className="flex items-center gap-4 py-2 pr-8 pl-2">
                                <Avatar
                                    variant="circular"
                                    alt="natali craig"
                                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                                />
                                <div className="flex flex-col gap-1">
                                    <Typography variant="small" color="gray" className="font-normal">
                                        <span className="font-medium text-blue-gray-900">Natali</span>{" "}
                                        reply to your email
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        className="flex items-center gap-1 text-xs text-gray-600"
                                    >
                                        a hour ago
                                    </Typography>
                                </div>
                            </MenuItem>
                            <MenuItem className="flex items-center gap-4 py-2 pr-8 pl-2">
                                <Avatar
                                    variant="circular"
                                    alt="paypal"
                                    src="https://dwglogo.com/wp-content/uploads/2016/08/PayPal_Logo_Icon.png"
                                />
                                <div className="flex flex-col gap-1">
                                    <Typography variant="small" color="gray" className="font-normal">
                                        <span className="font-medium text-blue-gray-900">PayPal</span>{" "}
                                        you&apos;ve received a payment.
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        className="flex items-center gap-1 text-xs text-gray-600"
                                    >
                                        5 hours ago
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
                                        d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
                                    />
                                </svg>
                                <Typography variant="small" className="font-normal">
                                    Inbox
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
                            <hr className="my-2 border-blue-gray-50" />
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
    );
}


