import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ADDRESS, PHONE_LABEL, SITE_URL } from "@/lib/site-data";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Gesso Empório | Materiais para construção a seco em Registro/SP", template: "%s | Gesso Empório" },
  description: "Materiais para drywall, forros, divisórias, pisos, iluminação, acabamentos e steel frame em Registro/SP. Atendimento para todo o Vale do Ribeira.",
  applicationName: "Gesso Empório",
  category: "Construção e materiais",
  keywords: ["drywall Registro SP", "gesso Registro", "forro PVC Vale do Ribeira", "steel frame", "piso vinílico", "materiais construção a seco"],
  icons: {
    icon: [{ url: "/favicon-32.png", type: "image/png", sizes: "32x32" }],
    shortcut: "/favicon-32.png",
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Gesso Empório",
    title: "Gesso Empório — O shopping da construção a seco",
    description: "Variedade, orientação e materiais do piso ao teto em Registro/SP.",
    images: [{ url: "/images/showroom-materiais.png", width: 1536, height: 960, alt: "Showroom de materiais para construção a seco" }],
  },
  twitter: { card: "summary_large_image", title: "Gesso Empório — O shopping da construção a seco", description: "Materiais do piso ao teto em Registro/SP.", images: ["/images/showroom-materiais.png"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Gesso Empório",
    url: SITE_URL,
    telephone: PHONE_LABEL,
    image: `${SITE_URL}/images/logo-gesso-emporio.png`,
    logo: `${SITE_URL}/images/logo-gesso-emporio.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua São Nicolau, 25 — Jardim São Nicolau",
      addressLocality: "Registro",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    areaServed: "Vale do Ribeira",
    sameAs: ["https://www.instagram.com/gessoemporio/"],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:30", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "07:30", closes: "13:00" },
    ],
    priceRange: "$$",
    description: "Loja de materiais para construção a seco, acabamentos, pisos e iluminação.",
  };

  return (
    <html lang="pt-BR" className={manrope.variable} data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        <SiteHeader />
        <main id="conteudo">{children}</main>
        <SiteFooter />
        <WhatsAppFloat />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </body>
    </html>
  );
}
