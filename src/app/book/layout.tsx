import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book Olamilekan",
  description:
    "Book Olamilekan Ekundayo for a training or a consultation. Tell us who attends and what should be true afterwards. Consultations run Monday to Friday from 5pm WAT.",
  alternates: { canonical: `${site.url}/book` },
  openGraph: { title: "Book Olamilekan | MorningEdge Systems", url: `${site.url}/book` },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
