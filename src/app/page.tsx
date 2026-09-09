import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import GetStarted from "@/components/sections/GetStarted";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Commitments from "@/components/sections/Commitments";
import Segments from "@/components/sections/Segments";
import Pricing from "@/components/sections/Pricing";
import Cta from "@/components/sections/Cta";

export default function Home() {
  return (
    <main className="flex w-full flex-col overflow-x-hidden">
      <Navbar />
      <Hero />
      <GetStarted />
      <Services />
      <Process />
      <Commitments />
      <Segments />
      <Pricing />
      <Cta />
      <Footer />
    </main>
  );
}
