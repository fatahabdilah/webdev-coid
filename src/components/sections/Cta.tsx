import { Button, Container, Section } from "@/components/ui";
import { Whatsapp } from "@/components/ui/icons";

export default function Cta() {
  return (
    <Section id="konsultasi" className="relative overflow-hidden bg-brand-gradient text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_100%,rgba(255,255,255,0.15),transparent)]" />
      <Container className="relative flex flex-col items-center text-center">
        <h2 className="max-w-140 text-[26px] font-semibold leading-[1.25] tracking-[-0.02em] md:text-[30px]">
          Sudah kebayang websitenya?
          <br />
          Yuk, wujudkan sekarang.
        </h2>
        <p className="mt-4 max-w-130 text-base leading-[1.6] text-white/85">
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
