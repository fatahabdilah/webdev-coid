import Image from "next/image";
import { Container, Section, SectionHeader } from "@/components/ui";
import { Gauge, LifeBuoy, MessageCircle, Palette, PenLine, Search } from "@/components/ui/icons";

const segments = [
  { title: "Brand baru", desc: "Mulai dengan website yang langsung bikin brand kamu kelihatan meyakinkan." },
  { title: "Startup", desc: "Website cepat dan modern, dieksekusi tanpa drama, siap mendukung pertumbuhan." },
  { title: "Perusahaan", desc: "Company profile profesional yang mencerminkan kredibilitas bisnis kamu." },
  {
    title: "Institusi & organisasi",
    desc: "Website institusi yang rapi dan informatif, memudahkan publik mengakses informasi dan layanan secara online.",
  },
];

const extras = [
  { icon: Palette, title: "Desain UI/UX", desc: "Tampilan modern yang nyaman dipakai, bukan sekadar bagus dilihat." },
  { icon: PenLine, title: "Copywriting", desc: "Teks website yang jelas, meyakinkan, dan sesuai karakter brand kamu." },
  { icon: Gauge, title: "Optimasi kecepatan", desc: "Website ringan dan cepat dibuka, termasuk dari HP dengan sinyal pas-pasan." },
  { icon: Search, title: "SEO dasar", desc: "Struktur yang rapi supaya website kamu lebih mudah ditemukan di mesin pencari." },
  { icon: MessageCircle, title: "Integrasi WhatsApp", desc: "Formulir dan tombol chat yang langsung terhubung ke WhatsApp bisnis kamu." },
  { icon: LifeBuoy, title: "Maintenance & dukungan", desc: "Bantuan setelah website online, dari pembaruan konten sampai perbaikan kecil." },
];

export default function Segments() {
  return (
    <Section className="bg-surface text-white">
      <Container>
        <SectionHeader
          tone="dark"
          eyebrow="Untuk Siapa"
          title="Dibangun untuk berbagai skala bisnis"
          description="Dari brand yang baru mulai sampai institusi besar. Pendekatannya sama: pahami tujuanmu, lalu bangun website yang mendukungnya."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto aspect-[10/11] w-full max-w-[480px] overflow-hidden rounded-2xl bg-elevated">
            <Image src="/images/placeholders/segments-preview.png" alt="" fill className="img-brand-tint object-cover" />
          </div>
          <ul className="divide-y divide-white/10">
            {segments.map((s) => (
              <li key={s.title} className="py-5 first:pt-0 last:pb-0">
                <p className="text-[18px] font-medium">{s.title}</p>
                <p className="mt-1 text-[14px] leading-[1.6] text-white/70">{s.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 md:mt-24">
          <h3 className="text-[22px] font-medium leading-[1.3] tracking-[-0.01em] md:text-[24px]">Lebih dari sekadar website</h3>
          <p className="mt-2 max-w-[600px] text-[15px] leading-[1.6] text-white/70">
            Semua yang dibutuhkan supaya website kamu bukan hanya tayang, tapi juga bekerja untuk bisnismu.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {extras.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl bg-elevated p-6">
                <span className="flex size-10 items-center justify-center rounded-lg bg-white/5 text-white">
                  <Icon className="size-5" />
                </span>
                <p className="mt-5 text-[16px] font-medium">{title}</p>
                <p className="mt-2 text-[14px] leading-[1.6] text-white/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
