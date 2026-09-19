import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* next/image re-encodes every file it serves, and its default quality is 75 -- so
       artwork that was already compressed once got compressed again on the way out.
       100 turns that second pass off in effect: the optimiser still resizes and converts
       format, but stops discarding detail. */
    qualities: [100],
    /* Prefer WebP over AVIF: AVIF is smaller but its encoder is lossy in ways that show on
       smooth gradients, which is most of the art on this page. */
    formats: ["image/webp"],
  },
};

export default nextConfig;
