import {Breadcrumbs} from "@/utils/material_tailwind"
import {useEffect, useState} from "react";
import Link from "next/link";
export const BreadCrumbs = (props) => {
    const [breads, setBreads] = useState([])
    useEffect(() => {
        setBreads(props.pathname.split('/'))
    }, []);

    return(
        <Breadcrumbs className="font-bold text-2xl py-4 bg-transparent" separator="/" fullWidth={true}>
            <Link href="/" className="opacity-60 cursor-pointer">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
            </Link>
            {breads.slice(1).map((item, index) =>
                <Link href={"/authentication"} className="opacity-60 cursor-pointer" key={index}>
                <span>{item}</span>
            </Link>)}
        </Breadcrumbs>
    )
}