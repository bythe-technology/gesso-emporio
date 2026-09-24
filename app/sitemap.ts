import type { MetadataRoute } from "next";
import { categories, SITE_URL } from "@/lib/site-data";
import { toProductSlug } from "@/lib/product-details";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-21T00:00:00-03:00");
  const pages = [{ path: "", priority: 1 }, { path: "/materiais", priority: 0.9 }, { path: "/sobre", priority: 0.7 }, { path: "/contato", priority: 0.8 }];
  const productPages = categories.flatMap((category) => category.items.map((item) => ({ url: `${SITE_URL}/materiais/${category.slug}/${toProductSlug(item)}`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 })));
  return [...pages.map(({ path, priority }) => ({ url: `${SITE_URL}${path}`, lastModified, changeFrequency: "monthly" as const, priority })), ...categories.map((category) => ({ url: `${SITE_URL}/materiais/${category.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 })), ...productPages];
}
