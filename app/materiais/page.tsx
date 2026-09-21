import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MaterialCard } from "@/components/material-card";
import { categories } from "@/lib/site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/social-icons";
import { StructuredData } from "@/components/structured-data";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  title: "Materiais para construção, reforma e acabamento",
  description: "Conheça as linhas de forros, divisórias, pisos, iluminação, acabamentos, ferramentas, drywall e steel frame da Gesso Empório.",
  path: "/materiais",
  keywords: ["materiais drywall", "forros e divisórias", "pisos e decks", "steel frame", "materiais de construção Registro SP"],
});

export default function MaterialsPage() {
  return (
    <>
      <StructuredData data={[
        createBreadcrumbSchema([{ name: "Início", path: "/" }, { name: "Materiais", path: "/materiais" }]),
        { "@context": "https://schema.org", "@type": "CollectionPage", name: "Materiais da Gesso Empório", url: `${SITE_URL}/materiais`, mainEntity: { "@type": "ItemList", itemListElement: categories.map((category, index) => ({ "@type": "ListItem", position: index + 1, name: category.name, url: `${SITE_URL}/materiais/${category.slug}` })) } },
      ]} />
      <section className="page-hero">
        <Image className="page-hero-background" src="/images/materiais-drywall.webp" alt="Materiais para drywall e construção a seco" fill priority sizes="100vw" />
        <span className="page-hero-shade" aria-hidden="true" />
        <div className="container page-hero-inner">
          <span className="eyebrow"><span /> Materiais</span>
          <h1>O projeto inteiro<br /><em>em um só lugar.</em></h1>
          <p>Escolha uma categoria para conhecer as principais linhas. Para modelos, medidas e disponibilidade, fale diretamente com nossa equipe.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="materials-grid materials-grid-page">{categories.map((category, index) => <MaterialCard key={category.slug} category={category} index={index} />)}</div>
        </div>
      </section>
      <section className="section compact-cta-section">
        <div className="container compact-cta">
          <div><span>Não encontrou o que procura?</span><h2>Envie sua lista para a equipe.</h2><p>Consultamos as opções disponíveis e ajudamos você a organizar o pedido.</p></div>
          <a className="button button-light" href={buildWhatsAppUrl()} target="_blank" rel="noreferrer"><WhatsAppIcon width={18} height={18} /> Falar no WhatsApp</a>
        </div>
      </section>
    </>
  );
}

