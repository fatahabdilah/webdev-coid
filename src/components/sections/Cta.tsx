import Image from "next/image";
import { Button, Container, Section } from "@/components/ui";
import { Whatsapp } from "@/components/ui/icons";

export default function Cta() {
  return (
    /* navy underneath: the art is portrait, so on a wide screen it is scaled to cover and
       the ground shows through anywhere it cannot reach. */
    <Section id="konsultasi" className="relative overflow-hidden bg-navy text-white">
      {/* Anchored bottom: the dark half of the art sits behind the heading while the blue
          glow gathers under the button. */}
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
      <Container className="relative flex flex-col items-center text-center">
        <h2 className="max-w-[680px] text-[26px] font-medium leading-[1.25] tracking-[-0.03em] md:text-[30px]">
          Sudah kebayang websitenya?
          <br />
          Yuk, wujudkan sekarang.
        </h2>
        <p className="mt-4 max-w-[600px] text-base leading-[1.6] text-on-dark-body">
          Konsultasi gratis dulu. Kami bantu tentukan jenis website yang paling pas untuk bisnis kamu, tanpa komitmen.
        </p>
        <Button href="#konsultasi" variant="white" className="mt-8">
          <Whatsapp className="size-5" />
          Konsultasi Gratis
        </Button>
      </Container>
    </Section>
  );
}
