import type { MaterialCategory } from "@/lib/site-data";

export type ProductDetail = {
  name: string;
  slug: string;
  description: string;
  image: string;
  imageAlt: string;
  options: string[];
};

export function toProductSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const drywallDetails: Record<string, Omit<ProductDetail, "name" | "slug">> = {
  gesso: {
    description: "Gesso para revestimentos, reparos e acabamentos em sistemas de construção a seco.",
    image: "/images/produto-gesso.webp",
    imageAlt: "Gesso em pó, saco e amostra de acabamento branco",
    options: ["Tipos para revestimento e acabamento", "Tempos de trabalho conforme a aplicação", "Embalagens e rendimento sob consulta"],
  },
  "placas-de-drywall": {
    description: "Placas para paredes, forros e fechamentos internos, escolhidas conforme o ambiente e a necessidade do projeto.",
    image: "/images/catalogo-gesso-drywall.webp",
    imageAlt: "Placas de drywall branca, verde e rosa apoiadas em perfis metálicos",
    options: ["Placa ST para áreas secas", "Placa RU resistente à umidade", "Placa RF resistente ao fogo"],
  },
  massas: {
    description: "Massas para tratamento de juntas, acabamento e preparação de superfícies em drywall.",
    image: "/images/produto-massas.webp",
    imageAlt: "Baldes de massa para drywall, desempenadeira e amostra de acabamento",
    options: ["Massa para tratamento de juntas", "Opções prontas para uso", "Embalagens e rendimento sob consulta"],
  },
  perfis: {
    description: "Perfis galvanizados que formam a estrutura de paredes, forros e revestimentos em drywall.",
    image: "/images/produto-perfis.webp",
    imageAlt: "Conjunto de perfis galvanizados para sistemas de drywall",
    options: ["Guias e montantes", "Cantoneiras e perfis de acabamento", "Canais e perfis para forro"],
  },
  "complementos-de-instalacao": {
    description: "Itens para fixação, tratamento de juntas e acabamento dos sistemas de construção a seco.",
    image: "/images/produto-complementos.webp",
    imageAlt: "Fitas, parafusos, buchas e cantoneira para instalação de drywall",
    options: ["Fitas de papel e teladas", "Parafusos, buchas e fixadores", "Cantoneiras e acessórios de acabamento"],
  },
};

export function getProductDetail(category: MaterialCategory, productSlug: string): ProductDetail | undefined {
  const name = category.items.find((item) => toProductSlug(item) === productSlug);
  if (!name) return undefined;

  const curated = category.slug === "gesso-e-drywall" ? drywallDetails[productSlug] : undefined;
  return {
    name,
    slug: productSlug,
    description: curated?.description ?? `${name}: conheça as opções desta linha e confirme modelos, medidas e aplicações com a equipe da Gesso Empório.`,
    image: curated?.image ?? category.productImageUrl,
    imageAlt: curated?.imageAlt ?? category.productImageAlt,
    options: curated?.options ?? [
      "Modelos e medidas para diferentes aplicações",
      "Cores e acabamentos conforme a linha",
      "Disponibilidade e quantidade sob consulta",
    ],
  };
}
