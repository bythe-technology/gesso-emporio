import assert from "node:assert/strict";
import test from "node:test";
import { buildWhatsAppUrl } from "../lib/whatsapp";

test("builds the default WhatsApp link", () => {
  const url = buildWhatsAppUrl();
  assert.match(url, /^https:\/\/wa\.me\/5513996103288\?text=/);
  assert.match(decodeURIComponent(url), /Vim pelo site da Gesso Empório/);
});

test("includes all informed quote fields", () => {
  const url = decodeURIComponent(
    buildWhatsAppUrl({
      name: "Ana",
      city: "Registro",
      category: "Drywall",
      details: "Preciso de placas e perfis",
    }),
  );

  assert.match(url, /Nome: Ana/);
  assert.match(url, /Cidade: Registro/);
  assert.match(url, /Interesse: Drywall/);
  assert.match(url, /Detalhes: Preciso de placas e perfis/);
});
