import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AL-Quran Player - Read, Listen & Explore the Holy Quran",
    short_name: "Quran Player",
    description:
      "Listen to the Holy Quran recited by 70+ renowned reciters. Read with translations, track prayer times, and explore detailed Surah information.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f7f7",
    theme_color: "#059669",
    orientation: "portrait-primary",
    scope: "/",
    lang: "en",
    categories: ["religion", "education", "lifestyle"],
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
