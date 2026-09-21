import { Button, Container, Section, SectionHeader } from "@/components/ui";
import { Check, Minus } from "@/components/ui/icons";
import { waLink } from "@/lib/contact";

type Feature = { text: string; included: boolean };

type Tier = {
  name: string;
  desc: string;
  oldPrice?: string;
  pricePrefix?: string;
  price: string;
  cta: string;
  note: string;
  features: Feature[];
  featured?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Landing Page",
    desc: "Satu halaman fokus untuk promosi, produk, atau profil singkat.",
    oldPrice: "Rp2.190.000",
    price: "Rp1.490.000",
    cta: "Mulai Sekarang",
    note: "Perpanjangan domain & hosting: Rp750.000/tahun mulai tahun ke-2",
    features: [
      { text: "1 halaman desain custom", included: true },
      { text: "Responsif semua perangkat", included: true },
      { text: "Form terhubung WhatsApp", included: true },
      { text: "SEO dasar", included: true },
      { text: "Domain & hosting 1 tahun", included: true },
      { text: "Sertifikat SSL", included: true },
      { text: "Halaman tambahan", included: false },
      { text: "Admin panel / CMS", included: false },
    ],
  },
  {
    name: "Company Profile",
    desc: "Website lengkap untuk bisnis yang mau tampil profesional dan kredibel.",
    oldPrice: "Rp4.490.000",
    price: "Rp2.990.000",
    cta: "Mulai Sekarang",
    note: "Perpanjangan domain & hosting: Rp1.500.000/tahun mulai tahun ke-2",
    featured: true,
    features: [
      { text: "Sampai 6 halaman custom", included: true },
      { text: "Responsif semua perangkat", included: true },
      { text: "Form WhatsApp + email", included: true },
      { text: "SEO", included: true },
      { text: "Domain & hosting 1 tahun", included: true },
      { text: "Sertifikat SSL", included: true },
      { text: "Halaman tambahan (add-on)", included: true },
      { text: "Admin panel / CMS", included: false },
    ],
  },
  {
    name: "Web App / Custom",
    desc: "Untuk kebutuhan khusus: sistem, dashboard, toko online, atau fitur custom.",
    pricePrefix: "mulai dari",
    price: "Rp4.990.000",
    cta: "Diskusikan Kebutuhan",
    note: "Perpanjangan domain & hosting: mulai Rp2.500.000/tahun, sesuai kebutuhan server",
    features: [
      { text: "Halaman & fitur sesuai kebutuhan", included: true },
      { text: "Responsif semua perangkat", included: true },
      { text: "Form & integrasi lengkap", included: true },
      { text: "SEO", included: true },
      { text: "Domain & hosting 1 tahun", included: true },
      { text: "Sertifikat SSL", included: true },
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
      <p className="text-[18px] leading-[1.5] font-medium">{tier.name}</p>
      <p className={`mt-2 text-[14px] leading-[1.55] ${dark ? "text-on-dark-body" : "text-body"}`}>{tier.desc}</p>

      {/* The qualifier sits on its own line above the figure rather than beside it: at
          32px the price dwarfs a 14px neighbour, and a struck price on the same baseline
          reads as part of the amount. */}
      <div className="mt-6">
        {tier.oldPrice && (
          <p className={`text-[14px] leading-[1.55] line-through ${dark ? "text-on-dark-muted" : "text-muted"}`}>
            {tier.oldPrice}
          </p>
        )}
        {tier.pricePrefix && (
          <p className={`text-[14px] leading-[1.55] ${dark ? "text-on-dark-body" : "text-body"}`}>{tier.pricePrefix}</p>
        )}
        <Price value={tier.price} />
      </div>
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

      {/* Button and renewal note close the card. The wrapper takes mt-auto rather than the
          button, so it can also carry a minimum gap: with mt-auto on the button itself, a
          long feature list left no room and the button sat flush against the last item.

          Bottom-aligning keeps the three buttons level despite different list lengths, and
          the order matches how the card is read: price, what you get, then the action. The
          renewal sits under the button, as the small print it is. */}
      <div className="mt-auto pt-8">
        <Button
          href={waLink(`Halo, saya tertarik dengan ${tier.name}.`)}
          variant={dark ? "primary" : "secondary"}
          className="w-full"
        >
          {tier.cta}
        </Button>
        <p className={`mt-3 text-[14px] leading-[1.55] ${dark ? "text-on-dark-muted" : "text-muted"}`}>{tier.note}</p>
      </div>
    </div>
  );
}

/* The trailing thousands set smaller than the rest. "Rp1.990.000" at one size gives the
   last three zeroes the same weight as the figure that actually varies between tiers;
   shrinking them lets the eye land on 1,99 / 2,99 / 4,99, which is the comparison being
   made. Aligned to the baseline rather than the top, so the tail sits on the same line
   the big digits stand on. */
function Price({ value }: { value: string }) {
  const cut = value.lastIndexOf(".");
  const head = cut === -1 ? value : value.slice(0, cut);
  const tail = cut === -1 ? "" : value.slice(cut);
  return (
    <p className="text-[32px] font-medium leading-[1.1] tracking-[-0.03em]">
      {head}
      {tail && <span className="text-[20px]">{tail}</span>}
    </p>
  );
}

export default function Pricing() {
  return (
    <Section id="harga" className="bg-offwhite">
      <Container>
        <SectionHeader
          title="Website untuk segala bisnis"
          description="Semua didesain custom dari nol, bukan template. Harga sudah termasuk domain dan hosting tahun pertama."
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
