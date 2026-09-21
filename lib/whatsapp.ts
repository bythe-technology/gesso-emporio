import { WHATSAPP_NUMBER } from "@/lib/site-data";

export type QuoteRequest = {
  name?: string;
  city?: string;
  category?: string;
  details?: string;
};

export function buildWhatsAppUrl(data: QuoteRequest = {}) {
  const lines = [
    "Olá! Vim pelo site da Gesso Empório e gostaria de falar sobre materiais.",
    data.name ? `Nome: ${data.name}` : undefined,
    data.city ? `Cidade: ${data.city}` : undefined,
    data.category ? `Interesse: ${data.category}` : undefined,
    data.details ? `Detalhes: ${data.details}` : undefined,
  ].filter(Boolean);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}
