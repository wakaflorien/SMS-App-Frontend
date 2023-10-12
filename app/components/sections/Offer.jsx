"use client";
import Link from "next/link";
import { Wrapper } from "../layout/Wrapper";
import { CodeBracketIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";

const offerCartds = [
  {
    icon: CodeBracketIcon,
    title: "Bulk SMS",
    description: `
      Use Bulk SMSes to communications to multiple contact using our sefa and easy to use interactive SMS.
    `,
    link: "#",
    default: true,
  },
  {
    icon: CodeBracketIcon,
    title: "Short Codes",
    description: `
      These are memorable 5 digit numbers used in print and broadcast advertising.
    `,
    link: "#",
    default: true,
  },
  {
    icon: Cog6ToothIcon,
    title: "API Intergration",
    description: `
     An application programming interface (API) allows users to SMS-enable application websites or systems.
    `,
    link: "#",
    default: true,
  },
  {
    description: `
     In there simple steps you can find out why over 35,000 customers choose SMSPortal as their builk SMS provider.
    `,
    link: "#",
    default: true,
    withButton: true,
  },
];

export function Offer() {
  return (
    <Wrapper className={"my-9"}>
      <div className="w-full">
        <h1 className="text-[#475569] text-4xl font-bold opacity-80 text-center my-9">
          What We Offer
        </h1>
      </div>
      <div className="grid grid-cols-4 min-w-full gap-16">
        {offerCartds.map((offer, index) => (
          <div
            key={`index-${index}`}
            className="flex flex-col border border-[#47556956] p-8 text-[#475569] gap-4"
          >
            {offer.icon && <offer.icon className="h-9 w-9 text-[#4755699f]" />}
            {offer.title && (
              <h1 className="text-2xl font-bold opacity-80">{offer.title}</h1>
            )}
            <p className="text-[#4755699f] flex-grow">{offer.description}</p>

            {offer.withButton ? (
              <Button
                className="rounded-none py-3 px-8 w-full"
                variant="outlined"
                color="#475569"
              >
                Learn more
              </Button>
            ) : (
              <Link className="font-bold opacity-80" href={"#"}>
                Learn more
              </Link>
            )}
          </div>
        ))}
      </div>
    </Wrapper>
  );
}
