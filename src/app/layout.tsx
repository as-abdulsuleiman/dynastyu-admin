/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import AuthProvider from "@/components/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DynastyU",
  description: "DynastyU",
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
      className={cn(
        "antialiased overflow-x-hidden min-h-screen",
        inter.className
      )}
    >
      <body
        suppressHydrationWarning={true}
        className={cn(
          "min-h-screen w-full overflow-x-hidden antialiased h-full overflow-y-scroll",
          inter.className
        )}
      >
        <AuthProvider>
          <div className="w-full mx-auto h-screen min-h-screen">
            <main className="w-full">{children}</main>
          </div>
        </AuthProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
