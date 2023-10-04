import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export const DynamicTable = (props) => {
    const router = useRouter()
    const pathname = usePathname()

    return (
        <>
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {props.columns.map((head) => (
                            <th
                                key={head}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                                {head}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((item, index) => {
                        const isLast = index === props.data.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                        return (
                            <tr key={index} className="cursor-pointer">
                                {Object.values(item).map((itemB, indexB) =>
                                (<td className={classes} key={indexB} onClick={() => router.push(`${pathname}/{${index}`)}>
                                    {itemB}
                                </td>)
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table >
        </>
    )
}