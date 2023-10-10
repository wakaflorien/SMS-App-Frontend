"use client";
import { Button } from '@/utils/material_tailwind'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation'

export default function Home() {
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
  const router = useRouter()
  return (
    <main className='flex flex-col items-center'>
      <header className='absolute top-0 flex bg-primary w-full justify-between'>
        <div>Logo</div>
        <nav>
          <ul className='flex gap-4'>
            {navList.map((item, index) => <li key={index}>
              <Link href={item.link}>{item.label}</Link>
            </li>)}
          </ul>
        </nav>
      </header>
    </main >
  )
}
