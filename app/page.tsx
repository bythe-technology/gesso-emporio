import { ArrowRight, BadgeCheck, MapPin, MessageCircle, PackageCheck, Ruler, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MaterialCard } from "@/components/material-card";
import { ADDRESS, categories, MAPS_URL, testimonials } from "@/lib/site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><span /> O shopping da construção a seco</span>
            <h1>Do piso ao teto,<br /><em>aqui tem.</em></h1>
            <p className="hero-lead">Materiais para construir, reformar e transformar ambientes, com variedade e orientação para você comprar melhor.</p>
            <div className="hero-actions">
              <a className="button button-primary" href={buildWhatsAppUrl()} target="_blank" rel="noreferrer">
                <MessageCircle size={19} /> Falar no WhatsApp
              </a>
              <Link className="text-link" href="/materiais">Ver todos os materiais <ArrowRight size={18} /></Link>
            </div>
            <div className="hero-proof">
              <span><BadgeCheck size={19} /> Venda especializada</span>
              <span><MapPin size={19} /> Registro e Vale do Ribeira</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrap">
              <Image src="/images/loja-equipe-tratada.png" alt="Atendimento e materiais na loja Gesso Empório" fill loading="eager" fetchPriority="high" sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
            <div className="hero-float-card">
              <span className="float-icon"><PackageCheck /></span>
              <div><strong>Lista de materiais?</strong><small>A equipe ajuda você a conferir.</small></div>
            </div>
            <div className="hero-orange-mark" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Diferenciais">
        <div className="container trust-grid">
          <div><strong>8</strong><span>grandes categorias</span></div>
          <div><strong>Do piso ao teto</strong><span>para completar a sua obra</span></div>
          <div><strong>Atendimento próximo</strong><span>para escolher com segurança</span></div>
        </div>
      </section>

      <section className="section materials-section">
        <div className="container">
          <div className="section-heading split-heading">
            <div><span className="eyebrow eyebrow-dark"><span /> Nosso catálogo</span><h2>Tudo o que o seu projeto pede.</h2></div>
            <p>Explore as linhas da loja e fale com a equipe para consultar modelos, medidas, quantidades e disponibilidade.</p>
          </div>
          <div className="materials-grid">
            {categories.map((category, index) => <MaterialCard key={category.slug} category={category} index={index} />)}
          </div>
          <div className="center-action"><Link className="button button-outline" href="/materiais">Explorar catálogo completo <ArrowRight size={18} /></Link></div>
        </div>
      </section>

      <section className="section service-section">
        <div className="container service-grid">
          <div className="service-visual">
            <Image src="/images/loja-equipe-tratada.png" alt="Equipe da Gesso Empório em Registro" fill sizes="(max-width: 900px) 100vw, 45vw" />
            <div className="service-label"><Ruler /><span>Orientação para comprar o material certo</span></div>
          </div>
          <div className="service-copy">
            <span className="eyebrow"><span /> Atendimento de verdade</span>
            <h2>Você traz a ideia.<br />A gente ajuda com os materiais.</h2>
            <p>Conte o que está construindo ou reformando. Nossa equipe ajuda a entender as opções, conferir a lista e encontrar os produtos adequados para cada etapa.</p>
            <ul className="check-list">
              <li><BadgeCheck />Variedade em um só endereço</li>
              <li><BadgeCheck />Atendimento para profissionais e consumidores</li>
              <li><BadgeCheck />Venda de materiais para todo o Vale do Ribeira</li>
            </ul>
            <p className="clarity-note">A Gesso Empório atua exclusivamente com venda de materiais e não realiza instalação.</p>
            <a className="button button-light" href={buildWhatsAppUrl()} target="_blank" rel="noreferrer">Conversar com a equipe <ArrowRight size={18} /></a>
          </div>
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="container">
          <div className="section-heading centered-heading"><span className="eyebrow eyebrow-dark"><span /> Quem compra, recomenda</span><h2>Atendimento que faz diferença.</h2></div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.author} className="testimonial-card">
                <div className="stars" aria-label="5 estrelas">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={18} fill="currentColor" />)}</div>
                <p>“{testimonial.quote}”</p>
                <footer><strong>{testimonial.author}</strong><span>{testimonial.source}</span></footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section location-section">
        <div className="container location-card">
          <div>
            <span className="eyebrow"><span /> Pertinho de você</span>
            <h2>Visite a Gesso Empório em Registro.</h2>
            <p>{ADDRESS}. No galpão em frente à praça da Cecap.</p>
            <div className="hours"><strong>Segunda a sexta</strong><span>7h30 às 18h</span><strong>Sábado</strong><span>7h30 às 13h</span></div>
            <a className="button button-primary" href={MAPS_URL} target="_blank" rel="noreferrer"><MapPin size={18} /> Abrir no mapa</a>
          </div>
          <div className="map-pattern" aria-hidden="true"><span className="map-pin"><MapPin /></span></div>
        </div>
      </section>

      <section className="closing-cta">
        <div className="container closing-inner">
          <div><span className="eyebrow"><span /> Seu projeto começa aqui</span><h2>Envie sua lista e consulte os materiais.</h2></div>
          <a className="button button-light" href={buildWhatsAppUrl()} target="_blank" rel="noreferrer"><MessageCircle size={19} /> Chamar no WhatsApp</a>
        </div>
      </section>
    </>
  );
}
