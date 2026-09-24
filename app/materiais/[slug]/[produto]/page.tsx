import type { Metadata } from "next";
import { ArrowLeft, BadgeCheck, Images } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/structured-data";
import { WhatsAppIcon } from "@/components/social-icons";
import { categories, getCategory, SITE_URL } from "@/lib/site-data";
import { getProductDetail, toProductSlug } from "@/lib/product-details";
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
    image: detail.image,
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
        { "@context": "https://schema.org", "@type": "Product", name: detail.name, image: `${SITE_URL}${detail.image}`, description: detail.description, category: category.name, url: `${SITE_URL}${path}`, brand: { "@type": "Brand", name: "Gesso Empório" } },
      ]} />

      <main className="product-detail-page">
        <div className="container">
          <Link className="product-back-link" href={`/materiais/${category.slug}`}><ArrowLeft size={17} /> Voltar para {category.name}</Link>

          <div className="product-detail-grid">
            <div className="product-detail-media">
              <Image src={detail.image} alt={detail.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 52vw" />
            </div>

            <div className="product-detail-copy">
              <span className="eyebrow eyebrow-dark"><span /> {category.name}</span>
              <h1>{detail.name}</h1>
              <p>{detail.description}</p>
              <div className="product-options">
                <strong>Opções para consultar</strong>
                {detail.options.map((option) => <div key={option}><BadgeCheck aria-hidden="true" /><span>{option}</span></div>)}
              </div>
              <p className="availability-note">Fotos ilustrativas. Marcas, modelos, medidas e estoque podem variar. Confirme a opção ideal antes de se deslocar.</p>
              <a className="button button-primary" href={buildWhatsAppUrl({ category: `${category.name} — ${detail.name}` })} target="_blank" rel="noreferrer"><WhatsAppIcon width={18} height={18} /> Consultar este material</a>
            </div>
          </div>

          <div className="product-context-card">
            <div><Images aria-hidden="true" /><span><strong>Veja a linha em contexto</strong>Referência visual da categoria {category.name.toLowerCase()}.</span></div>
            <div className="product-context-image"><Image src={category.image} alt={category.imageAlt} fill sizes="(max-width: 900px) 100vw, 42vw" /></div>
          </div>
        </div>
      </main>
    </>
  );
}
