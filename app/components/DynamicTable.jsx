import { useRouter, usePathname } from "next/navigation";
import { Card, CardBody, Input, Textarea } from "../../utils/material_tailwind";
import { useState } from "react";
import { ContentModal } from "./contentModal";

export const DynamicTable = (props) => {
    const [open, setOpen] = useState(false);

    const router = useRouter()
    const pathname = usePathname()

    const handleOpen = () => setOpen(!open);

    const modalContent = (

        <Card className="mt-6 w-full shadow-none ">
            <div className="px-6">
                <div className="w-full space-y-4">
                    <Input label="Contact number" className="w-full" />
                    <Input label="Subject" className="w-full" />
                </div>
            </div>
            <CardBody className="space-y-4">
                <div className="w-full">
                    <Textarea label="Message" className="w-full" />
                </div>
            </CardBody>
        </Card>

    )

    return (
        <>
            <ContentModal
                title="Edit Contact"
                open={open}
                handleOpen={handleOpen}
                okText="Confirm" cancelText="Cancel"
                modalContent={modalContent}
            />
            <table className="w- min-w-max table-auto text-left">
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
                                (<td className={classes} key={indexB} onClick={() => itemB === "Edit" ? handleOpen() : router.push(`${pathname}/{${index}`)}>
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