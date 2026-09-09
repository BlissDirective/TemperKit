import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: "TemperKit",
  description:
    "Brand-matched animated web components from a URL, goal image, and description.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${instrument.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
