import type { ProductDetail, ProductMedia } from "./product-details";

type CatalogEntry = Omit<ProductDetail, "name" | "slug">;

const image = (filename: string, alt: string): ProductMedia => ({
  src: `/images/${filename}.webp`,
  alt,
});

const availabilityNote = "Modelos, cores e medidas conforme as opções informadas pela loja. Confirme estoque e disponibilidade pelo WhatsApp.";
const standardLengths = ["2,70 m", "4,00 m", "6,00 m"];

const forrosDetails: Record<string, CatalogEntry> = {
  drywall: {
    description: "Placas ST, RU e RF para sistemas de forro em drywall, selecionadas conforme o ambiente e a especificação da obra.",
    gallery: [image("produto-forros-drywall-cliente", "Placas de drywall ST, RU e RF nas cores branca, verde e rosa, conforme foto enviada pela loja")],
    options: [
      "Placa ST para áreas secas",
      "Placa RU para ambientes sujeitos à umidade",
      "Placa RF para sistemas com exigência de resistência ao fogo",
    ],
    applications: ["Forros em drywall", "Ambientes definidos conforme a especificação do sistema"],
    variants: [],
    availabilityNote,
  },
  pvc: {
    description: "Réguas de PVC para forro e perfis de acabamento, com modelos junta seca e opções de cores conforme disponibilidade.",
    gallery: [image("produto-forros-pvc-cliente", "Composição das fotos originais de forros de PVC e acabamentos enviadas pela loja")],
    options: [
      "Forro PVC junta seca e rústico junta seca",
      "Espessuras de 7 mm e 10 mm conforme o modelo",
      "Acabamentos U, meia-cana, premium, emenda rígida e F com 6 m",
      "Consulte as cores disponíveis",
    ],
    applications: ["Forros em PVC", "Arremates e emendas do forro", "Acabamentos conforme o modelo instalado"],
    variants: [
      { name: "Forro PVC junta seca", image: image("produto-forro-pvc-junta-seca", "Régua branca de forro PVC junta seca, na foto original da loja"), measures: ["7 mm", "10 mm", "Cores sob consulta"], use: "Régua de PVC branca para montagem de forro junta seca." },
      { name: "Forro rústico junta seca", image: image("produto-forro-pvc-rustico", "Régua de forro PVC rústico amadeirado junta seca, na foto original da loja"), measures: ["7 mm", "10 mm", "Cores sob consulta"], use: "Régua de PVC com aparência amadeirada para forro junta seca." },
      { name: "Acabamento U", image: image("produto-forro-acabamento-u", "Perfil de acabamento U branco para forro PVC, na foto original da loja"), measures: ["6 m", "Diversas cores"], use: "Perfil para acabamento de bordas e encontros do forro." },
      { name: "Acabamento meia-cana", image: image("produto-forro-acabamento-meia-cana", "Perfil de acabamento meia-cana branco para forro PVC, na foto original da loja"), measures: ["6 m", "Diversas cores"], use: "Acabamento curvo para encontros entre o forro e as paredes." },
      { name: "Acabamento premium", image: image("produto-forro-acabamento-premium", "Perfil de acabamento premium branco para forro PVC, na foto original da loja"), measures: ["6 m", "Diversas cores"], use: "Perfil de acabamento para compor o perímetro do forro." },
      { name: "Emenda rígida", image: image("produto-forro-emenda-rigida", "Perfil de emenda rígida branco para forro PVC, na foto original da loja"), measures: ["6 m", "Diversas cores"], use: "Perfil para união e acabamento entre réguas de forro." },
      { name: "Acabamento F", image: image("produto-forro-acabamento-f", "Perfil de acabamento F branco para forro PVC, na foto original da loja"), measures: ["6 m", "Diversas cores"], use: "Perfil F para acabamento de bordas do forro." },
    ],
    availabilityNote,
  },
  vinilicos: {
    description: "Revestimentos vinílicos decorados REVID para forros, com diferentes padrões amadeirados e opção de painel ripado.",
    gallery: [image("produto-forros-vinilicos-cliente", "Composição das fotos originais de revestimentos REVID e painel ripado enviadas pela loja")],
    options: [
      "+ de 30 modelos disponíveis",
      "Revestimentos REVID com 10 mm de espessura",
      "Comprimentos disponíveis: 2,70 m, 4,00 m e 6,00 m",
      "Consulte padrões e cores disponíveis",
    ],
    applications: ["Forros vinílicos decorados", "Painel ripado para acabamento de teto", "Projetos internos conforme modelo escolhido"],
    variants: [
      { name: "REVID — Sintra Brun 02", image: image("produto-forro-revid-sintra-brun-02", "Revestimento vinílico decorado REVID padrão Sintra Brun 02, conforme foto enviada pela loja"), measures: ["10 mm", ...standardLengths], use: "Padrão amadeirado Sintra Brun 02 para revestimento vinílico decorado." },
      { name: "REVID — Sintra Fulvours 2", image: image("produto-forro-revid-sintra-fulvours-2", "Revestimento vinílico decorado REVID padrão Sintra Fulvours 2, conforme foto enviada pela loja"), measures: ["10 mm", ...standardLengths], use: "Padrão amadeirado Sintra Fulvours 2 para revestimento vinílico decorado." },
      { name: "REVID — Ébano Avelã", image: image("produto-forro-revid-ebano-avela", "Revestimento vinílico decorado REVID padrão Ébano Avelã, conforme foto enviada pela loja"), measures: ["10 mm", ...standardLengths], use: "Padrão Ébano Avelã para revestimento vinílico decorado." },
      { name: "REVID — Ébano Platina", image: image("produto-forro-revid-ebano-platina", "Revestimento vinílico decorado REVID padrão Ébano Platina, conforme foto enviada pela loja"), measures: ["10 mm", ...standardLengths], use: "Padrão cinza Ébano Platina para revestimento vinílico decorado." },
      { name: "REVID — Painel ripado", image: image("produto-forro-revid-painel-ripado", "Painel vinílico REVID com acabamento ripado amadeirado, conforme foto enviada pela loja"), measures: ["10 mm", ...standardLengths], use: "Modelo ripado para compor forros vinílicos decorativos." },
    ],
    availabilityNote,
  },
  isopor: {
    description: "Forros decorativos de isopor com seis texturas, dimensões de 1243 × 618 mm e opções de espessura conforme o modelo.",
    gallery: [image("produto-forros-isopor-cliente", "Composição das fotos originais dos forros de isopor Stylo, Originale, Standard, Natural Wave, Decore e Black")],
    options: [
      "Texturas Stylo, Originale, Standard, Wave, Decore e Black",
      "Espessuras de 20 mm e 40 mm",
      "Dimensão informada: 1243 × 618 mm",
      "Consulte cores e disponibilidade",
    ],
    applications: ["Forros decorativos internos", "Acabamento de teto conforme o ambiente e a instalação"],
    variants: [
      { name: "Forro isopor textura STYLO", image: image("produto-forro-isopor-stylo", "Placa de forro de isopor com textura Stylo e etiqueta original"), measures: ["20 mm", "40 mm", "1243 × 618 mm"], use: "Textura Stylo para acabamento decorativo de forro." },
      { name: "Forro isopor textura ORIGINALE", image: image("produto-forro-isopor-originale", "Placa de forro de isopor com textura Originale e etiqueta original"), measures: ["20 mm", "40 mm", "1243 × 618 mm"], use: "Textura Originale para acabamento decorativo de forro." },
      { name: "Forro isopor textura STANDARD", image: image("produto-forro-isopor-standard", "Placa de forro de isopor com textura Standard e etiqueta original"), measures: ["20 mm", "40 mm", "1243 × 618 mm"], use: "Textura Standard para acabamento decorativo de forro." },
      { name: "Forro isopor textura WAVE", image: image("produto-forro-isopor-natural-wave", "Placa de forro de isopor Natural Wave com etiqueta original"), measures: ["20 mm", "40 mm", "1243 × 618 mm"], use: "Textura Wave, identificada na foto como Natural Wave." },
      { name: "Forro isopor textura DECORE", image: image("produto-forro-isopor-decore", "Placa de forro de isopor com textura Decore e etiqueta original"), measures: ["20 mm", "40 mm", "1243 × 618 mm"], use: "Textura Decore para acabamento decorativo de forro." },
      { name: "Forro isopor textura BLACK", image: image("produto-forro-isopor-black", "Placa de forro de isopor preta com textura Black e etiqueta original"), measures: ["20 mm", "40 mm", "1243 × 618 mm"], use: "Textura Black para acabamento decorativo de forro." },
    ],
    availabilityNote,
  },
  mineral: {
    description: "Forros minerais modulares em diferentes acabamentos, marcas, espessuras e formatos para projetos comerciais e institucionais.",
    gallery: [image("produto-forros-mineral-cliente", "Composição das fotos originais das placas minerais Decore Standard, EspaçoForro Austral, Armstrong Georgian e Cosmos Black")],
    options: [
      "Decore Standard branco, 12 mm",
      "EspaçoForro E-Decore Austral branco, 14 mm",
      "Armstrong Ceilings Georgian branco, 15 mm",
      "EspaçoForro E-Decore Cosmos Black preto, 12 mm",
      "Formatos conforme o modelo: 625 × 625 mm e 625 × 1250 mm",
    ],
    applications: ["Forros modulares", "Ambientes comerciais e institucionais", "Soluções conforme o projeto e a estrutura existente"],
    variants: [
      { name: "Forro mineral Decore Standard branco", image: image("produto-forro-mineral-decore-standard", "Placa branca de forro mineral Decore Standard na foto original enviada pela loja"), measures: ["12 mm", "625 × 625 mm", "625 × 1250 mm"], use: "Placa mineral branca para forro modular." },
      { name: "Forro mineral tegular EspaçoForro E-Decore Austral branco", image: image("produto-forro-mineral-espacoforro-austral", "Placa tegular branca EspaçoForro E-Decore Austral na foto original enviada pela loja"), measures: ["14 mm", "625 × 625 mm"], use: "Placa mineral tegular para sistema modular compatível." },
      { name: "Forro mineral lay-in Armstrong Ceilings Georgian branco", image: image("produto-forro-mineral-armstrong-georgian", "Placa lay-in branca Armstrong Ceilings Georgian na foto original enviada pela loja"), measures: ["15 mm", "625 × 625 mm", "625 × 1250 mm"], use: "Placa mineral lay-in para forro modular." },
      { name: "Forro mineral lay-in EspaçoForro E-Decore Cosmos Black preto", image: image("produto-forro-mineral-cosmos-black", "Placa lay-in preta EspaçoForro E-Decore Cosmos Black na foto original enviada pela loja"), measures: ["12 mm", "625 × 625 mm"], use: "Placa mineral preta para forro modular." },
    ],
    availabilityNote,
  },
  acusticos: {
    description: "Placas acústicas perfuradas de gesso e painéis de lã de vidro para diferentes soluções de forro e tratamento acústico.",
    gallery: [image("produto-forros-acusticos-cliente", "Composição das fotos originais das placas perfuradas Rigitone e Gyptone e dos painéis Isover")],
    options: [
      "Placas de gesso acartonado perfuradas Rigitone e Gyptone",
      "Painéis de lã de vidro Isover, incluindo a versão Black",
      "Espessuras e formatos específicos de cada modelo",
      "Consulte compatibilidade com o sistema de instalação",
    ],
    applications: ["Forros acústicos", "Tratamento acústico de ambientes", "Soluções definidas conforme projeto e sistema de instalação"],
    variants: [
      { name: "RIGITONE EDGE 12/25 Quadrada", image: image("produto-forro-acustico-rigitone-edge-12-25", "Placa Rigitone Edge 12/25 com perfuração quadrada, na foto original enviada pela loja"), measures: ["12,5 mm", "1200 × 2000 mm"], use: "Forro de gesso acartonado com furação quadrada." },
      { name: "GYPTONE BIG QUATTRO 41", image: image("produto-forro-acustico-gyptone-big-quattro-41", "Placa Gyptone Big Quattro 41 com furação quadrada e borda lisa, na foto original enviada pela loja"), measures: ["12 mm", "1200 × 1800 mm"], use: "Forro de gesso acartonado com furação quadrada e aba lisa, conforme o modelo informado." },
      { name: "RIGITONE EDGE 8/18", image: image("produto-forro-acustico-rigitone-edge-8-18", "Placa Rigitone Edge 8/18 com perfuração redonda, na foto original enviada pela loja"), measures: ["12,5 mm", "1998 × 1188 mm"], use: "Forro de gesso acartonado com furação redonda." },
      { name: "GYPTONE QUATTRO 20", image: image("produto-forro-acustico-gyptone-quattro-20", "Placa Gyptone Quattro 20 com perfuração quadrada, na foto original enviada pela loja"), measures: ["10 mm", "625 × 625 mm"], use: "Forro de gesso acartonado com furação quadrada." },
      { name: "RIGITONE EDGE 8-15-20 SUPER", image: image("produto-forro-acustico-rigitone-edge-8-15-20", "Placa Rigitone Edge 8-15-20 Super com perfuração redonda aleatória, na foto original enviada pela loja"), measures: ["12,5 mm", "1200 × 1960 mm"], use: "Forro de gesso acartonado com furação redonda aleatória." },
      { name: "Forro lã de vidro Isover", image: image("produto-forro-acustico-isover", "Painel de lã de vidro Isover com face branca, na foto original enviada pela loja"), measures: ["15 mm", "25 mm", "625 × 625 mm", "625 × 1250 mm"], use: "Painel de lã de vidro para solução acústica, conforme o sistema especificado." },
      { name: "Forro lã de vidro Isover Black", image: image("produto-forro-acustico-isover-black", "Painel preto de lã de vidro Isover Black na foto original enviada pela loja"), measures: ["15 mm", "25 mm", "625 × 625 mm", "625 × 1250 mm"], use: "Painel preto de lã de vidro para solução acústica, conforme o sistema especificado." },
    ],
    availabilityNote,
  },
};

export { forrosDetails };
