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
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Gesso Empório",
    title: "Gesso Empório — O shopping da construção a seco",
    description: "Variedade, orientação e materiais do piso ao teto em Registro/SP.",
    images: [{ url: "/images/loja-equipe-tratada.png", width: 1536, height: 960, alt: "Equipe e loja Gesso Empório" }],
  },
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
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua São Nicolau, 25 — Jardim São Nicolau",
      addressLocality: "Registro",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    areaServed: "Vale do Ribeira",
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
