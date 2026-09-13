/* Off-site destinations in one place, so a change lands everywhere at once.

   TODO: fill these in before launch. They are deliberately left empty rather than guessed:
   a made-up handle, number or address renders as a working link and would ship unnoticed,
   while an empty one is visibly unfinished. Every caller checks before rendering, so
   nothing pretends to be clickable.

   WHATSAPP is the number in international form, no "+" and no spaces, e.g. 6281234567890. */
export const WHATSAPP = "";
export const EMAIL = "";
export const INSTAGRAM = "";

/* Where a "Konsultasi Gratis" button should send someone.

   Until the number exists this falls back to #konsultasi, the CTA section, which is a
   dead end: it offers the same button again. That is the honest placeholder -- better a
   visible loop than a wa.me link to a number nobody answers. Fill in WHATSAPP and every
   CTA on the page starts opening a real chat instead. */
export const waLink = (message?: string) =>
  WHATSAPP
    ? `https://wa.me/${WHATSAPP}${message ? `?text=${encodeURIComponent(message)}` : ""}`
    : "#konsultasi";
