"use client";
import React from "react";
import {
    Alert,
    Button,
    Typography
} from "../../utils/material_tailwind";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

export const ConfirmModal = (props) => {
    return (
        <div className="p-4">
            <Alert
                variant="outlined"
                className="max-w-screen-md"
                // icon={<QuestionMarkCircleIcon className="h-5" />}
                color={props.color}
                open={props.open}
                onClose={props.handleOpen}
                animate={{
                    mount: { y: 0 },
                    unmount: { y: 100 },
                }}
            >
                <Typography variant="h5">
                    Confirm
                </Typography>
                <Typography className="mt-2 font-normal">
                    {props.message}
                </Typography>
                {props.showButtons && <div className="space-x-4 p-2">
                    <Button size="sm" variant="outlined" onClick={props.handleCancel} className="rounded-md normal-case">No</Button>
                    <Button size="sm" color={props.color} onClick={props.handleOk} className="rounded-md normal-case">Yes</Button>
                </div>}
            </Alert>
        </div>
    );
}