"use client";
import { Button, Card, CardBody, CardFooter, Typography, Textarea } from "@/utils/material_tailwind"
import { useRouter } from "next/navigation"

export default function ViewMessage() {
    const router = useRouter()
    return (
        <div className="flex flex-col  p-4 space-y-11 cursor-pointer">
            <Button variant="outlined" className="w-fit normal-case" onClick={() => router.back()}>Back To List</Button>
            <Card className="mt-6 w-full">
                <CardBody className="space-y-4">
                    <Typography variant="lead" color="blue-gray" className="flex justify-between">
                        Contact: +34 123 456 789
                        <Button variant="outlined" size="small" className="normal-case w-24">
                            Edit
                        </Button>
                    </Typography>
                    <Typography className="flex justify-between">
                        Is group message? True
                        <Button variant="outlined" color="red" size="small" className="normal-case w-24">
                            Delete
                        </Button>
                    </Typography>
                    <Typography variant="p" color="blue-gray" className="w-1/2">
                        The place is close to Barceloneta Beach and bus stop just 2 min by
                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                        night life in Barcelona.The place is close to Barceloneta Beach and bus stop just 2 min by
                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                        night life in Barcelona.
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <Typography variant="small" color="blue-gray">
                        02/10/2022 at 10:00, By John
                    </Typography>
                </CardFooter>
            </Card>
        </div>
    )
}