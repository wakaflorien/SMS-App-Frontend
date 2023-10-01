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
                        Contact: Ojomo Keyune
                        <Button variant="outlined" size="small" className="normal-case w-24">
                            Edit
                        </Button>
                    </Typography>
                    <Typography className="flex justify-between">
                        Tel: +34 123 456 789
                        <Button variant="outlined" color="red" size="small" className="normal-case w-24">
                            Delete
                        </Button>
                    </Typography>
                    <Typography variant="lead" color="blue-gray" className="w-1/2">
                        Groups
                    </Typography>
                    <div className="flex justify-between">
                        <Typography variant="small" color="blue-gray">
                            Group 1
                        </Typography>
                        <Typography variant="small" color="blue-gray">
                            02/10/2022 at 10:00, By Peter
                        </Typography>
                        <Typography variant="small" color="blue-gray">
                            02/10/2022 at 10:00, By John
                        </Typography>
                    </div>
                    <div className="flex justify-between">
                        <Typography variant="small" color="blue-gray">
                            Group 2
                        </Typography>
                        <Typography variant="small" color="blue-gray">
                            02/10/2022 at 10:00, By John
                        </Typography>
                        <Typography variant="small" color="blue-gray">
                            02/10/2022 at 10:00, By Peter
                        </Typography>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}