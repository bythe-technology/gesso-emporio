import { ArrowRight, BadgeCheck, MapPin, Star } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MaterialCard } from "@/components/material-card";
import { ADDRESS, categories, MAPS_EMBED_URL, MAPS_URL, testimonials } from "@/lib/site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/social-icons";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return (
    <>
      <section className="hero" data-reveal="hero">
        <Image className="hero-background" src="/images/showroom-materiais.png" alt="" fill loading="eager" fetchPriority="high" sizes="100vw" aria-hidden="true" />
        <span className="hero-shade" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><span /> O shopping da construção a seco</span>
            <h1>Do piso ao teto,<br /><em>aqui tem.</em></h1>
            <p className="hero-lead">Materiais para construir, reformar e transformar ambientes, com variedade e orientação para você comprar melhor.</p>
            <div className="hero-actions">
              <a className="button button-primary" href={buildWhatsAppUrl()} target="_blank" rel="noreferrer">
                <WhatsAppIcon width={19} height={19} /> Falar no WhatsApp
              </a>
              <Link className="text-link" href="/materiais">Ver todos os materiais <ArrowRight size={18} /></Link>
            </div>
            <div className="hero-proof">
              <span><BadgeCheck size={19} /> Venda especializada</span>
              <span><MapPin size={19} /> Registro e Vale do Ribeira</span>
            </div>
          </div>

        </div>
      </section>

      <section className="trust-strip" aria-label="Diferenciais" data-reveal="fade">
        <div className="container trust-grid">
          <div><strong>8</strong><span>grandes categorias</span></div>
          <div><strong>Do piso ao teto</strong><span>para completar a sua obra</span></div>
          <div><strong>Atendimento próximo</strong><span>para escolher com segurança</span></div>
        </div>
      </section>

      <section className="section materials-section">
        <div className="container">
          <div className="section-heading split-heading" data-reveal="up">
            <div><span className="eyebrow eyebrow-dark"><span /> Nosso catálogo</span><h2>Tudo o que o seu projeto pede.</h2></div>
            <p>Explore as linhas da loja e fale com a equipe para consultar modelos, medidas, quantidades e disponibilidade.</p>
          </div>
          <div className="materials-grid" data-reveal="stagger">
            {categories.map((category, index) => <div className="reveal-item" key={category.slug}><MaterialCard category={category} index={index} /></div>)}
          </div>
          <div className="center-action"><Link className="button button-outline" href="/materiais">Explorar catálogo completo <ArrowRight size={18} /></Link></div>
        </div>
      </section>

      <section className="section product-showcase-section">
        <div className="container">
          <div className="section-heading split-heading" data-reveal="up">
            <div><span className="eyebrow eyebrow-dark"><span /> Destaques da loja</span><h2>Materiais que fazem a obra avançar.</h2></div>
            <p>Conheça algumas das linhas divulgadas pela Gesso Empório. Consulte modelos, medidas e disponibilidade pelo WhatsApp.</p>
          </div>
          <div className="product-showcase-grid" data-reveal="stagger">
            <Link className="showcase-card showcase-card-wide" href="/materiais/gesso-e-drywall">
              <Image src="/images/materiais-drywall.webp" alt="Estoque de placas de drywall, perfis e massas para construção a seco" fill sizes="(max-width: 760px) 100vw, 55vw" />
              <span className="showcase-overlay"><small>Gesso e drywall</small><strong>Placas, perfis e complementos</strong><em>Conhecer linha <ArrowRight /></em></span>
            </Link>
            <Link className="showcase-card" href="/materiais/pisos-e-decks">
              <Image src="/images/materiais-pisos-acabamentos.webp" alt="Mostruário de pisos, revestimentos e deck WPC" fill sizes="(max-width: 760px) 100vw, 28vw" />
              <span className="showcase-overlay"><small>Pisos e decks</small><strong>Acabamentos para cada ambiente</strong><em>Conhecer linha <ArrowRight /></em></span>
            </Link>
            <Link className="showcase-card" href="/materiais/steel-frame">
              <Image src="/images/materiais-forros-divisorias.webp" alt="Sistemas de forros, divisórias e perfis para construção a seco" fill sizes="(max-width: 760px) 100vw, 28vw" />
              <span className="showcase-overlay"><small>Construção a seco</small><strong>Forros, divisórias e estruturas</strong><em>Conhecer linha <ArrowRight /></em></span>
            </Link>
          </div>
          <p className="image-disclaimer">Imagens de produtos e aplicações ilustrativas. A Gesso Empório comercializa os materiais e não executa instalação.</p>
        </div>
      </section>

      <section className="service-section" data-reveal="fade">
        <Image className="service-background" src="/images/caminhao-gesso-emporio-tratado.webp" alt="Caminhão de entregas da Gesso Empório em Registro, São Paulo" fill sizes="100vw" />
        <span className="service-shade" aria-hidden="true" />
        <div className="container service-grid">
          <div className="service-copy" data-reveal="up">
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
          <div className="storefront-brand" aria-label="Gesso Empório, loja física em Registro" data-reveal="up">
            <Image src="/images/logo-gesso-emporio.png" alt="Gesso Empório" width={310} height={145} />
            <span><MapPin size={18} /> Loja física em Registro/SP</span>
          </div>
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="container">
          <div className="section-heading centered-heading" data-reveal="up"><span className="eyebrow eyebrow-dark"><span /> Quem compra, recomenda</span><h2>Atendimento que faz diferença.</h2><a className="google-rating" href={MAPS_URL} target="_blank" rel="noreferrer"><strong>4,7</strong><span className="stars" aria-hidden="true">★★★★★</span><span>26 avaliações no Google</span></a></div>
          <div className="testimonials-grid" data-reveal="stagger">
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
        <div className="container location-card" data-reveal="up">
          <div>
            <span className="eyebrow"><span /> Pertinho de você</span>
            <h2>Visite a Gesso Empório em Registro.</h2>
            <p>{ADDRESS}. No galpão em frente à praça da Cecap.</p>
            <div className="hours"><strong>Segunda a sexta</strong><span>7h30 às 18h</span><strong>Sábado</strong><span>7h30 às 13h</span></div>
            <a className="button button-primary" href={MAPS_URL} target="_blank" rel="noreferrer"><MapPin size={18} /> Abrir no mapa</a>
          </div>
          <div className="map-frame"><iframe src={MAPS_EMBED_URL} title="Mapa da Gesso Empório em Registro" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
        </div>
      </section>

      <section className="closing-cta">
        <div className="container closing-inner" data-reveal="up">
          <div><span className="eyebrow"><span /> Seu projeto começa aqui</span><h2>Envie sua lista e consulte os materiais.</h2></div>
          <a className="button button-light" href={buildWhatsAppUrl()} target="_blank" rel="noreferrer"><WhatsAppIcon width={19} height={19} /> Chamar no WhatsApp</a>
        </div>
      </section>
    </>
  );
}

