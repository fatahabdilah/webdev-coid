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
        <h1 className="max-w-200 text-[40px] font-normal leading-[1.1] tracking-[-0.03em] md:text-[72px] md:leading-20">
          Bisnis kamu, online. Tanpa ribet.
        </h1>
        <p className="mt-5 max-w-[560px] text-base leading-[1.6] text-white md:text-[17px]">
          Dari desain sampai online, satu tim yang mengurus semuanya. Kamu tinggal fokus ke bisnis.
        </p>

        <Button href="#harga" variant="white" className="mt-8 px-8">
          Lihat Harga
        </Button>

        <p className="mt-6 inline-flex items-center gap-2 text-[13px] text-white">
          <ShieldCheck className="size-4" />
          Harga jelas dari awal, tanpa biaya tersembunyi
        </p>

        <HeroShowcase />
      </Container>
    </section>
  );
}
