import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieNotice from "@/components/CookieNotice";
import { site } from "@/lib/site";

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "MorningEdge | Business Operations, People and Systems",
    template: "%s | MorningEdge",
  },
  description:
    "A Nigerian company loses output in two places: its people and its systems. MorningEdge fixes both. AI enablement for your workforce, and software that runs your operation on one system.",
  keywords: [
    "business operations Nigeria",
    "ERPNext implementation Lagos",
    "Microsoft 365 Copilot training",
    "AI integration",
    "AI enablement",
    "enterprise resource planning Nigeria",
    "operations consulting Lagos",
    "MorningEdge",
  ],
  authors: [{ name: "Olamilekan E. Wealth", url: site.url }],
  creator: site.legalName,
  openGraph: {
    title: "MorningEdge | We build businesses that execute.",
    description:
      "AI enablement for your people. Software that runs your operation. Two products. One outcome. We write adoption into the contract.",
    siteName: "MorningEdge",
    url: site.url,
    type: "website",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "MorningEdge | We build businesses that execute.",
    description:
      "AI enablement for your people. Software that runs your operation. Two products. One outcome.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: site.url },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MorningEdge",
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/logo.png`,
  description:
    "Business operations firm in Lagos, Nigeria. AI enablement for the workforce, and software that runs the operation on one system.",
  email: site.email,
  telephone: site.phone,
  address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
  founder: { "@type": "Person", name: "Olamilekan E. Wealth" },
  foundingDate: "2022",
  areaServed: { "@type": "Country", name: "Nigeria" },
  sameAs: [site.linkedin],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Dark is the house theme. Apply a saved light choice before first paint.
            Sets a data attribute React does not render, so hydration is unaffected. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var s=localStorage.getItem('me-theme');document.documentElement.setAttribute('data-theme',s==='light'?'light':'dark');}catch(e){}})();",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieNotice />
      </body>
    </html>
  );
}
