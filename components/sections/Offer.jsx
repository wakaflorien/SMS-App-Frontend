"use client";
import Link from "next/link";
import {Wrapper} from "../layout/Wrapper";
import {CodeBracketIcon} from "@heroicons/react/24/solid";
import {Cog6ToothIcon} from "@heroicons/react/24/outline"
import {Button} from "@material-tailwind/react";
import { useRouter } from "next/navigation";

const offerCartds = [
  {
    icon: CodeBracketIcon,
    title: "Bulk SMS",
    description: `
      Use our bulk SMS services to communicate to multiple contacts using our secure, easy and effective interactive SMS portal. When it comes to connecting directly to individual clients, Bulk SMS is an effective and powerful tool.
      SMS messages are read by 98% of recipients whereas average open rate of emails is a mere 20%. No smartphone, no internet, no problem. SMS can be sent to any feature phone over the most adverse network conditions.
    `,
    link: "#offers",
    default: false,
  },
  //   {
  //     icon: CodeBracketIcon, title: "Short Codes", description: `
  //       These are memorable 5 digit numbers used in print and broadcast advertising.
  //     `, link: "#offers", default: true,
  // },
  {
    icon: Cog6ToothIcon,
    title: "API Intergration",
    description: `
        API stands for Application Programming Interface. An API allows you to interact with a software program that is in the cloud. You type in commands using a user interface, usually a web page, the commands are received and then information is sent back to you.
        API integration is a way for two or more API’s (or applications) to interact without the need for any human intervention. 
    `,
    link: "#offers",
    default: false,
  },
  {
    description: `
     In there simple steps you can find out why over 35,000 customers choose SMSPortal as their builk SMS provider.
    `,
    link: "#offers",
    default: true,
    withButton: true,
  },
];

export function Offer() {
  const router = useRouter()
  return (
    <Wrapper className={"my-9"} id="offers">
      <div className="w-full">
        <h1 className="text-[#475569] text-4xl font-bold opacity-80 text-center my-9">
          What We Offer
        </h1>
      </div>
      <div className="grid xl:grid-cols-3 min-w-full gap-16">
        {offerCartds.map((offer, index) => (
          <div
            key={`index-${index}`}
            className={`flex flex-col border border-[#47556956] p-8 text-[#475569] gap-4 ${ offer.default && " bg-blue-500" } `}
          >
            {offer.icon && <offer.icon className="h-9 w-9 text-[#4755699f]" />}
            {offer.title && (
              <h1 className="text-lg xl:text-2xl font-bold opacity-80">
                {offer.title}
              </h1>
            )}
            <p className={`text-[#4755699f] flex-grow text-md xl:text-lg ${ offer.default && "text-white"}`}>
              {offer.description}
            </p>

            {offer.withButton ? (
              <Button
                className={`rounded-none py-3 px-8 w-full`}
                variant="outlined"
                size={"lg"}
                color="white"
                onClick={() => router.push("/#contact")}
              >
                Learn more
              </Button>
            ) : (
              <Link className="font-bold opacity-80" href={"#"}>
                {/*Learn more*/}
              </Link>
            )}
          </div>
        ))}
      </div>
    </Wrapper>
  );
}
