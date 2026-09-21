import type { MetadataRoute } from "next";
import { categories, SITE_URL } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/materiais", "/sobre", "/contato", "/privacidade"];
  return [...pages.map((path) => ({ url: `${SITE_URL}${path}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: path === "" ? 1 : 0.8 })), ...categories.map((category) => ({ url: `${SITE_URL}/materiais/${category.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 }))];
}
