import { Button, Container, Section, SectionHeader } from "@/components/ui";
import { Check, Minus } from "@/components/ui/icons";
import { waLink } from "@/lib/contact";

type Feature = { text: string; included: boolean };

type Tier = {
  name: string;
  badge?: string;
  desc: string;
  oldPrice?: string;
  pricePrefix?: string;
  price: string;
  cta: string;
  note: string;
  features: Feature[];
  featured?: boolean;
  why?: string;
};

const tiers: Tier[] = [
  {
    name: "Landing Page",
    badge: "Diskon 30%",
    desc: "Satu halaman fokus untuk promosi, produk, atau profil singkat.",
    oldPrice: "Rp1.110.000",
    price: "Rp750 rb",
    cta: "Mulai Sekarang",
    note: "Perpanjangan domain & hosting: Rp350 rb/tahun mulai tahun ke-2",
    features: [
      { text: "1 halaman desain custom", included: true },
      { text: "Responsif semua perangkat", included: true },
      { text: "Form terhubung WhatsApp", included: true },
      { text: "SEO dasar", included: true },
      { text: "Domain & hosting 1 tahun", included: true },
      { text: "Revisi 2x", included: true },
      { text: "Halaman tambahan", included: false },
      { text: "Admin panel / CMS", included: false },
    ],
  },
  {
    name: "Company Profile",
    badge: "Paling Populer",
    desc: "Website lengkap untuk bisnis yang mau tampil profesional dan kredibel.",
    oldPrice: "Rp3.330.000",
    price: "Rp1,9 jt",
    cta: "Mulai Sekarang",
    note: "Perpanjangan domain & hosting: Rp500 rb/tahun mulai tahun ke-2",
    featured: true,
    features: [
      { text: "Sampai 6 halaman custom", included: true },
      { text: "Responsif semua perangkat", included: true },
      { text: "Form WhatsApp + email", included: true },
      { text: "SEO", included: true },
      { text: "Domain & hosting 1 tahun", included: true },
      { text: "Revisi 3x", included: true },
      { text: "Halaman tambahan (add-on)", included: true },
      { text: "Admin panel / CMS", included: false },
    ],
    why: "Paling seimbang: cukup lengkap untuk tampil meyakinkan, tanpa bayar fitur yang belum kamu butuhkan.",
  },
  {
    name: "Web App / Custom",
    desc: "Untuk kebutuhan khusus: sistem, dashboard, toko online, atau fitur custom.",
    pricePrefix: "mulai dari",
    price: "Rp4,5 jt",
    cta: "Diskusikan Kebutuhan",
    note: "Perpanjangan domain & hosting: mulai Rp950 rb/tahun, sesuai kebutuhan server",
    features: [
      { text: "Halaman & fitur sesuai kebutuhan", included: true },
      { text: "Responsif semua perangkat", included: true },
      { text: "Form & integrasi lengkap", included: true },
      { text: "SEO", included: true },
      { text: "Domain & hosting 1 tahun", included: true },
      { text: "Revisi sesuai kesepakatan", included: true },
      { text: "Admin panel / CMS", included: true },
      { text: "Integrasi pembayaran", included: true },
    ],
  },
];

function TierCard({ tier }: { tier: Tier }) {
  const dark = tier.featured;
  return (
    <div
      className={`flex flex-col rounded-2xl p-7 ${
        dark
          ? "bg-ambient-brand relative bg-[#02142b] text-white ring-1 ring-white/15"
          : "border border-line bg-white text-ink"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[18px] leading-[1.5] font-medium">{tier.name}</p>
        {tier.badge && (
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-[12px] leading-[1.45] font-medium ${
              dark ? "bg-white/10 text-white" : "bg-primary/10 text-primary"
            }`}
          >
            {tier.badge}
          </span>
        )}
      </div>
      <p className={`mt-2 text-[14px] leading-[1.55] ${dark ? "text-on-dark-body" : "text-body"}`}>{tier.desc}</p>

      <div className="mt-6 flex flex-wrap items-baseline gap-x-2">
        {tier.oldPrice && (
          <span className={`text-[14px] leading-[1.55] line-through ${dark ? "text-on-dark-muted" : "text-muted"}`}>{tier.oldPrice}</span>
        )}
        {tier.pricePrefix && <span className={`text-[14px] leading-[1.55] ${dark ? "text-on-dark-body" : "text-body"}`}>{tier.pricePrefix}</span>}
        <span className="text-[32px] font-medium leading-[1.1] tracking-[-0.03em]">{tier.price}</span>
      </div>
      <p className={`mt-3 text-[14px] leading-[1.55] ${dark ? "text-on-dark-muted" : "text-muted"}`}>{tier.note}</p>

      <Button href={waLink(`Halo, saya tertarik dengan ${tier.name}.`)} variant={dark ? "primary" : "secondary"} className="mt-6 w-full">
        {tier.cta}
      </Button>

      <div className={`my-6 border-t ${dark ? "border-white/10" : "border-line"}`} />

      <ul className="flex flex-col gap-3">
        {tier.features.map((f) => (
          <li key={f.text} className="flex items-center gap-3 text-[14px] leading-[1.55]">
            {f.included ? (
              <Check className={`size-5 shrink-0 ${dark ? "text-white" : "text-primary"}`} />
            ) : (
              <Minus className={`size-5 shrink-0 ${dark ? "text-on-dark-faint" : "text-muted"}`} />
            )}
            <span className={f.included ? "" : dark ? "text-on-dark-faint" : "text-muted"}>{f.text}</span>
          </li>
        ))}
      </ul>

      {tier.why && (
        <div className="mt-6 rounded-xl bg-white/5 p-4">
          <p className="text-[14px] leading-[1.55] font-medium">Kenapa pilihan ini?</p>
          <p className="mt-1 text-[14px] leading-[1.55] text-on-dark-body">{tier.why}</p>
        </div>
      )}
    </div>
  );
}

export default function Pricing() {
  return (
    <Section id="harga" className="bg-offwhite">
      <Container>
        <SectionHeader
          title="Website untuk segala bisnis"
          description="Pilih yang paling dekat dengan kebutuhanmu. Semua harga sudah termasuk domain dan hosting tahun pertama."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <TierCard key={tier.name} tier={tier} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
