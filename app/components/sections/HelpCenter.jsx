"use client";

import { Button } from "@material-tailwind/react";
import { Wrapper } from "../layout/Wrapper";

export function HelpCenter() {
  return (
    <Wrapper className="bg-helpcenter bg-cover text-white py-16 grid grid-cols-4 my-9">
      <div className="flex flex-col gap-4">
        <div className="text-red text-4xl w-full font-extrabold"> What is SMSPortal</div>
        <p className="flex-grow">
          SMSPortal is south African{"'"}s leading bulk SMS service. With our
          simple API intergration and cost effective bulk SMS solution your
          bussiness, brand or organisation can easily communicate with an
          exapansive audienve in a target manner. We have access to over 700
          networks in 250 countries, testing our services in fast and simple and
          our Help Centre can easly guide you though the process.
        </p>
        <Button
          className="rounded-none py-4 px-9 bg-[#4b7fef] text-white mt-20 w-48"
          color="white"
          variant="primary"
        >
          Help Centre
        </Button>
      </div>
    </Wrapper>
  );
}
