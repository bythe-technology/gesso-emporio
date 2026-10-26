import type { ProductDetail, ProductMedia } from "./product-details";

type CatalogEntry = Omit<ProductDetail, "name" | "slug">;
const image = (file: string, alt: string): ProductMedia => ({ src: `/images/${file}.webp`, alt });
const availabilityNote = "Fotos e medidas fornecidas pela loja. Confirme modelos, compatibilidade e disponibilidade pelo WhatsApp.";
const boards = [
  { name: "Placa Glasroc X", image: image("produto-steel-glasroc-x", "Placa Glasroc X branca com inscrições azuis originais"), measures: ["1,20 × 2,40 m", "12,5 mm"], use: "Fechamento externo de alta performance, conforme especificação do sistema." },
  { name: "Placa cimentícia", image: image("produto-steel-placa-cimenticia", "Placas cimentícias cinza na fotografia enviada pela loja"), measures: ["1,20 × 2,40 m", "4 mm", "6 mm", "8 mm", "10 mm", "12 mm", "20 mm"], use: "Fechamentos e revestimentos conforme a espessura e o projeto." },
  { name: "Painel OSB", image: image("produto-steel-osb", "Painel OSB original com borda vermelha e marcações preservadas"), measures: ["1,20 × 2,40 m", "9,5 mm", "11,1 mm", "15 mm", "18,3 mm"], use: "Composição de fechamentos e sistemas construtivos conforme projeto." },
];
const fixings = [
  { name: "Parafuso para Glasroc X", image: image("produto-steel-parafuso-glasroc", "Parafuso organometálico para Glasroc X enviado pelo cliente"), measures: ["4,2 × 32 mm", "Organometálico"], use: "Fixação de placas Glasroc X conforme o sistema indicado." },
  { name: "Parafuso para placa cimentícia", image: image("produto-steel-parafuso-cimenticia", "Parafusos para placa cimentícia da foto original do cliente"), measures: ["4,2 × 32 mm com e sem aleta", "4,8 × 50 mm com aleta"], use: "Fixação de placas cimentícias conforme estrutura e espessura." },
  { name: "Parafuso para perfil de Steel Frame", image: image("produto-steel-parafuso-perfil", "Parafusos com cabeça flangeada para perfil de Steel Frame"), measures: ["4,2 × 19 mm"], use: "União de perfis metálicos conforme especificação do projeto." },
  { name: "Parafuso para painel OSB", image: image("produto-steel-parafuso-osb", "Parafuso para painel OSB na posição original da fotografia"), measures: ["4,2 × 32 mm"], use: "Fixação de painéis OSB conforme a base e o sistema." },
  { name: "Parafuso para concreto", image: image("produto-steel-ancoragem-concreto", "Parafuso para ancoragem mecânica em concreto enviado pela loja"), measures: ["Diversos tamanhos"], use: "Ancoragem mecânica em concreto conforme dimensionamento." },
  { name: "Chumbador parabolt", image: image("produto-steel-parabolt", "Chumbador parabolt com porca e arruela na foto do cliente"), measures: ["Diversos tamanhos"], use: "Ancoragem mecânica conforme base, carga e dimensionamento." },
];

export const steelFrameDetails: Record<string, CatalogEntry> = {
  "perfis-estruturais": {
    description: "Perfis metálicos para estruturas de Steel Frame, na fotografia fornecida pela loja.",
    gallery: [image("produto-steel-frame-perfis-estruturais", "Conjunto original de perfis estruturais metálicos enviado pelo cliente")],
    options: ["Perfis para estruturas de Steel Frame", "Modelos e medidas conforme projeto", "Espessuras e disponibilidade sob consulta"],
    applications: ["Estruturas de paredes", "Sistemas de Steel Frame", "Projetos conforme dimensionamento"],
    variants: [], availabilityNote,
  },
  placas: {
    description: "Placas Glasroc X, placas cimentícias e painéis OSB para composição de sistemas de Steel Frame.",
    gallery: [image("produto-steel-frame-placas", "Fotos originais de Glasroc X, placa cimentícia e painel OSB reunidas sobre fundo branco")],
    options: ["Glasroc X de 12,5 mm", "Placas cimentícias em diferentes espessuras", "Painéis OSB em diferentes espessuras"],
    applications: ["Fechamentos externos", "Revestimentos", "Sistemas conforme projeto"], variants: boards, availabilityNote,
  },
  fixadores: {
    description: "Parafusos e ancoragens para Steel Frame, separados por aplicação e identificados pelas fotos da loja.",
    gallery: [image("produto-steel-frame-fixadores", "Composição dos seis fixadores originais enviados pela loja, sem alterar seus ângulos")],
    options: ["Parafusos para Glasroc X, cimentícia e OSB", "Parafuso para união de perfis", "Ancoragens para concreto e parabolt"],
    applications: ["Fixação de placas", "União de perfis", "Ancoragem mecânica"], variants: fixings, availabilityNote,
  },
  "componentes-para-fechamento": {
    description: "Materiais para composição de fechamentos em Steel Frame, escolhidos conforme o projeto.",
    gallery: [image("produto-steel-frame-fechamento", "Placas Glasroc X, cimentícias e OSB das fotografias da loja")],
    options: ["Placas Glasroc X", "Placas cimentícias", "Painéis OSB"],
    applications: ["Fechamentos", "Revestimentos", "Sistemas de Steel Frame"], variants: boards, availabilityNote,
  },
  acessorios: {
    description: "Ancoragens mecânicas para sistemas de Steel Frame, conforme os modelos enviados pela loja.",
    gallery: [image("produto-steel-frame-acessorios", "Fotografias originais de parafuso para concreto e chumbador parabolt")],
    options: ["Parafuso para concreto", "Chumbador parabolt", "Tamanhos e compatibilidade sob consulta"],
    applications: ["Ancoragem mecânica", "Fixação em concreto", "Sistemas conforme dimensionamento"], variants: fixings.slice(-2), availabilityNote,
  },
};
