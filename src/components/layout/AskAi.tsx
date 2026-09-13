"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Close, Sparkle } from "@/components/ui/icons";

/* The assistant panel behind the navbar's "Ask AI" button.

   The UI is complete; the answering is not. `sendToAssistant` below is the single seam
   where a real backend plugs in -- everything else (history, the pending state, scrolling,
   the empty state) already behaves as though answers were real, so wiring it up should not
   need changes out here. */

export type ChatMessage = { role: "user" | "assistant"; text: string };

/* TODO: replace with a real call, e.g. `fetch("/api/ask", { method: "POST", ... })`.
   Keep the signature: the caller passes the whole history so the route can send it on as
   context, and expects the assistant's reply as a string.

   Whatever model sits behind this needs a system prompt describing webdev.co.id -- the
   services, what is and is not included at each price, and the rule from the brand guide
   that it must never invent testimonials, client counts or delivery promises. Without
   that it will answer confidently and wrongly about our own pricing. */
async function sendToAssistant(history: ChatMessage[]): Promise<string> {
  void history;
  await new Promise((r) => setTimeout(r, 600));
  return "Asisten ini belum terhubung. Untuk sekarang, konsultasi gratis lewat WhatsApp ya.";
}

const SUGGESTIONS = [
  "Berapa biaya bikin company profile?",
  "Berapa lama pengerjaannya?",
  "Apa bedanya landing page dan company profile?",
];

export default function AskAi() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  /* While the panel is open it owns the page: scroll is locked and Escape closes it. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* Keep the newest message in view as the thread grows. */
  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    const next: ChatMessage[] = [...messages, { role: "user", text: trimmed }];
    setMessages(next);
    setDraft("");
    setPending(true);
    try {
      const reply = await sendToAssistant(next);
      setMessages([...next, { role: "assistant", text: reply }]);
    } catch {
      setMessages([
        ...next,
        { role: "assistant", text: "Maaf, ada gangguan sebentar. Coba lagi ya." },
      ]);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        className="group/ask relative hidden h-10 items-center gap-2 rounded-full bg-ink px-4 text-[14px] leading-[1.55] font-medium text-white transition-[background-color,scale] duration-200 ease-out hover:bg-ink/85 active:scale-[0.97] md:inline-flex motion-reduce:transition-none"
      >
        <Sparkle className="size-4 text-warning" />
        Ask AI
      </button>

      {/* Backdrop and panel are one fixed layer, kept mounted so both can animate. */}
      <div
        className={`fixed inset-0 z-60 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          aria-label="Tutup asisten"
          onClick={() => setOpen(false)}
          className="absolute inset-0 h-full w-full cursor-default bg-ink/55 backdrop-blur-[2px]"
        />

        {/* Anchored under the navbar on the right, the way the button sits; full-width and
            bottom-anchored on phones, where a floating card would waste the screen. */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Asisten webdev.co.id"
          className={`absolute inset-x-0 bottom-0 flex max-h-[86vh] flex-col overflow-hidden rounded-t-2xl bg-surface text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)] transition-[translate,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:inset-x-auto sm:top-20 sm:right-6 sm:bottom-auto sm:h-[min(620px,80vh)] sm:w-[420px] sm:rounded-2xl lg:right-10 motion-reduce:transition-none ${
            open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <span className="inline-flex items-center gap-2 text-[16px] leading-[1.6] font-medium">
              <Sparkle className="size-5 text-warning" />
              Tanya webdev.co.id
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Tutup asisten"
              className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-on-dark-body transition-[color,scale] duration-150 ease-out hover:text-white active:scale-90 motion-reduce:transition-none"
            >
              <Close className="size-5" />
            </button>
          </header>

          <div ref={threadRef} className="flex-1 overflow-y-auto px-5 py-5">
            {messages.length === 0 ? (
              <div>
                <p className="text-[16px] leading-[1.6] text-on-dark-body">
                  Tanya apa saja soal website, harga, atau prosesnya. Kalau butuh jawaban pasti, konsultasi gratis
                  lewat WhatsApp tetap yang paling cepat.
                </p>
                <ul className="mt-5 flex flex-col gap-2">
                  {SUGGESTIONS.map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => send(s)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-[14px] leading-[1.55] text-white transition-colors duration-200 hover:bg-white/10"
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <ul className="flex flex-col gap-4">
                {messages.map((m, i) => (
                  <li
                    key={i}
                    className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
                  >
                    <span
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-[1.55] whitespace-pre-wrap ${
                        m.role === "user" ? "bg-white/10 text-white" : "bg-elevated text-on-dark-body"
                      }`}
                    >
                      {m.text}
                    </span>
                  </li>
                ))}
                {pending && (
                  <li className="flex justify-start">
                    <span className="inline-flex gap-1 rounded-2xl bg-elevated px-4 py-3">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          style={{ animationDelay: `${i * 0.15}s` }}
                          className="size-1.5 animate-pulse rounded-full bg-on-dark-muted"
                        />
                      ))}
                    </span>
                  </li>
                )}
              </ul>
            )}
          </div>

          <div className="border-t border-white/10 p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(draft);
              }}
              className="flex items-end gap-2 rounded-xl border border-white/10 bg-white/5 p-2 pl-4 focus-within:border-white/25"
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  /* Enter sends, Shift+Enter makes a new line -- the convention people
                     already have from every other chat box. */
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(draft);
                  }
                }}
                placeholder="Tulis pertanyaanmu"
                className="max-h-28 flex-1 resize-none bg-transparent py-2.5 text-[14px] leading-[1.55] text-white placeholder:text-on-dark-muted focus:outline-none"
              />
              <button
                type="submit"
                disabled={!draft.trim() || pending}
                aria-label="Kirim"
                className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white transition-[background-color,scale,opacity] duration-150 ease-out hover:bg-primary-dark active:scale-90 disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none"
              >
                <ArrowUp className="size-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
