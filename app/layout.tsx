import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/Providers/Providers";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";
import AdSense from "@/components/layout/AdSense";
import ServiceWorkerRegistration from "@/components/pwa/ServiceWorkerRegistration";

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
        <meta name="theme-color" content="#f4f4f5" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#18181b" media="(prefers-color-scheme: dark)" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Quran Player" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icons/icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/icons/icon-128x128.png" />
        <link rel="apple-touch-startup-image" href="/splash/apple-splash-1170-2532.png" media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)" />
        <link rel="apple-touch-startup-image" href="/splash/apple-splash-1125-2436.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" />
        <link rel="apple-touch-startup-image" href="/splash/apple-splash-1242-2688.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" />
        <link rel="apple-touch-startup-image" href="/splash/apple-splash-828-1792.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/splash/apple-splash-2048-1536.png" media="(device-width: 1024px) and (device-height: 768px) and (-webkit-device-pixel-ratio: 2)" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
        <Providers>
          <Navigation />
          {children}
          <Analytics />
          <Footer />
          <ServiceWorkerRegistration />
        </Providers>
      </body>
    </html>
  );
}
