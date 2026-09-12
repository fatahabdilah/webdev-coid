import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Process from "@/components/sections/Process";
import WebsiteTypes from "@/components/sections/WebsiteTypes";
import Segments from "@/components/sections/Segments";
import Pricing from "@/components/sections/Pricing";
import Cta from "@/components/sections/Cta";

export default function Home() {
  return (
    <main className="flex w-full flex-col overflow-x-hidden">
      <Navbar />
      <Hero />
      <Process />
      <WebsiteTypes />
      <Segments />
      <Pricing />
      <Cta />
      <Footer />
    </main>
  );
}
