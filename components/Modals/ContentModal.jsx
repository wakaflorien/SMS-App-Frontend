"use client";
import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "../../utils/material_tailwind";

export const ContentModal = (props) => {
    return (
        <>
            <Dialog open={props.open} handler={props.handleOpen}>
                <DialogHeader>{props.title}</DialogHeader>
                <DialogBody divider>
                    {props.modalContent}
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="outlined"
                        onClick={props.handleOpen}
                        className="mr-1 normal-case"
                    >
                        <span>{props.cancelText}</span>
                    </Button>
                    <Button variant="gradient" color="blue" onClick={props.handleSubmit} className="normal-case">
                        <span>{props.okText}</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}