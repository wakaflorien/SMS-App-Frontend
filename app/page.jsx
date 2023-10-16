import { NavBar } from "./components/sections/NavBar";
import { Hero } from "./components/sections/Hero";
import { Offer } from "./components/sections/Offer";
import { Different } from "./components/sections/Defferent";
import { HelpCenter } from "./components/sections/HelpCenter";

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Header */}
      <div className="h-screen w-screen bg-header text-white bg-no-repeat bg-cover">
        {/* NavBar */}
        <NavBar />
        {/* Hero */}
        <Hero />
      </div>
      {/* SMS Portal */}
      {/* What we offer */}
      <Offer />
      {/* Help center section */}
      <HelpCenter />
      {/* What we makes us */}
      <Different />
      {/* Footer */}
    </main>
  );
}
