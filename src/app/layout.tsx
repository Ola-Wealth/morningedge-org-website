import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Editorial serif — close to Reckless GISI in lightness and refinement
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Clean geometric sans — close to Neue Haas Unica
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "MorningEdge Systems | Business Operations & AI Systems Consultancy",
  description:
    "MorningEdge is a business operations and AI systems consultancy helping founders, executives, and growing organizations build structures that scale.",
  openGraph: {
    title: "MorningEdge Systems | We Build Businesses That Execute.",
    description:
      "Operations architecture, AI systems integration, and executive development for organizations serious about scale.",
    siteName: "MorningEdge Systems",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
