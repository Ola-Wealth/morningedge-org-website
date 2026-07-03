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
  metadataBase: new URL("https://morningedgesystems.com"),
  title: {
    default: "MorningEdge Systems | Business Operations & AI Consultancy",
    template: "%s | MorningEdge Systems",
  },
  description:
    "MorningEdge Systems is a business operations and AI systems consultancy helping founders, executives, and growing organizations build structures, systems, and strategies that scale with intention.",
  keywords: [
    "business operations consultancy",
    "AI systems integration",
    "executive development",
    "operations architecture",
    "business consulting Lagos",
    "AI consulting Nigeria",
    "organizational strategy",
    "workflow automation",
    "MorningEdge Systems",
    "Olamilekan Wealth",
  ],
  authors: [{ name: "Olamilekan E. Wealth", url: "https://morningedgesystems.com" }],
  creator: "MorningEdge Systems",
  openGraph: {
    title: "MorningEdge Systems | We Build Businesses That Execute.",
    description:
      "Operations architecture, AI systems integration, and executive development for organizations serious about building businesses that execute.",
    siteName: "MorningEdge Systems",
    url: "https://morningedgesystems.com",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MorningEdge Systems | We Build Businesses That Execute.",
    description:
      "Operations architecture, AI systems integration, and executive development for organizations serious about scale.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://morningedgesystems.com",
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
