"use client"
import {Button} from "@/utils/material_tailwind"

export const Buttons = (props) => {
    return (
        <Button variant={props.variant} color={props.color}>
            {props.name}
        </Button>
    )
}