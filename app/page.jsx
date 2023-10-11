import { Button } from "@/utils/material_tailwind";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Wrapper } from "./components/layout/Wrapper";
import Link from "next/link";
import { NavBar } from "./components/sections/NavBar";
import { Hero } from "./components/sections/Hero";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      {/* Header */}
      <div className="h-screen w-screen bg-header text-white bg-no-repeat bg-cover">
        {/* NavBar */}
        <NavBar />
        {/* Hero */}
        <Hero />
      </div>
      {/* SMS Portal */}
      {/* What we offer */}
      {/* What we makes us */}
      {/* Footer */}
    </main>
  );
}
