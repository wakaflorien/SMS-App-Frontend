import {
    Card, Typography,
    CardBody,
    Textarea,
    Input,
    Button,
} from "../../../utils/material_tailwind";

export const ContactModalContent = () => (
    <Card className="w-full shadow-none">
        <CardBody className="space-y-4">
            <Typography color="gray" className="mt-1 font-normal">
                Enter your details to create a new contact.
            </Typography>
            <div className="mb-4 flex flex-col gap-6">
                <Input size="lg" label="Name" />
                <Input size="lg" label="Email" />
                <Input type="phone" size="lg" label="Phone" />
            </div>
            <div className="w-full">
                <Textarea label="Description" className="w-full" />
            </div>
        </CardBody>
    </Card>

)

export const GroupsModalContent = () => (
    <Card className="w-full shadow-none">
        <CardBody className="space-y-4">
            <Typography color="gray" className="mt-1 font-normal">
                Enter your details to create a new Group.
            </Typography>
            <div className="mb-4 flex flex-col gap-6">
                <Input size="lg" label="Group Name" />
            </div>
            <div className="w-full">
                <Textarea label="Description" className="w-full" />
            </div>
        </CardBody>
    </Card>

)

export const MessageModalContent = () => (
    <Card className="mt-6 w-full shadow-none">
        <div className="px-6">
            <div className="w-full">
                <form>
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search contact by names, number..." required />
                    </div>
                </form>

            </div>
            <Typography
                variant="small"
                color="gray"
                className="mt-2 flex items-center gap-1 font-normal"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-px h-4 w-4"
                >
                    <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                    />
                </svg>
                Search using names, phone number or email.
            </Typography>
        </div>
        <CardBody className="space-y-4">
            <div className="w-full">
                <Textarea label="Message" className="w-full" />
            </div>
        </CardBody>
    </Card>

)