import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow, Section } from "@/components/ui";
import { ArrowRight } from "@/components/ui/icons";

const steps = [
  { title: "Konsultasi & brief", desc: "Kami pahami bisnis, target, dan kebutuhanmu lebih dulu." },
  { title: "Desain & pengembangan", desc: "Kamu lihat progresnya dan beri masukan di tiap tahap." },
  { title: "Online & serah terima", desc: "Website tayang, kamu dapat panduan cara mengelolanya." },
];

export default function Process() {
  return (
    <Section id="cara-kerja" className="bg-offwhite">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
          <Image src="/images/placeholders/process-preview.png" alt="Preview proses pengerjaan website" fill className="object-cover" />
        </div>

        <div>
          <Eyebrow>Cara Kerja</Eyebrow>
          <h2 className="mt-4 text-[26px] font-semibold leading-[1.25] tracking-[-0.02em] text-ink md:text-[30px]">
            Kamu arahkan, kami yang bangun.
          </h2>
          <p className="mt-4 text-base leading-[1.6] text-body">
            Ceritakan bisnis dan tujuanmu. Kami susun struktur, desain, dan kontennya, lalu kamu tinjau di
            setiap tahap sampai website siap online.
          </p>

          <ol className="mt-8 divide-y divide-line border-y border-line">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-4 py-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[13px] font-semibold text-primary">
                  {i + 1}
                </span>
                <div>
                  <p className="text-[15px] font-medium text-ink">{step.title}</p>
                  <p className="mt-1 text-[14px] leading-[1.6] text-body">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <Link
            href="#konsultasi"
            className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-primary transition-colors hover:text-primary-dark"
          >
            Yuk, konsultasi gratis dulu
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
