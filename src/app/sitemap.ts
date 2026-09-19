import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const routes: { path: string; priority: number; freq: "monthly" | "yearly" }[] = [
    { path: "", priority: 1, freq: "monthly" },
    { path: "/ai-edge", priority: 0.9, freq: "monthly" },
    { path: "/operations-core", priority: 0.9, freq: "monthly" },
    { path: "/operations-core/erp", priority: 0.9, freq: "monthly" },
    { path: "/operations-core/ai-integration", priority: 0.9, freq: "monthly" },
    { path: "/adoption-standard", priority: 0.8, freq: "monthly" },
    { path: "/approach", priority: 0.7, freq: "monthly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/contact", priority: 0.7, freq: "yearly" },
    { path: "/legal/privacy", priority: 0.3, freq: "yearly" },
    { path: "/legal/terms", priority: 0.3, freq: "yearly" },
  ];

  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
