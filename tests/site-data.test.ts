import assert from "node:assert/strict";
import test from "node:test";
import { categories, MAPS_EMBED_URL, testimonials } from "../lib/site-data";
import { featuredPromotions, getProductDetail, toProductSlug } from "../lib/product-details";

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
