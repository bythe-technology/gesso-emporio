import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ADDRESS, PHONE_LABEL, SITE_URL } from "@/lib/site-data";
import { StructuredData } from "@/components/structured-data";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Gesso Empório | Materiais para construção a seco em Registro/SP", template: "%s | Gesso Empório" },
  description: "Materiais para drywall, forros, divisórias, pisos, iluminação, acabamentos e steel frame em Registro/SP. Atendimento para todo o Vale do Ribeira.",
  applicationName: "Gesso Empório",
  authors: [{ name: "Gesso Empório", url: SITE_URL }],
  creator: "Gesso Empório",
  publisher: "Gesso Empório",
  category: "Construção e materiais",
  keywords: ["drywall Registro SP", "gesso Registro", "forro PVC Vale do Ribeira", "steel frame", "piso vinílico", "materiais construção a seco"],
  icons: {
    icon: [{ url: "/favicon-32.png", type: "image/png", sizes: "32x32" }],
    shortcut: "/favicon-32.png",
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  alternates: { canonical: SITE_URL, languages: { "pt-BR": SITE_URL } },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Gesso Empório",
    title: "Gesso Empório — O shopping da construção a seco",
    description: "Variedade, orientação e materiais do piso ao teto em Registro/SP.",
    url: SITE_URL,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Gesso Empório — materiais para construção a seco em Registro/SP" }],
  },
  twitter: { card: "summary_large_image", title: "Gesso Empório — O shopping da construção a seco", description: "Materiais do piso ao teto em Registro/SP.", images: ["/opengraph-image"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  formatDetection: { email: false, address: false, telephone: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const businessId = `${SITE_URL}/#business`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: "Gesso Empório", inLanguage: "pt-BR", publisher: { "@id": businessId } },
      {
        "@type": ["HomeAndConstructionBusiness", "Store"], "@id": businessId, name: "Gesso Empório", url: SITE_URL, telephone: PHONE_LABEL,
        image: `${SITE_URL}/images/showroom-materiais.png`, logo: `${SITE_URL}/images/logo-gesso-emporio.png`, priceRange: "$$",
        description: "Loja de materiais para construção a seco, drywall, forros, divisórias, pisos, iluminação, acabamentos e steel frame em Registro/SP.",
        address: { "@type": "PostalAddress", streetAddress: "Rua São Nicolau, 25 — Jardim São Nicolau", addressLocality: "Registro", addressRegion: "SP", addressCountry: "BR" },
        areaServed: [{ "@type": "City", name: "Registro" }, { "@type": "AdministrativeArea", name: "Vale do Ribeira" }],
        hasMap: "https://www.google.com/maps/search/?api=1&query=Gesso+Emp%C3%B3rio+Registro+SP", sameAs: ["https://www.instagram.com/gessoemporio/"],
        contactPoint: { "@type": "ContactPoint", telephone: PHONE_LABEL, contactType: "sales", areaServed: "BR", availableLanguage: "Portuguese" },
        openingHoursSpecification: [
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:30", closes: "18:00" },
          { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "07:30", closes: "13:00" },
        ],
        knowsAbout: ["Drywall", "Gesso", "Forro de PVC", "Divisórias", "Pisos vinílicos", "Deck WPC", "Iluminação", "Steel frame"],
      },
    ],
  };

  return (
    <html lang="pt-BR" className={manrope.variable} data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        <SiteHeader />
        <main id="conteudo">{children}</main>
        <SiteFooter />
        <WhatsAppFloat />
        <StructuredData data={schema} />
      </body>
    </html>
  );
}
