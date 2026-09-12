import { Star } from "@/components/ui/icons";

/* Three short quotes under the portfolio marquee.

   These are plain cards, not links: there is no project page to send a reader to, and an
   arrow on something that does not navigate is a promise the page cannot keep.

   TODO: placeholder testimonials, written to match the example projects. Replace with
   real client words, with their permission, before launch. */

const reviews = [
  {
    name: "Rina",
    business: "Klinik Senyum",
    quote:
      "Booking online-nya langsung dipakai pasien sejak hari pertama tayang. Jadwal dokter juga bisa kami ubah sendiri tanpa minta bantuan.",
  },
  {
    name: "Bagas",
    business: "Kopi Sudut",
    quote:
      "Pesanan langganan bulanan naik setelah websitenya jalan. Prosesnya jelas dari awal, dan kami selalu tahu progresnya sampai mana.",
  },
  {
    name: "Damar",
    business: "Ruang Asana",
    quote:
      "Halamannya ringan dibuka dari HP, dan pendaftaran kelas percobaan masuk terus. Timnya sabar menjelaskan hal teknis ke saya.",
  },
];

export default function Reviews() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {reviews.map(({ name, business, quote }) => (
        <figure
          key={business}
          className="rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <figcaption>
            <span className="block text-[14px] leading-[1.55] font-medium text-white">{name}</span>
            <span className="mt-0.5 block text-[12px] leading-[1.45] text-on-dark-muted">{business}</span>
          </figcaption>

          <span className="mt-3 flex gap-0.5" aria-label="Lima dari lima bintang">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="size-3.5 text-success" aria-hidden />
            ))}
          </span>

          <blockquote className="mt-3 text-[14px] leading-[1.55] text-on-dark-body">{quote}</blockquote>
        </figure>
      ))}
    </div>
  );
}
