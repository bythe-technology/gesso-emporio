import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/structured-data";
import { WhatsAppIcon } from "@/components/social-icons";
import { categories, getCategory, SITE_URL } from "@/lib/site-data";
import { getProductDetail, toProductSlug, type ProductGroup } from "@/lib/product-details";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string; produto: string }> };

export function generateStaticParams() {
  return categories.flatMap((category) => category.items.map((item) => ({ slug: category.slug, produto: toProductSlug(item) })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, produto } = await params;
  const category = getCategory(slug);
  const detail = category ? getProductDetail(category, produto) : undefined;
  if (!category || !detail) return {};

  return createPageMetadata({
    title: `${detail.name} em Registro/SP`,
    description: `${detail.description} Consulte modelos e disponibilidade na Gesso Empório.`,
    path: `/materiais/${category.slug}/${detail.slug}`,
    keywords: [detail.name, category.name, `${detail.name} Registro SP`, `${detail.name} Vale do Ribeira`],
    image: detail.gallery[0].src,
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug, produto } = await params;
  const category = getCategory(slug);
  const detail = category ? getProductDetail(category, produto) : undefined;
  if (!category || !detail) notFound();

  const path = `/materiais/${category.slug}/${detail.slug}`;

  return (
    <>
      <StructuredData data={[
        createBreadcrumbSchema([
          { name: "Início", path: "/" },
          { name: "Materiais", path: "/materiais" },
          { name: category.name, path: `/materiais/${category.slug}` },
          { name: detail.name, path },
        ]),
        { "@context": "https://schema.org", "@type": "Product", name: detail.name, image: detail.gallery.map(({ src }) => `${SITE_URL}${src}`), description: detail.description, category: category.name, url: `${SITE_URL}${path}`, brand: { "@type": "Brand", name: "Gesso Empório" } },
      ]} />

      <main className="product-detail-page">
        <div className="container">
          <Link className="product-back-link" href={`/materiais/${category.slug}`}><ArrowLeft size={17} /> Voltar para {category.name}</Link>

          <div className="product-detail-grid">
            <div className="product-gallery">
              {detail.gallery.map((item, index) => (
                <div className={index === 0 ? "product-gallery-main" : "product-gallery-secondary"} key={item.src}>
                  <Image src={item.src} alt={item.alt} fill priority={index < 2} sizes="(max-width: 900px) 100vw, 52vw" />
                </div>
              ))}
            </div>

            <div className="product-detail-copy">
              <span className="eyebrow eyebrow-dark"><span /> {category.name}</span>
              <h1>{detail.name}</h1>
              <p>{detail.description}</p>
              <div className="product-options">
                <strong>Opções para consultar</strong>
                {detail.options.map((option) => <div key={option}><BadgeCheck aria-hidden="true" /><span>{option}</span></div>)}
              </div>
              <div className="product-applications"><strong>Aplicações</strong><div>{detail.applications.map((item) => <span key={item}>{item}</span>)}</div></div>
              <p className="availability-note">{detail.availabilityNote}</p>
              <a className="button button-primary" href={buildWhatsAppUrl({ category: `${category.name} — ${detail.name}` })} target="_blank" rel="noreferrer"><WhatsAppIcon width={18} height={18} /> Consultar este material</a>
            </div>
          </div>

          {detail.variants.length > 0 && <Variants detail={detail} />}

          <section className="related-products" aria-labelledby="related-title">
            <span className="eyebrow eyebrow-dark"><span /> Continue explorando</span>
            <h2 id="related-title">Outros materiais de {category.name.toLowerCase()}</h2>
            <div className="related-products-grid">
              {category.items.filter((item) => toProductSlug(item) !== detail.slug).slice(0, 3).map((item) => {
                const related = getProductDetail(category, toProductSlug(item));
                if (!related) return null;
                return <Link href={`/materiais/${category.slug}/${related.slug}`} key={related.slug}><div><Image src={related.gallery[0].src} alt={related.gallery[0].alt} fill sizes="(max-width: 760px) 100vw, 30vw" /></div><span><strong>{related.name}</strong><small>Conhecer material <ArrowRight size={15} /></small></span></Link>;
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

function Variants({ detail }: { detail: NonNullable<ReturnType<typeof getProductDetail>> }) {
  const groups = [...new Set(detail.variants.map(({ group }) => group).filter(Boolean))] as ProductGroup[];
  const sections = groups.length ? groups.map((group) => ({ group, variants: detail.variants.filter((item) => item.group === group) })) : [{ group: undefined, variants: detail.variants }];
  return <section className="variants-section" aria-labelledby="variants-title">
    <div className="variants-heading"><div><span className="eyebrow eyebrow-dark"><span /> Modelos e variações</span><h2 id="variants-title">Encontre o material da sua lista.</h2></div><p>Fotos padronizadas para facilitar a identificação. Confirme compatibilidade e estoque antes da compra.</p></div>
    {groups.length > 0 && <nav className="variant-group-nav" aria-label="Grupos de complementos">{groups.map((group) => <a href={`#${toProductSlug(group)}`} key={group}>{group}</a>)}</nav>}
    {sections.map(({ group, variants }) => <div className="variant-group" id={group ? toProductSlug(group) : undefined} key={group ?? "all"}>{group && <h3>{group}</h3>}<div className="variant-grid">{variants.map((variant) => <article className="variant-card" key={variant.name}><div className="variant-image"><Image src={variant.image.src} alt={variant.image.alt} fill sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 30vw" /></div><div className="variant-copy"><h4>{variant.name}</h4>{variant.measures && <div className="measure-list">{variant.measures.map((measure) => <span key={measure}>{measure}</span>)}</div>}<p>{variant.use}</p><a href={buildWhatsAppUrl({ category: variant.name })} target="_blank" rel="noreferrer">Consultar <ArrowRight size={15} /></a></div></article>)}</div></div>)}
  </section>;
}
