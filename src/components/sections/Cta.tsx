import Image from "next/image";
import { Button, Container, Section } from "@/components/ui";
import { ChevronRight, Globe, Whatsapp } from "@/components/ui/icons";
import { waLink } from "@/lib/contact";

export default function Cta() {
  return (
    /* Two columns from lg: the ask on the left, a finished site on the right. Below lg the
       visual is dropped rather than stacked -- it would only push the button off the first
       screen, and the button is the point of the section.

       The art stays anchored bottom: anchored top it took the near-black end of the
       gradient and the section lost all its colour. */
    <Section id="konsultasi" className="relative overflow-hidden bg-navy text-white">
      {/* The art is a smooth gradient, which is exactly what shows banding when stretched.
          It is stored at 1600px with fine dither baked in; `sizes` keeps the browser from
          picking a small variant and re-introducing the steps. */}
      <Image
        src="/images/cta-bg.webp"
        alt=""
        fill
        sizes="100vw"
        quality={95}
        className="pointer-events-none object-cover object-bottom"
      />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className="text-center lg:text-left">
          <h2 className="text-[26px] font-medium leading-[1.25] tracking-[-0.03em] text-balance md:text-[30px]">
            Sudah kebayang websitenya?
            <br />
            Yuk, wujudkan sekarang.
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-base leading-[1.6] text-on-dark-body lg:mx-0">
            Konsultasi gratis dulu. Kami bantu tentukan jenis website yang paling pas untuk bisnis kamu, tanpa
            komitmen.
          </p>
          <Button href={waLink("Halo, saya mau konsultasi soal website.")} variant="white" className="mt-8">
            <Whatsapp className="size-5" />
            Konsultasi Gratis
          </Button>
        </div>

        <Preview />
      </Container>
    </Section>
  );
}

/* A finished site the way a client first meets it: the page itself, its address, and the
   message that started it. Purely decorative -- aria-hidden, nothing focusable. */
function Preview() {
  return (
    <div aria-hidden className="relative hidden select-none lg:block">
      {/* Tilted a degree and a half so it reads as an object sitting on the section rather
          than a screenshot pasted flat into it. */}
      <div className="relative rotate-[-1.5deg] overflow-hidden rounded-2xl bg-white shadow-[0_30px_60px_-25px_rgba(0,10,30,0.7)]">
        {/* A thin strip of site nav, standing in for the real chrome */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 text-[12px] leading-[1.45] text-ink/60">
          <span className="text-[14px] font-medium tracking-[-0.02em] text-ink">Klinik Senyum</span>
          <span className="flex gap-4">
            <span>Layanan</span>
            <span>Dokter</span>
            <span>Kontak</span>
          </span>
        </div>

        <div className="relative aspect-[16/10]">
          <Image
            src="/images/showcase/site-klinik.webp"
            alt=""
            fill
            sizes="(max-width: 1024px) 0px, 620px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#062A4F]/95 via-[#062A4F]/55 to-[#062A4F]/10" />

          <div className="absolute inset-x-6 bottom-6">
            <p className="text-[24px] font-medium leading-[1.3] tracking-[-0.02em] text-white">
              Senyum sehat untuk
              <br />
              seluruh keluarga
            </p>
            <span className="mt-3 inline-block rounded-full bg-white px-3 py-1 text-[12px] leading-[1.45] font-medium text-[#062A4F]">
              Booking sekarang
            </span>
          </div>
        </div>
      </div>

      {/* Its address, lifted off the top-left corner */}
      <span className="absolute -top-5 left-4 inline-flex items-center gap-2 rounded-full bg-white py-2 pr-4 pl-3 text-[14px] leading-[1.55] font-medium text-ink shadow-[0_12px_28px_-12px_rgba(0,10,30,0.55)]">
        <Globe className="size-4 text-primary" />
        kliniksenyum.co.id
      </span>

      {/* The brief that started it, on the bottom edge -- the same device the Cara Kerja
          showcase uses, so the two sections tell one story. */}
      <span className="absolute -right-5 -bottom-5 inline-flex items-center gap-3 rounded-xl bg-white py-2.5 pr-2.5 pl-4 text-[14px] leading-[1.55] text-ink shadow-[0_12px_28px_-12px_rgba(0,10,30,0.55)]">
        Mau bikin website klinik gigi
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
          <ChevronRight className="size-5" />
        </span>
      </span>
    </div>
  );
}
