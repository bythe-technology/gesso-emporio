import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/social-icons";

export function WhatsAppFloat() {
  return (
    <a className="whatsapp-float" href={buildWhatsAppUrl()} target="_blank" rel="noreferrer" aria-label="Falar com a Gesso Empório pelo WhatsApp">
      <WhatsAppIcon width={24} height={24} />
      <span>Fale com a gente</span>
    </a>
  );
}
