import {
  Blocks,
  BrickWall,
  Hammer,
  Layers3,
  Lightbulb,
  PanelsTopLeft,
  PaintRoller,
  Rows3,
  type LucideIcon,
} from "lucide-react";

export const SITE_URL = "https://gesso-emporio.vercel.app";
export const WHATSAPP_NUMBER = "5513996103288";
export const PHONE_LABEL = "(13) 99610-3288";
export const ADDRESS = "Rua São Nicolau, 25 — Jardim São Nicolau, Registro/SP";
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Gesso+Emp%C3%B3rio+Registro+SP";
export const MAPS_EMBED_URL = "https://www.google.com/maps?q=Gesso+Emp%C3%B3rio%2C+Registro%2C+SP&output=embed";
export const INSTAGRAM_URL = "https://www.instagram.com/gessoemporio/";

export type MaterialCategory = {
  slug: string;
  name: string;
  shortName: string;
  eyebrow: string;
  description: string;
  intro: string;
  items: string[];
  benefits: string[];
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  productImageUrl: string;
  productImageAlt: string;
};

const unorderedCategories: MaterialCategory[] = [
  {
    slug: "forros",
    name: "Forros",
    shortName: "Forros",
    eyebrow: "Conforto e acabamento",
    description: "Soluções para transformar o teto com praticidade, conforto e bom acabamento.",
    intro: "Encontre opções para diferentes necessidades de obra, do controle acústico à resistência à umidade. Nossa equipe ajuda você a comparar cada material e escolher o mais adequado.",
    items: ["Drywall", "PVC", "Vinílicos", "Isopor", "Mineral", "Acústicos"],
    benefits: ["Alternativas para áreas secas e úmidas", "Opções térmicas e acústicas", "Materiais para obras residenciais e comerciais"],
    icon: PanelsTopLeft,
    image: "/images/materiais-forros-divisorias.webp",
    imageAlt: "Amostras de forros em PVC, mineral, acústico e componentes para acabamento",
    productImageUrl: "/images/catalogo-forros.webp",
    productImageAlt: "Forros de PVC, placas minerais e perfil de sustentação em fundo claro",
  },
  {
    slug: "divisorias",
    name: "Divisórias",
    shortName: "Divisórias",
    eyebrow: "Ambientes bem resolvidos",
    description: "Sistemas rápidos e versáteis para organizar espaços residenciais e comerciais.",
    intro: "Divida ambientes com soluções leves, limpas e adaptáveis. Trabalhamos com materiais que atendem desde reformas residenciais até escritórios e instalações comerciais.",
    items: ["Drywall", "PVC", "Eucatex", "Divisórias sanitárias"],
    benefits: ["Montagem prática", "Boa variedade de acabamentos", "Soluções para diferentes tipos de ambiente"],
    icon: Rows3,
    image: "/images/materiais-forros-divisorias.webp",
    imageAlt: "Painéis, perfis e materiais para divisórias comercializados pela Gesso Empório",
    productImageUrl: "/images/catalogo-divisorias.webp",
    productImageAlt: "Divisória modular branca com perfis de alumínio e porta integrada",
  },
  {
    slug: "pisos-e-decks",
    name: "Pisos e decks",
    shortName: "Pisos e decks",
    eyebrow: "Do interior à área externa",
    description: "Pisos e revestimentos que unem desempenho, conforto e presença visual.",
    intro: "Compare texturas, aplicações e características para acertar no piso do seu projeto. Temos soluções para residências, comércios, academias e áreas externas.",
    items: ["Vinílicos", "Laminados", "Carpete em placas Shaw", "Pisos para academia", "Deck WPC"],
    benefits: ["Opções para alto tráfego", "Conforto e fácil manutenção", "Alternativas para áreas internas e externas"],
    icon: Layers3,
    image: "/images/materiais-pisos-acabamentos.webp",
    imageAlt: "Amostras de pisos vinílicos, laminados, WPC e revestimentos",
    productImageUrl: "/images/catalogo-pisos-decks.webp",
    productImageAlt: "Amostras de pisos laminados e vinílicos em diferentes tons de madeira",
  },
  {
    slug: "iluminacao",
    name: "Iluminação",
    shortName: "Iluminação",
    eyebrow: "A luz certa para cada espaço",
    description: "Peças para valorizar ambientes, destacar detalhes e completar o projeto.",
    intro: "Da luz funcional aos pontos de destaque, escolha entre diferentes formatos e aplicações para construir uma iluminação coerente em cada ambiente.",
    items: ["Spots", "Plafons", "Fitas e mangueiras LED", "Pendentes", "Trilhos", "Refletores"],
    benefits: ["Soluções decorativas e funcionais", "Opções para áreas internas e externas", "Variedade de formatos e potências"],
    icon: Lightbulb,
    image: "/images/materiais-iluminacao-ferramentas.webp",
    imageAlt: "Spots, plafons, fitas de LED, pendentes e refletores em exposição",
    productImageUrl: "/images/catalogo-iluminacao.webp",
    productImageAlt: "Painel, plafon e spots de LED brancos em fundo claro",
  },
  {
    slug: "revestimentos-e-acabamentos",
    name: "Revestimentos e acabamentos",
    shortName: "Acabamentos",
    eyebrow: "Detalhes que mudam o ambiente",
    description: "Texturas, formas e superfícies para finalizar o projeto com personalidade.",
    intro: "Complete paredes e detalhes com materiais decorativos de aplicação prática. Nossa equipe ajuda a encontrar combinações adequadas ao estilo e ao uso do ambiente.",
    items: ["Ripados internos", "Ripados externos", "Papéis adesivos", "Molduras e complementos"],
    benefits: ["Aplicação prática", "Diversidade de cores e texturas", "Soluções para renovar sem grandes intervenções"],
    icon: PaintRoller,
    image: "/images/materiais-pisos-acabamentos.webp",
    imageAlt: "Ripados, papéis adesivos e amostras de revestimentos e acabamentos",
    productImageUrl: "/images/catalogo-acabamentos.webp",
    productImageAlt: "Painéis ripados em três tons de madeira",
  },
  {
    slug: "ferramentas-e-acessorios",
    name: "Ferramentas e acessórios",
    shortName: "Ferramentas",
    eyebrow: "Tudo para a execução",
    description: "Ferramentas, fixadores e acessórios para manter a obra em movimento.",
    intro: "Reúna em um só lugar os itens que fazem a instalação acontecer, com orientação para escolher ferramentas e acessórios compatíveis com o seu serviço.",
    items: ["Ferramentas elétricas", "Ferramentas manuais", "Fixadores", "Acessórios de instalação", "Itens de medição"],
    benefits: ["Produtos para profissionais e reformas", "Compatibilidade com sistemas a seco", "Praticidade para completar a lista de obra"],
    icon: Hammer,
    image: "/images/materiais-iluminacao-ferramentas.webp",
    imageAlt: "Ferramentas, acessórios e itens de instalação para construção a seco",
    productImageUrl: "/images/catalogo-ferramentas.webp",
    productImageAlt: "Kit profissional de ferramentas elétricas com baterias, carregador e bolsa",
  },
  {
    slug: "gesso-e-drywall",
    name: "Gesso e drywall",
    shortName: "Gesso e drywall",
    eyebrow: "A base da construção a seco",
    description: "Placas, massas e componentes para sistemas de construção a seco.",
    intro: "Encontre os principais materiais para paredes, forros e acabamentos em gesso e drywall. Consulte disponibilidade e quantidades diretamente com a equipe.",
    items: ["Gesso", "Placas de drywall", "Massas", "Perfis", "Complementos de instalação"],
    benefits: ["Soluções para diferentes etapas da obra", "Materiais para sistemas completos", "Atendimento para conferir a sua lista"],
    icon: BrickWall,
    image: "/images/materiais-drywall.webp",
    imageAlt: "Placas de drywall, perfis metálicos, massas e componentes para construção a seco",
    productImageUrl: "/images/catalogo-gesso-drywall.webp",
    productImageAlt: "Placas de drywall branca, verde e rosa para diferentes aplicações",
  },
  {
    slug: "steel-frame",
    name: "Steel frame",
    shortName: "Steel frame",
    eyebrow: "Estrutura leve e eficiente",
    description: "Componentes para construções leves, rápidas e racionalizadas.",
    intro: "O steel frame combina perfis leves e componentes específicos para obras com planejamento, precisão e menor geração de resíduos.",
    items: ["Perfis estruturais", "Placas", "Fixadores", "Componentes para fechamento", "Acessórios"],
    benefits: ["Sistema construtivo industrializado", "Rapidez na execução", "Uso eficiente de materiais"],
    icon: Blocks,
    image: "/images/light-steel-frame.jpg",
    imageAlt: "Estrutura em steel frame, material comercializado pela Gesso Empório",
    productImageUrl: "/images/catalogo-steel-frame.webp",
    productImageAlt: "Estrutura residencial completa em light steel frame galvanizado",
  },
];

const categoryOrder = ["gesso-e-drywall", "steel-frame", "forros", "divisorias", "pisos-e-decks", "revestimentos-e-acabamentos", "iluminacao", "ferramentas-e-acessorios"];

export const categories = [...unorderedCategories].sort((first, second) => categoryOrder.indexOf(first.slug) - categoryOrder.indexOf(second.slug));

export const testimonials = [
  {
    quote: "Uma loja completa. Material e ferramental para construção a seco. Bom atendimento, fácil acesso e preços justos. Recomendo.",
    author: "Marcelo Feitoza",
    source: "Avaliação no Google",
  },
  {
    quote: "Atendimento qualificado, variedade de produtos e melhor preço da região.",
    author: "Ingrydi Reis",
    source: "Avaliação no Google",
  },
  {
    quote: "Fui muito bem atendida pelo Matheus, tirou todas minhas dúvidas, super recomendo.",
    author: "Kelly Silva Pacheco",
    source: "Avaliação no Google",
  },
  {
    quote: "Lá você encontra de tudo para gesso, PVC e outros. Pessoal atencioso e amigável. Super recomendo.",
    author: "Eubio",
    source: "Avaliação no Google",
  },
  {
    quote: "Atendimento ótimo, equipe bem-humorada.",
    author: "Carlos Carvalho",
    source: "Avaliação no Google",
  },
  {
    quote: "Atendimento e tudo que precisa para drywall. Loja top, top, top.",
    author: "Mateus Vitor Souza Forte",
    source: "Avaliação no Google",
  },
] as const;

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

