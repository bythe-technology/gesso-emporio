import { Camera, Clock3, MapPin, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ADDRESS, INSTAGRAM_URL, MAPS_URL, PHONE_LABEL } from "@/lib/site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main container">
        <div className="footer-brand">
          <Image src="/images/logo-gesso-emporio.png" alt="Gesso Empório" width={230} height={100} />
          <p>O shopping da construção a seco no Vale do Ribeira.</p>
          <span>Venda de materiais. Não realizamos instalação.</span>
        </div>

        <div className="footer-column">
          <strong>Encontre rápido</strong>
          <Link href="/materiais">Todos os materiais</Link>
          <Link href="/sobre">Conheça a loja</Link>
          <Link href="/contato">Contato e localização</Link>
          <Link href="/privacidade">Privacidade</Link>
        </div>

        <div className="footer-column footer-contact">
          <strong>Fale com a gente</strong>
          <a href={buildWhatsAppUrl()} target="_blank" rel="noreferrer"><MessageCircle size={17} />{PHONE_LABEL}</a>
          <a href={MAPS_URL} target="_blank" rel="noreferrer"><MapPin size={17} />{ADDRESS}</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><Camera size={17} />@gessoemporio</a>
          <p><Clock3 size={17} />Seg–sex, 7h30–18h<br />Sábado, 7h30–13h</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <small>© {new Date().getFullYear()} Gesso Empório. Todos os direitos reservados.</small>
          <a className="bythe-badge" href="https://bythe.tech" target="_blank" rel="noreferrer" aria-label="Site desenvolvido por Bythe Technology">
            <span>DESENVOLVIDO POR</span>
            <Image src="/images/bythe-logo.svg" alt="Bythe Technology" width={52} height={26} />
          </a>
        </div>
      </div>
    </footer>
  );
}
