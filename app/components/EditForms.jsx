import { Card, CardBody, Input, Textarea } from "../../utils/material_tailwind";
export const EditContactModalContent = (props) => (

    <Card className="mt-6 w-full shadow-none ">
        <div className="px-6">
            <div className="w-full space-y-4">
                <Input type="text" label="Contact Name" className="w-full" />
                <Input type="telephone" label="Telephone" className="w-full" />
            </div>
        </div>
        <CardBody className="space-y-4">
            <div className="w-full">
                <Textarea label="Description" className="w-full" />
            </div>
        </CardBody>
    </Card>

)

export const EditMessageModalContent = (props) => (

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
export const EditGroupModalContent = (props) => (

    <Card className="mt-6 w-full shadow-none ">
        <div className="px-6">
            <div className="w-full space-y-4">
                <Input type="text" label="Group Name" className="w-full" />
            </div>
        </div>
        <CardBody className="space-y-4">
            <div className="w-full">
                <Textarea label="Description" className="w-full" />
            </div>
        </CardBody>
    </Card>

)