"use client";
import { Button } from "@material-tailwind/react";
import { Wrapper } from "../layout/Wrapper";
import { InputWithButton } from "../ui/InputWithIcon";
import { Textarea } from "../ui/TextArea";

export function Footer() {
  return (
    <div className="bg-blue-500 text-white opacity-100 h-screen flex items-center">
      <Wrapper className="py-20 grid grid-cols-12 gap-28">
        <div className="col-span-5">
          <h1 className="text-5xl font-extrabold">Contact SMSPortal</h1>
          <form className="flex flex-col gap-7 mt-24">
            <InputWithButton />
            <InputWithButton />
            <InputWithButton />
            <InputWithButton />
            <div className="relative flex w-full">
              <textarea
                className="bg-white/25 min-w-full placeholder:text-white border-none"
                placeholder="Message"
              ></textarea>
            </div>
            <Button
              className="rounded-none py-3 px-8"
              variant="outlined"
              color="white"
              size={"lg"}
            >
              Send Message
            </Button>
          </form>
        </div>
        <div className="col-span-7">
          <div className="flex flex-col gap-y-7">
            <h1 className="text-6xl font-extrabold mb-8">
              <p>Sales & Support</p>
              <p>Space Centre</p>
            </h1>
            <p className="text-xl">
              If you require any further information about SMSPortal Product,
              please do not hasitate to contact us. Our team of highly trained
              proffessionals are standing by
            </p>
            <div className="flex flex-col">
              <div className="grid grid-cols-12">
                <div className="text-white font-bold col-span-8">
                  Monday to Friday
                </div>
                <div className="text-white col-span-4">
                  <p>8am - 5pm(UTC+2)</p>
                </div>
              </div>
              <div className="grid grid-cols-12">
                <div className="text-white font-bold col-span-8">Telphone</div>
                <div className="text-white col-span-4">
                  <p>SA: 086 111 2021</p>
                  <p>Ireland: +353 (0)21 731 9734</p>
                </div>
              </div>
              <div className="grid grid-cols-12">
                <div className="text-white font-bold col-span-8">Email</div>
                <div className="text-white col-span-4">
                  <p>info@smsportal.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
