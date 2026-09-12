import Image from "next/image";
import { Button, Container } from "@/components/ui";
import { ShieldCheck } from "@/components/ui/icons";
import HeroShowcase from "./HeroShowcase";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        unoptimized
        className="pointer-events-none object-cover"
      />
      <Container className="relative flex flex-col items-center pb-16 pt-[136px] text-center md:pb-24 md:pt-[168px]">
        <h1 className="max-w-200 text-[40px] font-normal leading-[1.1] tracking-[-0.04em] md:text-[72px]">
          {/* The break is deliberate rather than left to the line box, so the second thought
              always lands on its own line at every width */}
          Bisnis kamu, online.
          <br />
          Tanpa ribet.
        </h1>
        <p className="mt-5 max-w-[560px] text-base leading-[1.5] text-white md:text-[18px]">
          {/* Second sentence drops to its own line from md up; below that the paragraph
              wraps on its own, where a forced break would leave an odd short line */}
          Dari desain sampai online, satu tim yang mengurus semuanya.
          <br className="max-md:hidden" />{" "}
          Kamu tinggal fokus ke bisnis.
        </p>

        <Button href="#harga" variant="white" className="mt-8 px-8">
          Lihat Harga
        </Button>

        <p className="mt-6 inline-flex items-center gap-2 text-[14px] leading-[1.55] text-white">
          <ShieldCheck className="size-4" />
          Harga jelas dari awal, tanpa biaya tersembunyi
        </p>

        <HeroShowcase />
      </Container>
    </section>
  );
}
