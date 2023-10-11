import Link from "next/link";
import { Wrapper } from "../layout/Wrapper";
import { Button } from "@material-tailwind/react";

const navList = [
  {
    label: 'About',
    link: '/about'
  },
  {
    label: 'Products',
    link: '/products'
  },
  {
    label: 'Pricing',
    link: '/pricing'
  },
  {
    label: 'Docs',
    link: '/docs'
  },
  {
    label: 'Contact',
    link: '/contact'
  },
  {
    label: 'Login',
    link: '/authentication'
  },
  {
    label: 'Sign Up',
    link: '/authentication'
  },
]

export function NavBar() {
  return (
    <Wrapper>
      <nav className="flex justify-between h-20 items-center">
        <div className="flex gap-8 items-center">
          {/* logo */}
          <div className="font-extrabold text-3xl">smsportal</div>
          <ul className="flex gap-9">
            <li>
              <Link href={"/"}>About</Link>
            </li>
            <li>
              <Link href={"/"}>Product</Link>
            </li>
            <li>
              <Link href={"/"}>Pricing</Link>
            </li>
            <li>
              <Link href={"/"}>Docs</Link>
            </li>
            <li>
              <Link href={"/"}>Contact</Link>
            </li>
          </ul>
        </div>
        <ul className="flex justify-center items-center gap-7">
          <li>
            <Link href={"/"}>System Status</Link>
          </li>
          <li>
            <Link href={"/"}>Login</Link>
          </li>
          <li>
            <Button
              className="rounded-none  py-2 px-9 "
              variant="outlined"
              color="white"
            >
              Sign Up
            </Button>
          </li>
        </ul>
      </nav>
    </Wrapper>
  );
}
