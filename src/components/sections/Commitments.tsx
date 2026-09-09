import { Container, Section, SectionHeader } from "@/components/ui";
import { Eye, ShieldCheck, Zap } from "@/components/ui/icons";

const items = [
  {
    icon: Eye,
    title: "Progres bisa kamu pantau",
    desc: "Kamu lihat perkembangannya di setiap tahap dan bisa memberi masukan sebelum lanjut.",
  },
  {
    icon: ShieldCheck,
    title: "Website-nya milik kamu",
    desc: "Domain, hosting, dan akses website atas nama kamu. Tidak ada yang dikunci di kami.",
  },
  {
    icon: Zap,
    title: "Tayang sesuai jadwal",
    desc: "Timeline disepakati sejak awal, dan kami kabari lebih dulu kalau ada yang perlu digeser.",
  },
];

export default function Commitments() {
  return (
    <Section id="komitmen">
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
