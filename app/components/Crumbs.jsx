import {Breadcrumbs} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import Link from "next/link";
import {HomeIcon} from "@heroicons/react/20/solid";

export function BreadcrumbsDefault(props) {
    const [links, setLinks] = useState([])

    useEffect(() => {
        setLinks(props.pathname.split('/'))
    }, []);
    return (
        <Breadcrumbs className="font-bold text-2xl py-4 bg-transparent" separator="/" fullWidth={true}>
            <Link href="/" className="opacity-60">

            </Link>
            {links.map((item, index) =>
                <Link href={`${item === "" ? "/" : item}`} className="opacity-60 cursor-pointer" key={index}>
                    {item === "" ?
                        <HomeIcon className={"h-5 w-5 "} /> : <span className={"capitalize"}>{item}</span>
                    }
                </Link>)}
        </Breadcrumbs>
    );
}