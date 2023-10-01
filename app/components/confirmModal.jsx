"use client";
import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "../../utils/material_tailwind";

export const ConfirmModal = (props) => {
    return (
        <>
            <Dialog open={props.open} handler={props.handleOpen}>
                <DialogHeader>{props.title}</DialogHeader>
                <DialogBody divider>
                    {props.modalContent}
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={props.handleOpen}
                        className="mr-1"
                    >
                        <span>{props.cancelText}</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={props.handleOpen}>
                        <span>{props.okText}</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}