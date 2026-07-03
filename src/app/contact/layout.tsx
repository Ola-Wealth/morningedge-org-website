import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start an engagement with MorningEdge Systems. Tell us about your organization and the challenge you are facing. We respond within 48 business hours.",
  alternates: { canonical: "https://morningedgesystems.com/contact" },
  openGraph: {
    title: "Start an Engagement | MorningEdge Systems",
    description:
      "The right engagement starts with the right conversation. Reach out to MorningEdge Systems — we will tell you how we can help.",
    url: "https://morningedgesystems.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
