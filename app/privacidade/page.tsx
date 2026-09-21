import type { Metadata } from "next";

export const metadata: Metadata = { title: "Política de privacidade", robots: { index: true, follow: true } };

export default function PrivacyPage() {
  return (
    <section className="section legal-page"><div className="container legal-content"><span className="eyebrow eyebrow-dark"><span /> Transparência</span><h1>Política de privacidade</h1><p>Última atualização: 21 de setembro de 2026.</p><h2>Informações tratadas</h2><p>Este site não possui cadastro, área de login ou banco de dados de clientes. O formulário de contato organiza os dados informados por você e abre o WhatsApp com uma mensagem pronta. A mensagem só é enviada quando você confirma o envio no próprio WhatsApp.</p><h2>Contato pelo WhatsApp</h2><p>Ao iniciar uma conversa, o tratamento das informações passa a ocorrer nos canais da Gesso Empório e também conforme as políticas do WhatsApp. Use esse canal apenas para informações relacionadas ao atendimento e à compra de materiais.</p><h2>Dados técnicos</h2><p>O provedor de hospedagem pode processar dados técnicos necessários à segurança e ao funcionamento do site, como endereço IP, tipo de navegador e registros de acesso.</p><h2>Seus direitos</h2><p>Você pode solicitar informações, correção ou exclusão de dados compartilhados diretamente com a Gesso Empório por meio do WhatsApp informado neste site.</p></div></section>
  );
}
