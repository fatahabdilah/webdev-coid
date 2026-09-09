import Image from "next/image";
import Link from "next/link";
import { Container, Section, SectionHeader } from "@/components/ui";

const services = [
  {
    src: "/images/placeholders/service-landing-page.png",
    title: "Landing Page",
    desc: "Satu halaman fokus untuk promosi, produk, atau profil singkat.",
    tint: false,
  },
  {
    src: "/images/placeholders/service-company-profile.png",
    title: "Company Profile",
    desc: "Website lengkap yang mencerminkan kredibilitas bisnis kamu.",
    tint: false,
  },
  {
    src: "/images/placeholders/service-toko-online.png",
    title: "Toko Online",
    desc: "Katalog, keranjang, dan pembayaran dalam satu website.",
    tint: false,
  },
  {
    src: "/images/placeholders/service-web-app.png",
    title: "Web App / Sistem",
    desc: "Dashboard, pendaftaran online, atau fitur custom sesuai kebutuhan.",
    tint: true,
  },
];

export default function Services() {
  return (
    <Section id="layanan">
      <Container>
        <SectionHeader
          eyebrow="Layanan"
          title="Website yang paling sering dicari"
          description="Dari satu halaman promosi sampai sistem custom. Semua dirancang cepat, rapi, dan sesuai tujuan bisnis kamu."
        />
        <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {services.map((s) => (
            <Link key={s.title} href="#harga" className="group flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
                <Image
                  src={s.src}
                  alt={s.title}
                  fill
                  className={`object-cover transition-transform duration-300 group-hover:scale-[1.03] ${s.tint ? "img-brand-tint" : ""}`}
                />
              </div>
              <p className="mt-4 text-[16px] font-medium text-ink">{s.title}</p>
              <p className="mt-1 text-[14px] leading-[1.6] text-body">{s.desc}</p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
