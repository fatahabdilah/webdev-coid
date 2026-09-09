"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Container, Section } from "@/components/ui";
import { ArrowRight, Eye, LayoutTemplate, LifeBuoy } from "@/components/ui/icons";
import ProcessShowcase, { type Handoff, type Site } from "./ProcessShowcase";

/* One finished website per client brief, cycling in the showcase. */
const sites: Site[] = [
  {
    prompt: "Halo, saya mau bikin website company profile klinik gigi, ada booking online.",
    kind: "Company Profile",
    name: "Klinik Senyum",
    nav: ["Layanan", "Dokter", "Kontak"],
    headline: "Senyum sehat untuk seluruh keluarga",
    sub: "Booking online, jadwal dokter, dan konsultasi dalam satu tempat.",
    cta: "Booking sekarang",
    photo: "/images/showcase/site-klinik.webp",
    wash: "from-[#062A4F]/90 via-[#062A4F]/55 to-[#062A4F]/10",
    button: "bg-white text-[#062A4F]",
  },
  {
    prompt: "Mau buat toko online kopi lokal, bisa langganan bulanan dan bayar QRIS.",
    kind: "Toko Online",
    name: "Kopi Sudut",
    nav: ["Biji kopi", "Langganan", "Cerita"],
    headline: "Kopi lokal, disangrai tiap pekan",
    sub: "Dari petani Gayo dan Toraja, dikirim segar ke pintu rumahmu.",
    cta: "Belanja biji kopi",
    photo: "/images/showcase/site-kopi.webp",
    wash: "from-[#2A1810]/90 via-[#2A1810]/55 to-[#2A1810]/10",
    button: "bg-[#E8B048] text-[#2A1810]",
  },
  {
    prompt: "Butuh landing page kelas yoga pemula dengan pendaftaran trial gratis.",
    kind: "Landing Page",
    name: "Ruang Asana",
    nav: ["Kelas", "Jadwal", "Harga"],
    headline: "Yoga untuk pemula, mulai minggu ini",
    sub: "Kelas kecil, instruktur bersertifikat, satu sesi percobaan gratis.",
    cta: "Coba kelas gratis",
    photo: "/images/showcase/site-yoga.webp",
    wash: "from-[#14362D]/90 via-[#14362D]/55 to-[#14362D]/10",
    button: "bg-[#CDEB63] text-[#14362D]",
  },
];

/* Three facts that answer what the showcase shows. Not a sequence, so no numbering. */
const facts = [
  {
    icon: LayoutTemplate,
    title: "Semua jenis website, satu tim",
    desc: "Company profile, toko online, landing page, sampai web app.",
  },
  {
    icon: Eye,
    title: "Kamu review sebelum tayang",
    desc: "Revisi sudah termasuk di tiap paket, jadi hasilnya sesuai maumu.",
  },
  {
    icon: LifeBuoy,
    title: "Tidak ditinggal setelah online",
    desc: "Bantuan pembaruan konten dan perbaikan kecil setelah website tayang.",
  },
];

/* Timing of the showcase loop: the card rises, then the brief types, then a rest. */
const TYPE_MS = 26; // per character
const HOLD_MS = 2400; // rest after the brief is fully typed
const RECEDE_MS = 420; // head start for the receding card; the next one rises as it settles
const SNAP_MS = 40; // one paint with the incoming card parked below, before it rises

const REDUCED_MQ = "(prefers-reduced-motion: reduce)";
function subscribeReduced(cb: () => void) {
  const mq = window.matchMedia(REDUCED_MQ);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export default function Process() {
  const [active, setActive] = useState(0);
  const [handoff, setHandoff] = useState<Handoff | null>(null);
  const [progress, setProgress] = useState({ step: 0, chars: 0 });
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);

  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_MQ).matches,
    () => false,
  );

  const full = sites[active].prompt.length;
  const chars = progress.step === active ? progress.chars : 0;
  const typed = reduced ? full : chars;

  /* Only animate while the showcase is on screen */
  useEffect(() => {
    const el = showcaseRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Hand-off in sequence: the front card recedes into the stack (while the incoming card
     fades out of its old slot), the incoming card is parked below the box for one paint,
     then it rises to the front. Typing starts once the hand-off is over. */
  useEffect(() => {
    if (!handoff) return;
    if (handoff.phase === "recede") {
      const t = setTimeout(() => setHandoff({ ...handoff, phase: "park" }), RECEDE_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setHandoff(null), SNAP_MS);
    return () => clearTimeout(t);
  }, [handoff]);

  /* Typewriter, then auto-advance. Pauses while the pointer rests on the showcase so it
     doesn't compete with reading the copy next to it. */
  useEffect(() => {
    if (!visible || paused || handoff || reduced) return;
    if (chars < full) {
      const t = setTimeout(() => setProgress({ step: active, chars: chars + 1 }), TYPE_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      const target = (active + 1) % sites.length;
      setHandoff({ from: active, target, phase: "recede" });
      setActive(target);
    }, HOLD_MS);
    return () => clearTimeout(t);
  }, [visible, paused, handoff, reduced, chars, full, active]);

  return (
    <Section id="cara-kerja">
      {/* Mobile: heading, then the showcase, then the facts. Desktop: showcase left, copy right. */}
      <Container className="grid gap-10 lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:items-center lg:gap-x-16 lg:gap-y-8">
        <div>
          <h2 className="text-[26px] font-semibold leading-tight tracking-[-0.02em] text-ink md:text-[30px]">
            Kamu arahkan, kami yang bangun.
          </h2>
          <p className="mt-4 text-base leading-[1.6] text-body">
            Cukup ceritakan bisnismu lewat WhatsApp. Struktur, desain, dan kontennya kami yang susun.
          </p>
        </div>

        <div
          ref={showcaseRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="lg:col-start-1 lg:row-span-2 lg:row-start-1"
        >
          <ProcessShowcase sites={sites} active={active} handoff={handoff} typed={typed} />
        </div>

        <div className="lg:col-start-2">
          <ul className="divide-y divide-line border-y border-line">
            {facts.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="flex gap-4 py-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <div>
                  <p className="text-[15px] font-medium text-ink">{title}</p>
                  <p className="mt-1 text-[14px] leading-[1.6] text-body">{desc}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* The same action the visual shows: start with a WhatsApp chat */}
          <Link
            href="#konsultasi"
            className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-primary transition-colors hover:text-primary-dark"
          >
            Yuk, konsultasi gratis lewat WhatsApp
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
