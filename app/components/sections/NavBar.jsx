"use client";
import Link from "next/link";
import { Wrapper } from "../layout/Wrapper";
import { Button } from "@/utils/material_tailwind";
import { useEffect, useState } from "react";
import Image from "next/image";

const navList = [
  {
    label: "About",
    link: "/about",
  },
  {
    label: "Products",
    link: "/products",
  },
  {
    label: "Pricing",
    link: "/pricing",
  },
  {
    label: "Docs",
    link: "/docs",
  },
  {
    label: "Contact",
    link: "/contact",
  },
  {
    label: "Login",
    link: "/authentication",
  },
  {
    label: "Sign Up",
    link: "/authentication",
  },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    console.log( window.scrollY)
    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY > 300;
      if (scrollCheck !== scrolled) setScrolled(scrollCheck);
    });
    return document.addEventListener("scroll", () => {});
  }, [scrolled]);
  return (
    <Wrapper className={`!fixed top-0 ${ scrolled &&  "bg-blue-500"} z-50 transition-all duration-200 ease-in-out`}>
      <nav className="flex justify-between h-20 items-center">
        <div className="flex gap-8 items-center">
          {/* logo */}
          <div className="font-extrabold text-3xl">
            <Image src={"/images/logo.png"} alt={"Logo"} width={200} height={200} />
          </div>
          <ul className="flex gap-9">
            <li>
              <Link href={"/"}>About</Link>
            </li>
            <li>
              <Link href={"/#offers"}>Offers</Link>
            </li>
            <li>
              {/* <Link href={"/"}>Pricing</Link>
            </li>
            <li>
              <Link href={"/"}>Docs</Link> */}
            </li>
            <li>
              <Link href={"/#contact"}>Contact</Link>
            </li>
          </ul>
        </div>
        <ul className="flex justify-center items-center gap-7">
          <li>
            <Link href={"/"}>System Status</Link>
          </li>
          <li>
            <Link href={"/authentication"}>Login</Link>
          </li>
          <li>
            <Link href={"/authentication"}>
              <Button
                className="rounded-none  py-2 px-9 "
                variant="outlined"
                color="white"
                size={"lg"}
              >
                Sign Up
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </Wrapper>
  );
}
