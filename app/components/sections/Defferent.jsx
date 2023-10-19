"use client";
import Link from "next/link";
import {Wrapper} from "../layout/Wrapper";
import {Button} from "@material-tailwind/react";
import {LockClosedIcon, UserIcon} from "@heroicons/react/24/outline";
import {BookOpenIcon} from "@heroicons/react/24/solid";

const cardsData = [
    {
        icon: BookOpenIcon, title: "Timely", description: `
      We utilise proven and advanced messaging infrastructure to provide reliable, 
      highly available and instantaneous delivery of SMS messages across all Malawian mobile networks.
       Using InfoText Bulk SMS your institution will be able to reach its clients more instantly and reliably.

    `, link: "#", default: true,
    },
    {
        icon: LockClosedIcon, title: "Cost Effective", description: `
      We consider our all our client’s as partners. 
      Therefore, using InfoText does not only enhance the marketability of our partner’s brand, it also inevitably increases its revenue. 
      Research has shown that clients are willing to pay premium prices to receive important information in a timely and effective manner. Information is a valuable resource and the right information received in the right time can save clients’ money and unnecessary worry. 
    `, link: "#", default: true,
    },
    {
        icon: UserIcon, title: "User Friendly", description: `
     Our state of the art bulk SMS portal is designed by the user. Using your feedback and input from qualified user experience experts, we were able to make our portal a user friendly paradise. Our user guide outlines it simply, just upload your data file and click to send. That’s it. 
    `, link: "#", default: true,
    },
    {
        icon: UserIcon, title: "Secure and Robust", description: `
     Our system has over 3 redundancy lines and 2 active international servers processing transactions to ensure that your SMS’s are always delivered in a secure and effective manner. Our robust, high-performance service has zero risk and zero downtime.  
    `, link: "#", default: true,
    },

];

export function Different() {
    return (<Wrapper className={"my-9"}>
        <div className="w-full" id={"different"}>
            <h1 className="text-[#475569] text-4xl font-bold opacity-80 text-center my-9">
                What makes us defferent?
            </h1>
        </div>
        <div className="grid grid-cols-3 min-w-full gap-8">
            {cardsData.map((data, index) => (<div
                key={`index-${index}`}
                className="flex flex-col border border-[#47556956] p-8 text-[#475569] gap-4"
            >
                {data.icon && <data.icon className="h-9 w-9 text-[#4755699f]"/>}
                {data.title && (<h1 className="text-2xl font-bold opacity-80">{data.title}</h1>)}
                <p className="text-[#4755699f] flex-grow">{data.description}</p>

                {data.withButton ? (<Button
                    className="rounded-none py-3 px-8 w-full"
                    variant="outlined"
                    size={"lg"}
                >
                    Learn more
                </Button>) : (<Link className="font-bold opacity-80" href={"#"}>
                    {/*Learn more*/}
                </Link>)}
            </div>))}
        </div>
    </Wrapper>);
}
