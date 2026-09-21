"use client";

import { Menu, MessageCircle, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const links = [
  { href: "/", label: "Início" },
  { href: "/materiais", label: "Materiais" },
  { href: "/sobre", label: "A loja" },
  { href: "/contato", label: "Contato" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-shell">
        <Link href="/" className="brand" aria-label="Gesso Empório — página inicial">
          <Image src="/images/logo-gesso-emporio.png" alt="Gesso Empório" width={210} height={92} priority />
        </Link>

        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Navegação principal">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} data-active={active} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            );
          })}
          <a className="mobile-quote" href={buildWhatsAppUrl()} target="_blank" rel="noreferrer">
            Pedir orçamento
          </a>
        </nav>

        <a className="header-quote" href={buildWhatsAppUrl()} target="_blank" rel="noreferrer">
          <MessageCircle size={18} aria-hidden="true" />
          Pedir orçamento
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
