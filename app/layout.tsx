import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/Providers/Providers";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";
import AdSense from "@/components/layout/AdSense";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadataBase = new URL('https://alquran-player.vercel.app/');

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "AL-Quran Player - Read, Listen & Explore the Holy Quran Online",
    template: "%s | AL-Quran Player"
  },
  description: "Experience the Holy Quran with AL-Quran Player - Listen to 70+ renowned reciters, read with translations, track prayer times, and explore detailed Surah information. Free online Quran player with customizable Ayah cards and beautiful recitations.",
  keywords: [
    "Quran online",
    "Quran player",
    "Holy Quran",
    "Quran recitation",
    "Quran audio",
    "Read Quran online",
    "Listen Quran",
    "Islamic app",
    "Quran with translation",
    "Prayer times",
    "Salah times",
    "Surah information",
    "Ayah cards",
    "Quranic verses",
    "Muslim app",
    "Al-Quran",
    "Quran reciters",
    "Arabic Quran",
    "English translation",
    "Islamic prayer",
    "Quran reader",
    "Free Quran app",
    "Alquran-player",
    "Quran-player"
  ],
  authors: [{ name: "AL-Quran Player Team" }],
  creator: "AL-Quran Player",
  publisher: "AL-Quran Player",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "AL-Quran Player - Read, Listen & Explore the Holy Quran",
    description: "Listen to the Holy Quran recited by 70+ renowned reciters. Read with translations, track prayer times, and explore detailed Surah information. Free and accessible to all.",
    url: "https://alquran-player.vercel.app/",
    siteName: "AL-Quran Player",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1725806891/vkif9lkbhdj5k4ws5pdh.jpg",
        width: 1200,
        height: 630,
        alt: "AL-Quran Player - Read and Listen to the Holy Quran Online"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AL-Quran Player - Read, Listen & Explore the Holy Quran",
    description: "Listen to 70+ reciters, read with translations, track prayer times. Free online Quran player accessible to all Muslims worldwide.",
    creator: "@alquranplayer",
    images: [
      "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1725806891/vkif9lkbhdj5k4ws5pdh.jpg"
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://alquran-player.vercel.app/",
  },
  category: "Religion & Spirituality",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" dir="ltr" className="light scrollbar-thin scrollbar-dark">
      <head>
        <AdSense pId="ca-pub-7851367835426330" />
        <meta name="theme-color" content="#f7f7f7" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#353535" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
        <Providers>
          <Navigation />
          {children}
          <Analytics />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
