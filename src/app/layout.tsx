/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import "react-color-palette/css";
import "react-country-state-city/dist/react-country-state-city.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import AuthProvider from "@/components/auth-provider";
import NextTopLoader from "nextjs-toploader";
import { appleIcons, iconShortcut, openGraphImage } from "./shared-metadata";

const inter = Inter({ subsets: ["latin"], weight: ["400"], display: "swap" });

export const metadata: Metadata = {
  title: "DynastyU",
  description: "Building Tomorrow's Superstars Today",
  twitter: {
    card: "summary_large_image",
    site: "@DynastyUrec",
    creator: "@DynastyUrec",
    title: "DynastyU",
    description: "Building Tomorrow's Superstars Today",
    images: "/twitter-image.png",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_DYNASTYU_URL,
  },
  openGraph: {
    ...openGraphImage,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: [...iconShortcut],
    apple: [...appleIcons],
    other: [
      {
        rel: "apple-icon-precomposed",
        url: "/favicon/apple-icon-precomposed.png",
      },
    ],
  },
  manifest: "/favicon/manifest.json",
  applicationName: "DynastyU",
};
export const viewport = {
  width: 1,
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  themeColor: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={cn("antialiased m-0 p-0", inter.className)}
    >
      <body
        suppressHydrationWarning={true}
        className={cn(
          "min-h-screen antialiased w-full mt-0 p-0",
          inter.className
        )}
      >
        <NextTopLoader
          color="#dc2626"
          height={2.3}
          showSpinner={true}
          showAtBottom={false}
        />
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
