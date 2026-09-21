import type { Metadata } from "next";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { MaterialCard } from "@/components/material-card";
import { categories } from "@/lib/site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Materiais",
  description: "Conheça as linhas de forros, divisórias, pisos, iluminação, acabamentos, ferramentas, drywall e steel frame da Gesso Empório.",
};

export default function MaterialsPage() {
  return (
    <>
      <section className="page-hero">
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
          <a className="button button-light" href={buildWhatsAppUrl()} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Falar no WhatsApp</a>
        </div>
      </section>
    </>
  );
}
