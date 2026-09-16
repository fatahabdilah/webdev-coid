"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Button, Container, Section, SectionHeader } from "@/components/ui";
import { Whatsapp } from "@/components/ui/icons";
import { waLink } from "@/lib/contact";
import ProcessShowcase, { type Handoff, type Site } from "./ProcessShowcase";

/* One finished website per client brief, cycling in the showcase. */
const sites: Site[] = [
  {
    prompt: "Mau bikin website klinik gigi, ada booking online.",
    avatar: "/images/showcase/avatar-klinik.webp",
    sender: "Rina",
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
    prompt: "Butuh toko online kopi, bisa langganan bulanan.",
    avatar: "/images/showcase/avatar-kopi.webp",
    sender: "Bagas",
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
    prompt: "Bikin landing page kelas yoga buat pemula, ya.",
    avatar: "/images/showcase/avatar-yoga.webp",
    sender: "Damar",
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

/* TODO: placeholder — replace with the real number of live client sites before launch.
   Shown as social proof next to the client avatars. */
const CLIENT_COUNT = "40+";

/* Timing of the showcase loop: the card rises, the message types, the send button
   lights up and is pressed, then the next website takes its place. */
const TYPE_MS = 26; // per character
const READ_MS = 1300; // message complete, send button lit, before it is pressed
const PRESS_MS = 520; // button pressed and the message lifting away, before the card changes
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
  const [sending, setSending] = useState(false);
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

  /* Type the message, hold while the send button is lit, press it, then swap the card.
     Pauses while the pointer rests on the showcase so it doesn't compete with reading. */
  useEffect(() => {
    if (!visible || paused || handoff || reduced) return;
    if (chars < full) {
      const t = setTimeout(() => setProgress({ step: active, chars: chars + 1 }), TYPE_MS);
      return () => clearTimeout(t);
    }
    if (!sending) {
      const t = setTimeout(() => setSending(true), READ_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      const target = (active + 1) % sites.length;
      setSending(false);
      setHandoff({ from: active, target, phase: "recede" });
      setActive(target);
    }, PRESS_MS);
    return () => clearTimeout(t);
  }, [visible, paused, handoff, reduced, chars, full, active, sending]);

  return (
    <Section id="layanan">
      <Container className="flex flex-col items-center">
        <SectionHeader
          title="Website untuk setiap kebutuhan bisnis"
          description="Kamu yang tahu bisnismu. Kami yang mengurus desain, teknis, dan isinya."
        />
      </Container>

      {/* Mobile: heading, showcase, then the call to action. Desktop: showcase left, copy right,
          the copy centred as one block against the height of the visual. */}
      <Container className="mt-14 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
        {/* Heading sits in the right column but is pulled out of the flex flow on desktop,
            so the copy below it can sit directly underneath rather than a stretched row apart. */}
        <div className="lg:order-2 lg:col-start-2">
          <h2 className="text-[26px] font-medium leading-[1.25] tracking-[-0.03em] text-ink md:text-[30px]">
            Kamu arahkan, kami yang bangun.
          </h2>
          <p className="mt-4 text-base leading-[1.6] text-body">
            Cukup ceritakan bisnismu lewat WhatsApp. Struktur, desain, dan kontennya kami yang susun.
          </p>

          <div className="max-lg:hidden lg:mt-8">
            <CallToAction sites={sites} />
          </div>
        </div>

        <div
          ref={showcaseRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="lg:order-1 lg:col-start-1"
        >
          <ProcessShowcase
            sites={sites}
            active={active}
            handoff={handoff}
            typed={typed}
            sending={sending}
          />
        </div>

        {/* Same block again for mobile, where it belongs after the visual */}
        <div className="lg:hidden">
          <CallToAction sites={sites} />
        </div>
      </Container>
    </Section>
  );
}

/* The one action plus the proof line. Rendered twice so it can sit under the copy on
   desktop and after the visual on mobile; only one copy is ever visible. */
function CallToAction({ sites }: { sites: Site[] }) {
  return (
    <>
      {/* The same button every other consultation CTA uses, rather than the full-width
          ruled row this once was: one action should look the same everywhere it appears.
          Opens the real chat once the number is filled in; until then it falls back to the
          CTA section -- see src/lib/contact.ts. */}
      <Button href={waLink("Halo, saya mau konsultasi soal website.")}>
        <Whatsapp className="size-5" />
        Konsultasi Gratis
      </Button>

      {/* Faces of clients whose sites are in the stack, then the proof line */}
      <div className="mt-6 flex items-center gap-3">
        <div className="flex">
          {sites.map((s) => (
            <span key={s.sender} className="relative -mr-2.5 size-9 overflow-hidden rounded-full ring-2 ring-white">
              <Image src={s.avatar} alt="" fill sizes="36px" className="object-cover" />
            </span>
          ))}
          {/* Sits on top of the avatars, so its number is never clipped */}
          <span className="relative z-10 flex size-9 items-center justify-center rounded-full bg-primary text-[12px] leading-[1.45] font-medium text-white ring-2 ring-white">
            {CLIENT_COUNT}
          </span>
        </div>
        <p className="text-[14px] leading-[1.55] text-body">
          bisnis sudah tayang
          <br />
          bersama webdev.co.id
        </p>
      </div>
    </>
  );
}
