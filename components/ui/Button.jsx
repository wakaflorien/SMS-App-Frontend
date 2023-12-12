"use client"
import {Button} from "@material-tailwind/react"

export const Buttons = (props) => {
    return (
        <Button variant={props.variant} color={props.color}>
            {props.name}
        </Button>
    )
}