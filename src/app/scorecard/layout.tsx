import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Copilot Adoption Scorecard",
  description:
    "Your staff already have the tool. Twelve questions show how much of Microsoft 365 Copilot your organisation actually uses, where the risk sits, and the one area to fix first.",
  alternates: { canonical: `${site.url}/scorecard` },
  openGraph: { title: "Copilot Adoption Scorecard | MorningEdge Systems", url: `${site.url}/scorecard` },
};

export default function ScorecardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
