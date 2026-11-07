import type { MetadataRoute } from "next";
import { guides } from "./data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://bestai.website";
  return [{ url: base, lastModified: new Date("2026-11-07"), changeFrequency: "weekly", priority: 1 }, ...guides.map((g) => ({ url: `${base}/articles/${g.slug}`, lastModified: new Date("2026-11-07"), changeFrequency: "monthly" as const, priority: 0.8 })), { url: `${base}/privacy`, lastModified: new Date("2026-11-07"), changeFrequency: "yearly", priority: 0.2 }];
}
