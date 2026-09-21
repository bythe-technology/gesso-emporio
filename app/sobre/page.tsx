import type { Metadata } from "next";
import { BadgeCheck, MapPin, PackageCheck, Users } from "lucide-react";
import Image from "next/image";
import { ADDRESS, MAPS_EMBED_URL, MAPS_URL } from "@/lib/site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/social-icons";
import { StructuredData } from "@/components/structured-data";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({ title: "A loja de construção a seco em Registro", description: "Conheça a Gesso Empório: materiais para construção a seco, drywall, acabamentos, pisos e iluminação em Registro e no Vale do Ribeira.", path: "/sobre", keywords: ["Gesso Empório Registro", "loja construção a seco Registro", "drywall Vale do Ribeira"] });

export default function AboutPage() {
  return (
    <>
      <StructuredData data={createBreadcrumbSchema([{ name: "Início", path: "/" }, { name: "A loja", path: "/sobre" }])} />
      <section className="page-hero about-hero"><Image className="page-hero-background" src="/images/fachada-gesso-emporio-tratada.webp" alt="Fachada da Gesso Empório em Registro" fill priority sizes="100vw" /><span className="page-hero-shade" aria-hidden="true" /><div className="container page-hero-inner"><span className="eyebrow"><span /> A Gesso Empório</span><h1>Uma loja feita para<br /><em>resolver a sua obra.</em></h1><p>Variedade, orientação e atendimento próximo para profissionais e consumidores de Registro e de todo o Vale do Ribeira.</p></div></section>
      <section className="section story-section">
        <div className="container story-grid">
          <div className="story-image"><Image src="/images/showroom-materiais.png" alt="Showroom da Gesso Empório com materiais para construção a seco" fill sizes="(max-width: 900px) 100vw, 48vw" /></div>
          <div className="story-copy"><span className="eyebrow eyebrow-dark"><span /> Nosso propósito</span><h2>Facilitar cada escolha, do piso ao teto.</h2><p>A Gesso Empório reúne materiais para construção a seco, reforma e acabamento em um só endereço. A proposta é tornar a compra mais simples: você explica o projeto, compara as opções e sai com uma escolha mais segura.</p><p>Atendemos quem trabalha todos os dias com obras e também quem está reformando pela primeira vez.</p><div className="clarity-box"><PackageCheck /><div><strong>Atuação transparente</strong><span>Somos uma loja de materiais. Não executamos serviços de instalação.</span></div></div></div>
        </div>
      </section>
      <section className="values-section"><div className="container values-grid"><div><Users /><strong>Atendimento próximo</strong><span>Conversa clara para entender sua necessidade.</span></div><div><BadgeCheck /><strong>Escolha orientada</strong><span>Ajuda para comparar aplicações e características.</span></div><div><PackageCheck /><strong>Variedade útil</strong><span>Linhas que acompanham diferentes etapas da obra.</span></div></div></section>
      <section className="section"><div className="container location-card location-card-light"><div><span className="eyebrow eyebrow-dark"><span /> Nossa loja</span><h2>Esperamos você em Registro.</h2><p>{ADDRESS}. No galpão em frente à praça da Cecap.</p><div className="hours"><strong>Segunda a sexta</strong><span>7h30 às 18h</span><strong>Sábado</strong><span>7h30 às 13h</span></div><div className="inline-actions"><a className="button button-primary" href={MAPS_URL} target="_blank" rel="noreferrer"><MapPin size={18} /> Ver rota</a><a className="button button-outline" href={buildWhatsAppUrl()} target="_blank" rel="noreferrer"><WhatsAppIcon width={18} height={18} /> WhatsApp</a></div></div><div className="map-frame"><iframe src={MAPS_EMBED_URL} title="Mapa da Gesso Empório em Registro" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></div></section>
    </>
  );
}

