/* Off-site destinations in one place, so a change lands everywhere at once.

   WHATSAPP is the number in international form, no "+" and no spaces: the local 0 is
   replaced by 62, which is what wa.me expects.

   EMAIL is deliberately empty -- there is no address to publish yet. Every caller checks
   before rendering, so an empty value drops the row rather than shipping a dead link. */
export const WHATSAPP = "6282258096886";
export const EMAIL = "";
export const INSTAGRAM = "https://instagram.com/webdev.co.id";

/* Where a "Konsultasi Gratis" button should send someone: a WhatsApp chat, opened with a
   message suited to wherever it was clicked.

   Falls back to #konsultasi if the number is ever emptied -- a visible loop back to the
   CTA section beats a wa.me link to a number nobody answers. */
export const waLink = (message?: string) =>
  WHATSAPP
    ? `https://wa.me/${WHATSAPP}${message ? `?text=${encodeURIComponent(message)}` : ""}`
    : "#konsultasi";
