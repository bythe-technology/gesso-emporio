import assert from "node:assert/strict";
import test from "node:test";
import { categories, MAPS_EMBED_URL, testimonials } from "../lib/site-data";
import { getProductDetail, toProductSlug } from "../lib/product-details";

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
      assert.match(detail?.image ?? "", /^\/images\/.+\.(?:webp|jpg|png)$/);
    }
  }
});
