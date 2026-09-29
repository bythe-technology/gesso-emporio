import type { MaterialCategory } from "@/lib/site-data";

export type ProductMedia = { src: string; alt: string };
export type ProductGroup = "Fixação" | "Suspensão F530" | "Juntas e cantos" | "Fincapinos";
export type ProductVariant = { name: string; image: ProductMedia; measures?: string[]; use: string; group?: ProductGroup };
export type ProductDetail = { name: string; slug: string; description: string; gallery: ProductMedia[]; options: string[]; applications: string[]; variants: ProductVariant[]; availabilityNote: string };
export type FeaturedPromotion = { title: string; eyebrow: string; description: string; image: ProductMedia; href: string; cta: string; wide?: boolean };

export function toProductSlug(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const media = (src: string, alt: string): ProductMedia => ({ src, alt });
const availability = "Marcas, medidas e disponibilidade podem variar. Confirme o estoque atual com a equipe pelo WhatsApp.";

const drywallDetails: Record<string, Omit<ProductDetail, "name" | "slug">> = {
  gesso: {
    description: "Gesso em pó para revestimento, fundição e colagem, com opções para diferentes etapas da obra.",
    gallery: [media("/images/produto-gesso-40kg.webp", "Saco de papel de gesso para revestimento e fundição de 40 kg"), media("/images/produto-gesso-cola.webp", "Embalagens de gesso cola de 5 kg e 20 kg")],
    options: ["Gesso para revestimento e fundição em saco de 40 kg", "Gesso cola em embalagens de 5 kg e 20 kg", "Rendimento e preparo conforme o produto"],
    applications: ["Revestimentos internos", "Fundição de peças", "Colagem de elementos de gesso"],
    variants: [
      { name: "Gesso para revestimento e fundição", image: media("/images/produto-gesso-40kg.webp", "Saco de gesso para revestimento e fundição"), measures: ["40 kg"], use: "Revestimentos, moldagens e reparos em ambientes internos." },
      { name: "Gesso cola", image: media("/images/produto-gesso-cola.webp", "Sacos de gesso cola em dois tamanhos"), measures: ["5 kg", "20 kg"], use: "Fixação e colagem de elementos pré-moldados de gesso." },
    ], availabilityNote: availability,
  },
  "placas-de-drywall": {
    description: "Placas para paredes, forros e revestimentos internos, escolhidas conforme umidade, resistência ao fogo e exigência mecânica.",
    gallery: [media("/images/catalogo-gesso-drywall.webp", "Placas de drywall ST, RU e RF apoiadas em perfis metálicos"), media("/images/produto-placa-performa.webp", "Placas de drywall de alta resistência da linha Performa")],
    options: ["ST para áreas secas", "RU para ambientes sujeitos à umidade", "RF para aplicações com resistência ao fogo", "Performa ST e RU para maior resistência mecânica e conforto acústico"],
    applications: ["Paredes e revestimentos internos", "Forros", "Ambientes úmidos conforme especificação", "Áreas com exigências mecânicas ou de fogo"],
    variants: [
      { name: "Placa ST", image: media("/images/produto-placa-st.webp", "Placa de drywall ST branca para áreas secas"), use: "Paredes, revestimentos e forros em áreas secas." },
      { name: "Placa RU", image: media("/images/produto-placa-ru.webp", "Placa de drywall RU verde resistente à umidade"), use: "Ambientes sujeitos à umidade, conforme o sistema especificado." },
      { name: "Placa RF", image: media("/images/produto-placa-rf.webp", "Placa de drywall RF rosa resistente ao fogo"), use: "Sistemas que exigem desempenho de resistência ao fogo." },
      { name: "Placa Performa ST", image: media("/images/produto-performa-st.webp", "Placa Performa ST para alta resistência mecânica"), use: "Áreas secas que pedem maior resistência a impactos, cargas e desempenho acústico." },
      { name: "Placa Performa RU", image: media("/images/produto-performa-ru.webp", "Placa Performa RU para alta resistência em ambientes úmidos"), use: "Ambientes úmidos com necessidade de maior resistência mecânica e desempenho acústico." },
    ], availabilityNote: availability,
  },
  massas: {
    description: "Massas para tratamento de juntas, arremates de parafusos e acabamento de sistemas de drywall.",
    gallery: [media("/images/produto-massas.webp", "Massa para drywall com desempenadeira e acabamento branco")],
    options: ["Massa Placomix para drywall", "Tratamento de juntas com fita adequada", "Acabamento de cabeças de parafusos"],
    applications: ["Tratamento de juntas", "Arremate de parafusos", "Regularização e acabamento"],
    variants: [{ name: "Massa para drywall Placomix", image: media("/images/produto-massas.webp", "Massa Placomix para tratamento de juntas de drywall"), use: "Tratamento de juntas, arremates e acabamento do sistema." }],
    availabilityNote: "As embalagens variam conforme a linha e o estoque. Confirme marca, peso e disponibilidade pelo WhatsApp.",
  },
  perfis: {
    description: "Perfis galvanizados para estruturar paredes, forros e arremates em sistemas de construção a seco.",
    gallery: [media("/images/produto-perfis.webp", "Conjunto de perfis galvanizados para drywall"), media("/images/produto-sistema-f530.webp", "Composição de perfis e acessórios do sistema para forro F530")],
    options: ["Perfis para forro F530", "Guias e montantes para paredes", "Tabicas e cantoneiras para arremates"],
    applications: ["Estruturas de paredes", "Forros de drywall", "Encontros, bordas e acabamentos"],
    variants: [
      { name: "Perfil F530", image: media("/images/produto-perfil-f530.webp", "Perfil metálico galvanizado F530 isolado"), use: "Estrutura de sustentação para forros de drywall." },
      { name: "Tabica branca", image: media("/images/produto-tabica-branca.webp", "Perfil tabica branca para acabamento de forro"), use: "Acabamento perimetral e efeito de junta negativa em forros." },
      { name: "Cantoneira 25/30", image: media("/images/produto-cantoneira-25x30.webp", "Cantoneira metálica 25 por 30 para drywall"), measures: ["25/30"], use: "Encontros e arremates de sistemas de drywall." },
      { name: "Cantoneira perfurada", image: media("/images/produto-cantoneira-perfurada.webp", "Cantoneira metálica perfurada para acabamento de cantos"), use: "Proteção e alinhamento de cantos externos." },
      { name: "Montantes", image: media("/images/produto-montantes-drywall.webp", "Montantes galvanizados para paredes de drywall"), measures: ["48 mm", "70 mm", "90 mm"], use: "Elementos verticais da estrutura de paredes e revestimentos." },
      { name: "Guias", image: media("/images/produto-guias-drywall.webp", "Guias galvanizadas para paredes de drywall"), measures: ["48 mm", "70 mm", "90 mm"], use: "Elementos horizontais que recebem e orientam os montantes." },
    ], availabilityNote: availability,
  },
  "complementos-de-instalacao": {
    description: "Fixadores, acessórios de suspensão, fitas e complementos organizados por etapa para facilitar a conferência da lista.",
    gallery: [media("/images/produto-complementos.webp", "Fitas, parafusos, buchas e acessórios para instalação de drywall"), media("/images/produto-sistema-f530.webp", "Sistema F530 com perfis e acessórios de suspensão")],
    options: ["Fixação", "Suspensão F530", "Juntas e cantos", "Fincapinos"],
    applications: ["Fixação de placas e perfis", "Suspensão e nivelamento de forros", "Tratamento de juntas e cantos", "Fixação com pistola fincapinos"],
    variants: [
      { name: "Parafuso preto para drywall", image: media("/images/produto-parafuso-ttpc.webp", "Parafuso preto ponta agulha para drywall"), measures: ["25 mm", "35 mm", "45 mm", "50 mm", "70 mm"], use: "Fixação de placas à estrutura. Consulte a classificação técnica disponível.", group: "Fixação" },
      { name: "Parafuso metal/metal", image: media("/images/produto-parafuso-trpf.webp", "Parafusos curtos para união de perfis metálicos"), measures: ["13 mm", "19 mm", "25 mm"], use: "União de componentes metálicos. Confirme ponta agulha ou broca no estoque.", group: "Fixação" },
      { name: "Parafusos com buchas", image: media("/images/produto-parafuso-bucha.webp", "Parafusos com buchas para fixação"), use: "Fixações diversas, escolhidas conforme base e carga.", group: "Fixação" },
      { name: "Pregos de aço", image: media("/images/produto-prego-aco.webp", "Pregos de aço zincados para fixação"), measures: ["15×15", "17×18", "17×21", "17×24"], use: "Fixações auxiliares conforme a base e o sistema.", group: "Fixação" },
      { name: "Welfix", image: media("/images/produto-welfix.webp", "Fixador Welfix com argola para passagem de arame"), use: "Fixador com argola para passagem de arame em sistemas suspensos.", group: "Fixação" },
      { name: "Presilha reguladora F530", image: media("/images/produto-presilha-f530.webp", "Presilha reguladora metálica para perfil F530"), measures: ["Normal", "Anã"], use: "Ligação e regulagem entre o tirante e o perfil F530.", group: "Suspensão F530" },
      { name: "Arame galvanizado", image: media("/images/produto-arame-galvanizado.webp", "Rolo de arame galvanizado para suspensão"), measures: ["Bitolas comerciais 10, 16, 18, 20 e 22"], use: "Suspensão e amarração, conforme projeto e especificação.", group: "Suspensão F530" },
      { name: "Tirantes prontos", image: media("/images/produto-tirante-f530.webp", "Tirantes metálicos prontos para regulador F530"), use: "Suspensão do sistema de forro com regulador F530.", group: "Suspensão F530" },
      { name: "Multifunção F530", image: media("/images/produto-multifuncao-f530.webp", "Acessório multifunção metálico para F530"), use: "Conexão e composição de perfis no sistema F530.", group: "Suspensão F530" },
      { name: "Fita telada azul", image: media("/images/produto-fita-telada-azul.webp", "Rolo de fita telada azul para tratamento de juntas"), measures: ["50 m", "90 m", "100 m"], use: "Reforço de juntas e reparos conforme o sistema indicado.", group: "Juntas e cantos" },
      { name: "Fita telada branca", image: media("/images/produto-fita-telada-branca.webp", "Rolo de fita telada branca para tratamento de juntas"), measures: ["50 m", "90 m"], use: "Reforço de juntas e reparos conforme o sistema indicado.", group: "Juntas e cantos" },
      { name: "Fita de papel microperfurada", image: media("/images/produto-fita-papel.webp", "Rolo de fita de papel microperfurada para drywall"), use: "Tratamento de juntas entre placas com massa adequada.", group: "Juntas e cantos" },
      { name: "Fita de papel com alumínio", image: media("/images/produto-fita-aluminio.webp", "Fita de papel reforçada com alumínio para cantos"), use: "Reforço e acabamento de cantos internos e externos.", group: "Juntas e cantos" },
      { name: "Fita PVC para canto", image: media("/images/produto-fita-pvc.webp", "Fita de PVC perfurada sendo aplicada em canto de parede"), use: "Proteção e acabamento de cantos.", group: "Juntas e cantos" },
      { name: "Véu de vidro", image: media("/images/produto-veu-vidro.webp", "Rolo branco de véu de fibra de vidro"), use: "Reforço e acabamento em aplicações compatíveis.", group: "Juntas e cantos" },
      { name: "Espoletas e pinos", image: media("/images/produto-fincapinos.webp", "Espoletas e pinos para pistola fincapinos"), use: "Fixação com ferramenta fincapinos, conforme base e equipamento.", group: "Fincapinos" },
    ], availabilityNote: "Medidas listadas conforme o estoque comercial informado pela loja. Confirme nomenclatura, compatibilidade e disponibilidade pelo WhatsApp.",
  },
};

export const featuredPromotions: FeaturedPromotion[] = [
  { title: "Placas Performa", eyebrow: "Resistência para projetos exigentes", description: "Linha ST e RU com maior resistência mecânica, suporte para cargas e conforto acústico.", image: media("/images/produto-placa-performa.webp", "Composição de placas Performa para sistemas de drywall"), href: "/materiais/gesso-e-drywall/placas-de-drywall", cta: "Conheça a linha", wide: true },
  { title: "Gesso em saco de 40 kg", eyebrow: "Revestimento e fundição", description: "Consulte rendimento, aplicação e disponibilidade com a equipe.", image: media("/images/produto-gesso-40kg.webp", "Saco de gesso para revestimento e fundição de 40 kg"), href: "/materiais/gesso-e-drywall/gesso", cta: "Consultar disponibilidade" },
  { title: "Sistema para forro F530", eyebrow: "Perfis e complementos", description: "Perfis, presilhas e acessórios para compor o sistema de suspensão.", image: media("/images/produto-sistema-f530.webp", "Sistema para forro F530 com perfis e acessórios"), href: "/materiais/gesso-e-drywall/perfis", cta: "Ver modelos" },
];

export function getProductDetail(category: MaterialCategory, productSlug: string): ProductDetail | undefined {
  const name = category.items.find((item) => toProductSlug(item) === productSlug);
  if (!name) return undefined;
  const curated = category.slug === "gesso-e-drywall" ? drywallDetails[productSlug] : undefined;
  const fallbackImage = media(category.productImageUrl, category.productImageAlt);
  return {
    name, slug: productSlug,
    description: curated?.description ?? `${name}: conheça as opções desta linha e confirme modelos, medidas e aplicações com a equipe da Gesso Empório.`,
    gallery: curated?.gallery ?? [fallbackImage],
    options: curated?.options ?? ["Modelos e medidas para diferentes aplicações", "Cores e acabamentos conforme a linha", "Disponibilidade e quantidade sob consulta"],
    applications: curated?.applications ?? ["Obras residenciais", "Projetos comerciais", "Reformas e manutenção"],
    variants: curated?.variants ?? [],
    availabilityNote: curated?.availabilityNote ?? availability,
  };
}
