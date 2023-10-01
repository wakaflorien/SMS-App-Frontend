"use client";
import { Button } from '@/utils/material_tailwind'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <main className='flex flex-col items-center'>
      <Button onClick={() => router.push('/dashboard')}>Button</Button>
    </main >
  )
}
