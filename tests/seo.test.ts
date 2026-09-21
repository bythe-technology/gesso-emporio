import assert from "node:assert/strict";
import test from "node:test";
import sitemap from "../app/sitemap";
import robots from "../app/robots";
import { createBreadcrumbSchema, createPageMetadata } from "../lib/seo";
import { SITE_URL, categories } from "../lib/site-data";

test("builds absolute canonical and social metadata", () => {
  const metadata = createPageMetadata({ title: "Drywall em Registro/SP", description: "Materiais para drywall.", path: "/materiais/gesso-e-drywall" });
  assert.equal(metadata.alternates?.canonical, `${SITE_URL}/materiais/gesso-e-drywall`);
  assert.equal(metadata.openGraph?.url, `${SITE_URL}/materiais/gesso-e-drywall`);
  assert.match(JSON.stringify(metadata.twitter), /summary_large_image/);
});

test("publishes every commercial page in the sitemap and excludes privacy", () => {
  const urls = sitemap().map((entry) => entry.url);
  assert.ok(urls.includes(SITE_URL));
  assert.ok(urls.includes(`${SITE_URL}/materiais`));
  assert.ok(categories.every(({ slug }) => urls.includes(`${SITE_URL}/materiais/${slug}`)));
  assert.ok(!urls.includes(`${SITE_URL}/privacidade`));
});

test("links robots to the canonical sitemap and builds ordered breadcrumbs", () => {
  assert.equal(robots().sitemap, `${SITE_URL}/sitemap.xml`);
  const schema = createBreadcrumbSchema([{ name: "Início", path: "/" }, { name: "Materiais", path: "/materiais" }]);
  assert.deepEqual(schema.itemListElement.map((item) => item.position), [1, 2]);
  assert.equal(schema.itemListElement[1].item, `${SITE_URL}/materiais`);
});
