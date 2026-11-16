import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { CartDrawer } from "@/components/cart-drawer";
import { CustomCursor } from "@/components/custom-cursor";
import { Preloader } from "@/components/preloader";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/toaster";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vestra-atelier.example.com"),
  title: {
    default: "VESTRA Atelier — Modern dressing, quietly bold",
    template: "%s · VESTRA Atelier",
  },
  description:
    "VESTRA is a modern atelier of considered essentials: sculpted outerwear, featherweight knitwear and tailoring made to be worn for years, not seasons.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-cream text-ink antialiased">
        <Preloader />
        <CustomCursor />
        <ScrollProgress />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <CartDrawer />
        <Toaster />
      </body>
    </html>
  );
}