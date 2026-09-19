import Image from "next/image";
import { Button, Container, Section } from "@/components/ui";
import { Whatsapp } from "@/components/ui/icons";
import { waLink } from "@/lib/contact";

export default function Cta() {
  return (
    /* Two columns from lg: the ask on the left, the photo on the right. Below lg the photo
       is dropped rather than stacked -- it would only push the button off the first screen,
       and the button is the point of the section.

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

      <Portrait />

      <Container className="relative lg:grid lg:grid-cols-[1fr_340px] lg:gap-16 xl:grid-cols-[1fr_400px]">
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
      </Container>
    </Section>
  );
}

/* Someone reading a message on their phone -- the moment the button leads to. Decorative,
   so it carries an empty alt.

   Pinned to the section's own bottom edge rather than placed in the grid, so the figure
   stands on the panel instead of ending in a horizontal cut across the waist. The section
   pads 96px below its content, and the photo ignores that padding -- which is the point:
   in the grid it stopped short and the straight edge read as a pasted cutout.

   The column it occupies is reserved in the grid beside it, so the copy never runs under
   the figure. */
function Portrait() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto hidden w-full max-w-[1200px] px-6 lg:block lg:px-10"
    >
      <Image
        src="/images/cta-orang.webp"
        alt=""
        width={684}
        height={1024}
        sizes="(max-width: 1024px) 0px, 400px"
        className="ml-auto block h-[380px] w-auto xl:h-[440px]"
      />
    </div>
  );
}
