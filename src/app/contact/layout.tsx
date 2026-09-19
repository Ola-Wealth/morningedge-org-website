import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a diagnostic with MorningEdge. Tell us about your company and what is breaking. Not every enquiry becomes an engagement, and we will say so plainly.",
  alternates: { canonical: `${site.url}/contact` },
  openGraph: { title: "Contact | MorningEdge", url: `${site.url}/contact` },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
