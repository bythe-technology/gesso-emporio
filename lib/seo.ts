import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-data";

const BRAND_NAME = "Gesso Empório";
const DEFAULT_SOCIAL_IMAGE = "/opengraph-image";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
};

export function createPageMetadata({ title, description, path, keywords = [], image = DEFAULT_SOCIAL_IMAGE }: PageMetadataInput): Metadata {
  const canonical = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical, languages: { "pt-BR": canonical } },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: canonical,
      siteName: BRAND_NAME,
      title: `${title} | ${BRAND_NAME}`,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: `${title} — ${BRAND_NAME}` }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${BRAND_NAME}`, description, images: [image] },
  };
}

export function createBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  };
}
