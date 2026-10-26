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

const closing = [
  { name: "Membrana hidrófuga", image: image("produto-steel-membrana", "Rolo de membrana hidrófuga com rótulo original preservado"), measures: ["Tamanhos e medidas sob consulta"], use: "Composição da proteção do fechamento, conforme o sistema especificado." },
  { name: "Tela de reforço para base coat", image: image("produto-steel-tela-base-coat", "Rolo branco de tela de reforço e detalhe da trama enviados pela loja"), measures: ["1 × 50 m"], use: "Reforço da camada de base coat conforme orientação do sistema." },
  { name: "Base coat", image: image("produto-steel-base-coat", "Saco original Placo Fachada Rápida basecoat de 20 kg"), measures: ["20 kg"], use: "Camada de base para sistemas de fachada compatíveis com o produto." },
  { name: "Fita telada para placa cimentícia", image: image("produto-steel-fita-cimenticia", "Rolo cinza de fita telada para placa cimentícia enviado pela loja"), measures: ["Medidas sob consulta"], use: "Reforço do tratamento de juntas conforme especificação do sistema." },
  { name: "Cantoneira PVC com tela", image: image("produto-steel-cantoneira-pvc", "Cantoneira branca de PVC com tela na fotografia original"), measures: ["2,50 m"], use: "Reforço e acabamento de cantos nos sistemas compatíveis." },
  { name: "Pingadeira PVC com tela", image: image("produto-steel-pingadeira-pvc", "Detalhe original da pingadeira de PVC com tela de reforço"), measures: ["2,50 m"], use: "Acabamento com pingadeira nas posições previstas pelo projeto." },
];
const accessories = [
  { name: "Ancorador", image: image("produto-steel-ancorador", "Ancorador metálico perfurado na fotografia enviada pelo cliente"), measures: ["Tamanhos e medidas sob consulta"], use: "Ligação e ancoragem da estrutura conforme dimensionamento do projeto." },
  { name: "Cinta de contraventamento", image: image("produto-steel-cinta", "Cinta metálica de contraventamento no ângulo original da fotografia"), measures: ["Tamanhos e medidas sob consulta"], use: "Composição do contraventamento conforme projeto estrutural." },
  { name: "Tensionador de fita de contraventamento", image: image("produto-steel-tensionador", "Tensionador metálico com parafuso na fotografia enviada pela loja"), measures: ["Disponibilidade sob consulta"], use: "Ajuste da fita de contraventamento conforme o sistema especificado." },
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
    description: "Membrana, telas, base coat e arremates para composição dos fechamentos em Steel Frame.",
    gallery: [image("produto-steel-frame-fechamento", "Composição das fotos originais de membrana, telas, base coat, cantoneira e pingadeira")],
    options: ["Membrana hidrófuga e tela de reforço", "Base coat de 20 kg e fita para cimentícia", "Cantoneira e pingadeira de PVC com tela"],
    applications: ["Proteção dos fechamentos", "Reforço de juntas e superfícies", "Arremates de cantos e bordas"], variants: closing, availabilityNote,
  },
  acessorios: {
    description: "Ancorador, cinta e tensionador de contraventamento para sistemas de Steel Frame.",
    gallery: [image("produto-steel-frame-acessorios", "Fotos originais de ancorador, cinta e tensionador de contraventamento reunidas")],
    options: ["Ancorador", "Cinta de contraventamento", "Tensionador de fita de contraventamento"],
    applications: ["Ancoragem da estrutura", "Contraventamento", "Ajuste da fita conforme projeto"], variants: accessories, availabilityNote,
  },
};
