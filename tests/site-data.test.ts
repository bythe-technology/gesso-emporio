import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { categories, MAPS_EMBED_URL, testimonials } from "../lib/site-data";
import { featuredPromotions, getProductDetail, toProductSlug } from "../lib/product-details";

test("steel frame shows the customer boards, fasteners and supplied measurements", () => {
  const category = categories.find(item => item.slug === "steel-frame");
  assert.ok(category);
  const boards = getProductDetail(category, "placas");
  assert.deepEqual(boards?.variants.map(item => item.name), ["Placa Glasroc X", "Placa cimentícia", "Painel OSB"]);
  assert.deepEqual(boards?.variants[2].measures, ["1,20 × 2,40 m", "9,5 mm", "11,1 mm", "15 mm", "18,3 mm"]);
  const fixings = getProductDetail(category, "fixadores");
  assert.equal(fixings?.variants.length, 6);
  assert.deepEqual(fixings?.variants[1].measures, ["4,2 × 32 mm com e sem aleta", "4,8 × 50 mm com aleta"]);
  for (const item of [...(boards?.variants ?? []), ...(fixings?.variants ?? [])]) {
    assert.ok(existsSync(join(process.cwd(), "public", item.image.src)));
  }
  assert.equal(getProductDetail(category, "produto-inexistente"), undefined);
});

test("steel frame closure components and accessories use the new client batch", () => {
  const category = categories.find(item => item.slug === "steel-frame");
  assert.ok(category);
  const closing = getProductDetail(category, "componentes-para-fechamento");
  const accessories = getProductDetail(category, "acessorios");
  assert.equal(closing?.variants.length, 6);
  assert.deepEqual(closing?.variants[1].measures, ["1 × 50 m"]);
  assert.deepEqual(closing?.variants[2].measures, ["20 kg"]);
  assert.deepEqual(closing?.variants.slice(-2).map(item => item.measures), [["2,50 m"], ["2,50 m"]]);
  assert.deepEqual(accessories?.variants.map(item => item.name), ["Ancorador", "Cinta de contraventamento", "Tensionador de fita de contraventamento"]);
  const sources = JSON.parse(readFileSync(join(process.cwd(), "docs/product-photo-sources.json"), "utf8")) as Record<string, { kind: string }>;
  for (const variant of [...(closing?.variants ?? []), ...(accessories?.variants ?? [])]) {
    assert.equal(sources[variant.image.src.split("/").pop()!]?.kind, "client-original");
    assert.ok(existsSync(join(process.cwd(), "public", variant.image.src)));
  }
});

test("forro catalog uses the customer's drywall, PVC and REVID product photos", () => {
  const category = categories.find(item => item.slug === "forros");
  assert.ok(category);

  const drywall = getProductDetail(category, "drywall");
  assert.deepEqual(drywall?.options, [
    "Placa ST para áreas secas",
    "Placa RU para ambientes sujeitos à umidade",
    "Placa RF para sistemas com exigência de resistência ao fogo",
  ]);
  assert.match(drywall?.gallery[0].src ?? "", /produto-forros-drywall-cliente\.webp$/);

  const pvc = getProductDetail(category, "pvc");
  assert.deepEqual(pvc?.variants.map(item => item.name), [
    "Forro PVC junta seca",
    "Forro rústico junta seca",
    "Acabamento U",
    "Acabamento meia-cana",
    "Acabamento premium",
    "Emenda rígida",
    "Acabamento F",
  ]);
  assert.equal(new Set(pvc?.variants.map(item => item.image.src)).size, 7);
  assert.deepEqual(pvc?.variants[0].measures, ["7 mm", "10 mm", "Cores sob consulta"]);

  const vinyl = getProductDetail(category, "vinilicos");
  assert.deepEqual(vinyl?.variants.map(item => item.name), [
    "REVID — Sintra Brun 02",
    "REVID — Sintra Fulvours 2",
    "REVID — Ébano Avelã",
    "REVID — Ébano Platina",
    "REVID — Painel ripado",
  ]);
  assert.ok(vinyl?.options.includes("+ de 30 modelos disponíveis"));
  assert.deepEqual(vinyl?.variants[0].measures, ["10 mm", "2,70 m", "4,00 m", "6,00 m"]);

  const sources = JSON.parse(readFileSync(join(process.cwd(), "docs/product-photo-sources.json"), "utf8")) as Record<string, { kind: string }>;
  for (const detail of [drywall, pvc, vinyl]) {
    assert.ok(detail);
    assert.equal(detail.gallery.length, 1);
    assert.ok(detail.gallery[0].alt.length > 20);
    for (const photo of [...detail.gallery, ...detail.variants.map(variant => variant.image)]) {
      const filename = photo.src.split("/").pop()!;
      assert.equal(sources[filename]?.kind, "client-original");
      assert.ok(existsSync(join(process.cwd(), "public/images", filename)));
    }
  }
});

test("isopor ceilings show the six supplied textures and the customer's sizes", () => {
  const category = categories.find(item => item.slug === "forros");
  assert.ok(category);
  const isopor = getProductDetail(category, "isopor");
  assert.deepEqual(isopor?.variants.map(item => item.name), [
    "Forro isopor textura STYLO",
    "Forro isopor textura ORIGINALE",
    "Forro isopor textura STANDARD",
    "Forro isopor textura WAVE",
    "Forro isopor textura DECORE",
    "Forro isopor textura BLACK",
  ]);
  assert.ok(isopor?.options.includes("Dimensão informada: 1243 × 618 mm"));
  for (const variant of isopor?.variants ?? []) {
    assert.deepEqual(variant.measures, ["20 mm", "40 mm", "1243 × 618 mm"]);
  }
  const sources = JSON.parse(readFileSync(join(process.cwd(), "docs/product-photo-sources.json"), "utf8")) as Record<string, { kind: string }>;
  for (const photo of [...(isopor?.gallery ?? []), ...(isopor?.variants.map(variant => variant.image) ?? [])]) {
    const filename = photo.src.split("/").pop()!;
    assert.equal(sources[filename]?.kind, "client-original");
    assert.ok(existsSync(join(process.cwd(), "public/images", filename)));
  }
});

test("mineral and acoustic ceilings show supplied models, measurements and photos", () => {
  const category = categories.find(item => item.slug === "forros");
  assert.ok(category);
  const mineral = getProductDetail(category, "mineral");
  assert.deepEqual(mineral?.variants.map(item => item.name), [
    "Forro mineral Decore Standard branco",
    "Forro mineral tegular EspaçoForro E-Decore Austral branco",
    "Forro mineral lay-in Armstrong Ceilings Georgian branco",
    "Forro mineral lay-in EspaçoForro E-Decore Cosmos Black preto",
  ]);
  assert.deepEqual(mineral?.variants.map(item => item.measures), [
    ["12 mm", "625 × 625 mm", "625 × 1250 mm"],
    ["14 mm", "625 × 625 mm"],
    ["15 mm", "625 × 625 mm", "625 × 1250 mm"],
    ["12 mm", "625 × 625 mm"],
  ]);

  const acoustic = getProductDetail(category, "acusticos");
  assert.deepEqual(acoustic?.variants.map(item => item.name), [
    "RIGITONE EDGE 12/25 Quadrada",
    "GYPTONE BIG QUATTRO 41",
    "RIGITONE EDGE 8/18",
    "GYPTONE QUATTRO 20",
    "RIGITONE EDGE 8-15-20 SUPER",
    "Forro lã de vidro Isover",
    "Forro lã de vidro Isover Black",
  ]);
  assert.deepEqual(acoustic?.variants[4].measures, ["12,5 mm", "1200 × 1960 mm"]);
  assert.deepEqual(acoustic?.variants[5].measures, ["15 mm", "25 mm", "625 × 625 mm", "625 × 1250 mm"]);

  const sources = JSON.parse(readFileSync(join(process.cwd(), "docs/product-photo-sources.json"), "utf8")) as Record<string, { kind: string }>;
  for (const detail of [mineral, acoustic]) {
    assert.ok(detail);
    assert.equal(detail.gallery.length, 1);
    for (const photo of [...detail.gallery, ...detail.variants.map(variant => variant.image)]) {
      const filename = photo.src.split("/").pop()!;
      assert.equal(sources[filename]?.kind, "client-original");
      assert.ok(existsSync(join(process.cwd(), "public/images", filename)));
    }
  }
});

test("restored catalog photography has traceable non-generative sources", () => {
  const sources = JSON.parse(readFileSync(join(process.cwd(), "docs/product-photo-sources.json"), "utf8")) as Record<string, { kind: string }>;
  assert.ok(Object.keys(sources).length >= 30);
  for (const [name, source] of Object.entries(sources)) {
    assert.ok(["client-original", "manufacturer-catalog"].includes(source.kind));
    assert.ok(existsSync(join(process.cwd(), "public/images", name)));
  }
});

test("every material category has a photographic asset and accessible description", () => {
  assert.equal(categories.length, 8);

  for (const category of categories) {
    assert.match(category.image, /^\/images\/.+\.(?:webp|jpg|png)$/);
    assert.ok(category.imageAlt.length > 20);
    assert.match(category.productImageUrl, /^(https:\/\/|\/images\/)/);
    assert.ok(category.productImageAlt.length > 15);
    assert.ok(category.items.length > 0);
  }
});

test("uses the catalog order approved by the client", () => {
  assert.deepEqual(categories.map(({ slug }) => slug), [
    "gesso-e-drywall",
    "steel-frame",
    "forros",
    "divisorias",
    "pisos-e-decks",
    "revestimentos-e-acabamentos",
    "iluminacao",
    "ferramentas-e-acessorios",
  ]);
});

test("publishes the verified Google review summary and map embed", () => {
  assert.ok(testimonials.length >= 6);
  assert.match(MAPS_EMBED_URL, /^https:\/\/www\.google\.com\/maps\?/);
  assert.match(MAPS_EMBED_URL, /output=embed$/);
});

test("every material item has a stable product route and detail page data", () => {
  for (const category of categories) {
    for (const item of category.items) {
      const slug = toProductSlug(item);
      const detail = getProductDetail(category, slug);
      assert.ok(slug.length > 1);
      assert.equal(detail?.name, item);
      assert.ok((detail?.options.length ?? 0) >= 3);
      assert.equal(detail?.gallery.length, 1, `${category.name} / ${item} must use a single hero image`);
      assert.match(detail?.gallery[0].src ?? "", /^\/images\/.+\.(?:webp|jpg|png)$/);
      assert.ok((detail?.gallery[0].alt.length ?? 0) > 15);
    }
  }
});

test("the curated drywall catalog has product-specific variants and accessible imagery", () => {
  const category = categories.find(({ slug }) => slug === "gesso-e-drywall");
  assert.ok(category);
  for (const item of category.items) {
    const detail = getProductDetail(category, toProductSlug(item));
    assert.ok(detail);
    assert.ok(detail.variants.length > 0);
    for (const variant of detail.variants) {
      assert.match(variant.image.src, /^\/images\/.+\.webp$/);
      assert.ok(variant.image.alt.length > 15);
      assert.ok(variant.use.length > 20);
    }
  }
  const complements = getProductDetail(category, "complementos-de-instalacao");
  assert.deepEqual([...new Set(complements?.variants.map(({ group }) => group))], ["Fixação", "Suspensão F530", "Juntas e cantos", "Fincapinos"]);
});

test("homepage promotions form a three-card catalog showcase without pricing", () => {
  assert.equal(featuredPromotions.length, 3);
  for (const promotion of featuredPromotions) {
    assert.match(promotion.href, /^\/materiais\/gesso-e-drywall\//);
    assert.match(promotion.image.src, /^\/images\/.+\.webp$/);
    assert.doesNotMatch(`${promotion.title} ${promotion.description}`, /R\$|preço|desconto/i);
  }
});

test("every catalog product uses its own local image instead of a category fallback", () => {
  const usedImages = new Set<string>();
  for (const category of categories) {
    for (const item of category.items) {
      const detail = getProductDetail(category, toProductSlug(item));
      assert.ok(detail);
      const image = detail.gallery[0].src;
      assert.notEqual(image, category.productImageUrl, `${category.name} / ${item} still uses the category fallback`);
      assert.ok(!usedImages.has(image), `${image} is reused by more than one catalog product`);
      assert.ok(existsSync(join(process.cwd(), "public", image)), `${image} does not exist in public`);
      usedImages.add(image);
    }
  }
  assert.equal(usedImages.size, categories.reduce((total, category) => total + category.items.length, 0));
});
