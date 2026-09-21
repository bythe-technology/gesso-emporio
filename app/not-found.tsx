import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return <section className="not-found"><div><span>404</span><h1>Essa página saiu da prateleira.</h1><p>Volte ao início para encontrar os materiais e informações da Gesso Empório.</p><Link className="button button-primary" href="/"><ArrowLeft size={18} /> Voltar ao início</Link></div></section>;
}
