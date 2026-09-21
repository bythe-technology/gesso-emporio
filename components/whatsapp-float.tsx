import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <a className="whatsapp-float" href={buildWhatsAppUrl()} target="_blank" rel="noreferrer" aria-label="Falar com a Gesso Empório pelo WhatsApp">
      <MessageCircle aria-hidden="true" />
      <span>Fale com a gente</span>
    </a>
  );
}
