"use client";
import Link from "next/link";
import { Wrapper } from "../layout/Wrapper";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import {Button} from "@material-tailwind/react";

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
  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY > 300;
      if (scrollCheck !== scrolled) setScrolled(scrollCheck);
    });
    return document.addEventListener("scroll", () => {});
  }, [scrolled]);

  return (
    <Wrapper
      className={`!fixed top-0 ${
        scrolled && "bg-blue-500"
      } z-50 transition-all duration-200 ease-in-out`}
    >
      <nav className="flex justify-between h-16 xl:h-20 items-center">
        <div className="flex gap-8 items-center">
          {/* logo */}
          <div className="font-extrabold text-xl xl:text-3xl tracking-wide">
            <Image src={"/images/logo.png"} alt={"Logo"} width={200} height={200}/>
          </div>
          <ul className="hidden xl:flex gap-9">
            <li>
              <a href={"/#about"}>About</a>
            </li>
            <li>
              <a href={"/#offers"}>Offers</a>
            </li>
            <li>
              <a href={"/#contact"}>Contact</a>
            </li>
          </ul>
        </div>
        <ul className="hidden xl:flex justify-center items-center gap-7">
          <li>
            <a href={"/"}>System Status</a>
          </li>
          <li>
            <a href={"/authentication"}>Login</a>
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
        {!showNavBar && (
          <Bars3Icon
            className="h-8 text-white cursor-pointer xl:hidden"
            onClick={() => {
              setShowNavBar(!showNavBar);
            }}
          />
        )}
        {showNavBar && (
          <XMarkIcon
            className="h-8 text-white cursor-pointer xl:hidden"
            onClick={() => {
              setShowNavBar(!showNavBar);
            }}
          />
        )}
      </nav>
      <div
        className={`w-40 bg-blue-500 absolute h-screen transition-all duration-300 ease-in-out xl:hidden py-10 ${
          showNavBar ? "right-0" : "-right-full"
        } `}
      >
        <ul className="flex flex-col justify-center items-center gap-7">
          <li>
            <a href={"/#about"}>About</a>
          </li>
          <li>
            <a href={"/#offers"}>Offers</a>
          </li>
          <li>
            <a href={"/#contact"}>Contact</a>
          </li>
          <li>
            <a href={"/"}>System Status</a>
          </li>
          <li>
            <a href={"/authentication"}>Login</a>
          </li>
          <li>
            <a href={"/authentication"}>
              <Button
                className="rounded-none  py-2 px-9 "
                variant="outlined"
                color="white"
                size={"lg"}
              >
                Sign Up
              </Button>
            </a>
          </li>
        </ul>
      </div>
    </Wrapper>
  );
}
