import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, BadgeCheck, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/lib/site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/social-icons";
import { StructuredData } from "@/components/structured-data";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site-data";
import { toProductSlug } from "@/lib/product-details";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory((await params).slug);
  if (!category) return {};
  return createPageMetadata({
    title: `${category.name} em Registro/SP`,
    description: `${category.description} Consulte opções, medidas e disponibilidade na Gesso Empório em Registro/SP.`,
    path: `/materiais/${category.slug}`,
    keywords: [category.name, `${category.name} Registro SP`, `${category.name} Vale do Ribeira`, ...category.items.slice(0, 4)],
    image: category.image,
  });
}

export default async function MaterialCategoryPage({ params }: Props) {
  const category = getCategory((await params).slug);
  if (!category) notFound();
  const Icon = category.icon;
  const otherCategories = categories.filter((item) => item.slug !== category.slug).slice(0, 3);

  return (
    <>
      <StructuredData data={[
        createBreadcrumbSchema([{ name: "Início", path: "/" }, { name: "Materiais", path: "/materiais" }, { name: category.name, path: `/materiais/${category.slug}` }]),
        { "@context": "https://schema.org", "@type": "CollectionPage", name: `${category.name} em Registro/SP`, url: `${SITE_URL}/materiais/${category.slug}`, description: category.description, isPartOf: { "@id": `${SITE_URL}/#website` }, about: category.items.map((item) => ({ "@type": "Thing", name: item })) },
      ]} />
      <section className="category-hero">
        <Image className="category-hero-background" src={category.image} alt={category.imageAlt} fill loading="eager" fetchPriority="high" sizes="100vw" />
        <span className="category-hero-shade" aria-hidden="true" />
        <div className="container category-hero-grid">
          <div className="category-copy">
            <Link className="back-link" href="/materiais"><ArrowLeft size={17} /> Todos os materiais</Link>
            <span className="category-icon-large"><Icon /></span>
            <span className="eyebrow"><span /> {category.eyebrow}</span>
            <h1>{category.name}</h1>
            <p>{category.intro}</p>
            <a className="button button-primary" href={buildWhatsAppUrl({ category: category.name })} target="_blank" rel="noreferrer"><WhatsAppIcon width={18} height={18} /> Consultar no WhatsApp</a>
          </div>
        </div>
      </section>

      <section className="section category-details">
        <div className="container category-details-grid">
          <div><span className="eyebrow eyebrow-dark"><span /> Linhas disponíveis</span><h2>Encontre o material que combina com a sua necessidade.</h2><p>As opções podem variar em medidas, cores, modelos e estoque. Consulte nossa equipe antes de se deslocar.</p></div>
          <div className="product-list">{category.items.map((item, index) => <Link key={item} href={`/materiais/${category.slug}/${toProductSlug(item)}`} target="_blank" rel="noopener noreferrer" aria-label={`Conhecer fotos e opções de ${item} em nova aba`}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong><small>Ver fotos e modelos</small><ExternalLink aria-hidden="true" /></Link>)}</div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="container benefits-grid">{category.benefits.map((benefit) => <div key={benefit}><BadgeCheck /><span>{benefit}</span></div>)}</div>
      </section>

      <section className="section other-materials">
        <div className="container">
          <div className="section-heading split-heading"><div><span className="eyebrow eyebrow-dark"><span /> Continue explorando</span><h2>Outras linhas da loja.</h2></div><Link className="text-link dark" href="/materiais">Ver todas <ArrowRight size={18} /></Link></div>
          <div className="simple-links">{otherCategories.map((item) => { const OtherIcon = item.icon; return <Link key={item.slug} href={`/materiais/${item.slug}`}><OtherIcon /><strong>{item.name}</strong><ArrowRight /></Link>; })}</div>
        </div>
      </section>
    </>
  );
}
