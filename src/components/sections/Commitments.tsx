import { Container, Section, SectionHeader } from "@/components/ui";
import { Eye, Tag, Zap } from "@/components/ui/icons";

const items = [
  {
    icon: Tag,
    title: "Harga jelas di depan",
    desc: "Biaya pembuatan dan perpanjangan disebut sejak awal. Tidak ada biaya tersembunyi.",
  },
  {
    icon: Eye,
    title: "Progres yang transparan",
    desc: "Kamu bisa lihat perkembangan website dan memberi masukan di setiap tahap.",
  },
  {
    icon: Zap,
    title: "Cepat dan siap online",
    desc: "Website ringan, nyaman diakses dari HP, dan tayang sesuai jadwal yang disepakati.",
  },
];

export default function Commitments() {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="Komitmen Kami"
          title="Standar kerja di setiap proyek"
          description="Bukan janji muluk. Ini yang selalu kamu dapatkan saat bekerja bersama kami."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-line bg-white p-6">
              <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <p className="mt-5 text-[18px] font-medium text-ink">{title}</p>
              <p className="mt-2 text-[14px] leading-[1.6] text-body">{desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
