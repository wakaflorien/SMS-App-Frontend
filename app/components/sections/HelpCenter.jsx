"use client";

import {Button} from "@material-tailwind/react";
import {Wrapper} from "../layout/Wrapper";

export function HelpCenter() {
    return (
        <Wrapper className="bg-helpcenter bg-cover text-white py-16 grid grid-cols-4 my-9">
            <div className="flex flex-col gap-4">
                <div className="text-red text-4xl w-full font-extrabold"> What is SMSPortal</div>
                <p className="flex-grow">
                    InfoText is a is bulk SMS messaging solution. We utilise proven and advanced messaging
                    infrastructure and provide reliable, highly available and instantaneous delivery of SMS messages
                    across all mobile networks in Malawi.
                </p>
                <p>
                    Equipped with state of the art, simplified API integration and cost effective bulk SMS solutions
                    your institution can easily and more effectively communicate with a wide audience in a targeted
                    manner. Testing our services is fast and simple. Start a chat now and we will easily guide you
                    through the process.
                </p>
                <Button
                    className="rounded-none py-4 px-9 bg-[#4b7fef] text-white mt-20 w-48"
                    color="white"
                    variant="filled"
                    size={"lg"}
                >
                    Help Centre
                </Button>
            </div>
        </Wrapper>
    );
}
