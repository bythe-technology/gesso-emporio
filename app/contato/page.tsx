import type { Metadata } from "next";
import { Clock3, MapPin } from "lucide-react";
import Image from "next/image";
import { QuoteForm } from "@/components/quote-form";
import { ADDRESS, INSTAGRAM_URL, MAPS_EMBED_URL, MAPS_URL, PHONE_LABEL } from "@/lib/site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { InstagramIcon, WhatsAppIcon } from "@/components/social-icons";

export const metadata: Metadata = { title: "Contato", description: "Fale com a Gesso Empório, solicite materiais pelo WhatsApp e encontre a loja em Registro/SP.", alternates: { canonical: "/contato" } };

export default function ContactPage() {
  return (
    <>
      <section className="page-hero contact-hero"><Image className="page-hero-background" src="/images/materiais-iluminacao-ferramentas.webp" alt="Materiais e ferramentas disponíveis na Gesso Empório" fill priority sizes="100vw" /><span className="page-hero-shade" aria-hidden="true" /><div className="container page-hero-inner"><span className="eyebrow"><span /> Fale com a equipe</span><h1>Conte o que<br /><em>sua obra precisa.</em></h1><p>Envie sua lista, tire dúvidas sobre as linhas e consulte a disponibilidade dos materiais.</p></div></section>
      <section className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-info">
            <span className="eyebrow eyebrow-dark"><span /> Contato e visita</span><h2>Escolha o canal mais fácil para você.</h2>
            <div className="contact-cards">
              <a href={buildWhatsAppUrl()} target="_blank" rel="noreferrer"><span><WhatsAppIcon /></span><div><small>WhatsApp</small><strong>{PHONE_LABEL}</strong></div></a>
              <a href={MAPS_URL} target="_blank" rel="noreferrer"><span><MapPin /></span><div><small>Endereço</small><strong>{ADDRESS}</strong></div></a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><span><InstagramIcon /></span><div><small>Instagram</small><strong>@gessoemporio</strong></div></a>
            </div>
            <div className="opening-hours"><Clock3 /><div><strong>Horário de atendimento</strong><p>Segunda a sexta, das 7h30 às 18h<br />Sábado, das 7h30 às 13h<br />Domingo, fechado</p></div></div>
          </div>
          <div className="form-panel"><span>Pedido rápido</span><h2>Monte sua mensagem.</h2><p>Preencha os dados abaixo e continue a conversa no WhatsApp.</p><QuoteForm /></div>
        </div>
      </section>
      <section className="section contact-map-section"><div className="container"><div className="map-frame map-frame-wide"><iframe src={MAPS_EMBED_URL} title="Mapa da Gesso Empório em Registro" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></div></section>
    </>
  );
}

