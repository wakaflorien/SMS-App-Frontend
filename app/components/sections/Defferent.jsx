"use client";
import Link from "next/link";
import { Wrapper } from "../layout/Wrapper";
import { Button } from "@material-tailwind/react";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import { BookOpenIcon } from "@heroicons/react/24/solid";

const cardsData = [
  {
    icon: BookOpenIcon,
    title: "Knowledge and Experiances",
    description: `
      SMSPortal has been in operation since 2003. Over the past 15 years, 
      we have acquired the knowledge and experience and reach to deliver the best SMS services
      in the south african marketplaces.
    `,
    link: "#",
    default: true,
  },
  {
    icon: LockClosedIcon,
    title: "Security & Robustness",
    description: `
      With us your data, is protected and securely stored . Our clients trus to
      deliver a robust, high performance service with zero risk ans zero downtime. 
      SMSPortal run a highly available geographical redundant service, utilize modern
      load balancing technology across our platforms.
    `,
    link: "#",
    default: true,
  },
  {
    icon: UserIcon,
    title: "Accountability & Intergrity",
    description: `
     SMSPortal is proud to South Africa's builk SMS leader. We have built our reputation on 
     credobility, trust , reliabulity, intergity and excelence in technology. We strive to deliver
     'best in class' services to all of our clients through the use of our 100% in-house developed 
     and SMS platforms.
    `,
    link: "#",
    default: true,
  },
];

export function Different() {
  return (
    <Wrapper className={"my-9"}>
      <div className="w-full">
        <h1 className="text-[#475569] text-4xl font-bold opacity-80 text-center my-9">
          What makes us defferent?
        </h1>
      </div>
      <div className="grid grid-cols-3 min-w-full gap-16">
        {cardsData.map((data, index) => (
          <div
            key={`index-${index}`}
            className="flex flex-col border border-[#47556956] p-8 text-[#475569] gap-4"
          >
            {data.icon && <data.icon className="h-9 w-9 text-[#4755699f]" />}
            {data.title && (
              <h1 className="text-2xl font-bold opacity-80">{data.title}</h1>
            )}
            <p className="text-[#4755699f] flex-grow">{data.description}</p>

            {data.withButton ? (
              <Button
                className="rounded-none py-3 px-8 w-full"
                variant="outlined"
                size={"lg"}
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
