import type { MetadataRoute } from "next";
import { categories, SITE_URL } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-21T00:00:00-03:00");
  const pages = [{ path: "", priority: 1 }, { path: "/materiais", priority: 0.9 }, { path: "/sobre", priority: 0.7 }, { path: "/contato", priority: 0.8 }];
  return [...pages.map(({ path, priority }) => ({ url: `${SITE_URL}${path}`, lastModified, changeFrequency: "monthly" as const, priority })), ...categories.map((category) => ({ url: `${SITE_URL}/materiais/${category.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 }))];
}
