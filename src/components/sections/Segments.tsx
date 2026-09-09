import { Container, Section, SectionHeader } from "@/components/ui";
import { Gauge, LifeBuoy, Palette, PenLine } from "@/components/ui/icons";

const included = [
  {
    icon: Palette,
    title: "Desain UI/UX",
    desc: "Tampilan modern yang nyaman dipakai, bukan sekadar bagus dilihat.",
  },
  {
    icon: PenLine,
    title: "Copywriting",
    desc: "Teks website yang jelas, meyakinkan, dan sesuai karakter brand kamu.",
  },
  {
    icon: Gauge,
    title: "Optimasi kecepatan",
    desc: "Ringan dan cepat dibuka, termasuk dari HP dengan sinyal pas-pasan.",
  },
  {
    icon: LifeBuoy,
    title: "Dukungan setelah tayang",
    desc: "Bantuan pembaruan konten dan perbaikan kecil setelah website online.",
  },
];

const segments = [
  { title: "Brand baru", desc: "Website pertama yang langsung bikin brand kamu kelihatan meyakinkan." },
  { title: "Startup", desc: "Cepat dan modern, dieksekusi tanpa drama, siap mendukung pertumbuhan." },
  { title: "Perusahaan", desc: "Company profile profesional yang mencerminkan kredibilitas bisnis kamu." },
  {
    title: "Institusi & organisasi",
    desc: "Rapi dan informatif, memudahkan publik mengakses informasi dan layanan online.",
  },
];

export default function Segments() {
  return (
    <Section id="layanan" className="bg-surface text-white">
      <Container>
        <SectionHeader
          tone="dark"
          eyebrow="Layanan"
          title="Lebih dari sekadar website"
          description="Apa pun jenis website yang kamu pilih, empat hal ini selalu termasuk supaya website-nya bukan hanya tayang, tapi juga bekerja untuk bisnismu."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {included.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl bg-elevated p-6">
              <span className="flex size-10 items-center justify-center rounded-lg bg-white/5 text-white">
                <Icon className="size-5" />
              </span>
              <p className="mt-5 text-[16px] font-medium">{title}</p>
              <p className="mt-2 text-[14px] leading-[1.6] text-white/70">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid items-start gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16 md:mt-24">
          <div>
            <h3 className="text-[22px] font-medium leading-[1.3] tracking-[-0.01em] md:text-[24px]">
              Dibangun untuk berbagai skala bisnis
            </h3>
            <p className="mt-3 text-[15px] leading-[1.6] text-white/70">
              Dari brand yang baru mulai sampai institusi besar. Pendekatannya sama: pahami tujuanmu, lalu bangun
              website yang mendukungnya.
            </p>
          </div>
          <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {segments.map((s) => (
              <li key={s.title} className="border-t border-white/10 pt-5">
                <p className="text-[16px] font-medium">{s.title}</p>
                <p className="mt-1.5 text-[14px] leading-[1.6] text-white/70">{s.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
