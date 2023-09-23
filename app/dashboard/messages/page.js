"use client";
import {
    Card, Typography, IconButton,
    SpeedDial,
    SpeedDialHandler,
} from "../../../utils/material_tailwind";
import {
    ChatBubbleBottomCenterTextIcon
} from "@heroicons/react/24/outline";
import { DefaultPagination } from "@/app/components/pagination";
import { ConfirmModal } from "@/app/components/confirmModal";
import { useState } from "react";
import { TABLE_HEAD, TABLE_ROWS } from "@/app/components/tablecolumns";


export default function Messages(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <>
            <ConfirmModal open={open} handleOpen={handleOpen} />
            <div className="flex flex-col  p-4 space-y-11">
                <header className="self-center">Messages</header>
                <Card className="h-fit w-full rounded-none">
                    <table className="w- min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {TABLE_ROWS.map(({ to,
                                subject,
                                content,
                                status,
                                date,
                                group }, index) => {
                                const isLast = index === TABLE_ROWS.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={to}>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {to}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {subject}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {content}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {status}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {date}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {group}
                                            </Typography>
                                        </td>

                                        <td className={classes}>
                                            <Typography
                                                as="a"
                                                href="#"
                                                variant="small"
                                                color="blue-gray"
                                                className="font-medium"
                                            >
                                                Edit
                                            </Typography>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Card>
                <DefaultPagination className="mt-4" />
                <div className="flex items-center justify-end">
                    {/* <div className="absolute bottom-0 right-0"> */}
                    <SpeedDial>
                        <SpeedDialHandler onClick={handleOpen}>
                            <IconButton size="lg" className="rounded-full">
                                <ChatBubbleBottomCenterTextIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                            </IconButton>
                        </SpeedDialHandler>
                        {/* <SpeedDialContent>
                        <SpeedDialAction>
                            <HomeIcon className="h-5 w-5" />
                        </SpeedDialAction>
                    </SpeedDialContent> */}
                    </SpeedDial>
                    {/* </div> */}
                </div>
            </div>
        </>
    )
}