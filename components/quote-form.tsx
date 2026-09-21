"use client";

import { ArrowUpRight } from "lucide-react";
import { FormEvent, useState } from "react";
import { categories } from "@/lib/site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function QuoteForm({ defaultCategory = "" }: { defaultCategory?: string }) {
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const city = String(form.get("city") ?? "").trim();
    const category = String(form.get("category") ?? "").trim();
    const details = String(form.get("details") ?? "").trim();

    if (!name || !city || !category || !details) {
      setError("Preencha todos os campos para continuar.");
      return;
    }

    setError("");
    window.open(buildWhatsAppUrl({ name, city, category, details }), "_blank", "noopener,noreferrer");
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label>Seu nome<input name="name" autoComplete="name" placeholder="Como podemos chamar você?" /></label>
        <label>Sua cidade<input name="city" autoComplete="address-level2" placeholder="Ex.: Registro" /></label>
      </div>
      <label>Material de interesse
        <select name="category" defaultValue={defaultCategory}>
          <option value="" disabled>Selecione uma categoria</option>
          {categories.map((category) => <option key={category.slug} value={category.name}>{category.name}</option>)}
        </select>
      </label>
      <label>O que você precisa?
        <textarea name="details" rows={4} placeholder="Conte quais materiais, medidas ou quantidades você já tem em mente." />
      </label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button button-primary" type="submit">Montar mensagem no WhatsApp <ArrowUpRight size={18} /></button>
      <small>Ao continuar, abriremos o WhatsApp com a mensagem preenchida. Nada é enviado automaticamente.</small>
    </form>
  );
}
