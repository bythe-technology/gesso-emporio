import assert from "node:assert/strict";
import test from "node:test";
import { categories, MAPS_EMBED_URL, testimonials } from "../lib/site-data";

test("every material category has a photographic asset and accessible description", () => {
  assert.equal(categories.length, 8);

  for (const category of categories) {
    assert.match(category.image, /^\/images\/.+\.(?:webp|jpg|png)$/);
    assert.ok(category.imageAlt.length > 20);
    assert.match(category.productImageUrl, /^https:\/\//);
    assert.ok(category.productImageAlt.length > 15);
    assert.ok(category.items.length > 0);
  }
});

test("publishes the verified Google review summary and map embed", () => {
  assert.ok(testimonials.length >= 6);
  assert.match(MAPS_EMBED_URL, /^https:\/\/www\.google\.com\/maps\?/);
  assert.match(MAPS_EMBED_URL, /output=embed$/);
});
