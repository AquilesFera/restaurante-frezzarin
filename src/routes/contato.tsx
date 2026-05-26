import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Clock, Smartphone, Mail, Dumbbell } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contato")({
  component: ContatoPage,
  head: () => ({
    meta: [
      { title: "Contato — Restaurante Frezzarin" },
      { name: "description", content: "Entre em contato com o Restaurante Frezzarin. Reservas, encomendas de marmitas e parcerias na Vila Frezzarin, Americana–SP." },
      { property: "og:title", content: "Contato — Restaurante Frezzarin" },
      { property: "og:description", content: "Venha nos visitar na Vila Frezzarin, Americana–SP." },
      { property: "og:url", content: "/contato" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
});

const infos = [
  { icon: MapPin, t: "Endereço", d: "Vila Frezzarin, Americana – SP" },
  { icon: Clock, t: "Horário", d: "Seg–Sex: 11h às 15h · Sáb: 11h às 14h" },
  { icon: Smartphone, t: "Delivery", d: "iFood · Rappi · Uber Eats" },
  { icon: Mail, t: "E-mail", d: "contato@frezzarin.com.br" },
  { icon: Dumbbell, t: "Parceiros", d: "4 academias conveniadas · Desconto para alunos" },
];

function ContatoPage() {
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const fd = new FormData(e.currentTarget);
    const nome = String(fd.get("nome") || "").trim();
    const msg = String(fd.get("mensagem") || "").trim();
    const assunto = String(fd.get("assunto") || "");
    if (!nome || !msg) {
      toast.error("Preencha nome e mensagem.");
      setSending(false);
      return;
    }
    const wa = `https://wa.me/5519000000000?text=${encodeURIComponent(`Olá! Sou ${nome}. Assunto: ${assunto}. ${msg}`)}`;
    window.open(wa, "_blank");
    toast.success("Mensagem aberta no WhatsApp!");
    (e.target as HTMLFormElement).reset();
    setSending(false);
  }

  return (
    <>
      <section className="bg-brand-green-deep text-brand-cream py-24 md:py-32 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[11px] tracking-[0.32em] uppercase text-brand-gold mb-4">Fale Conosco</p>
          <h1 className="font-serif text-5xl md:text-6xl">Entre em <span className="italic-gold">Contato</span></h1>
        </div>
      </section>

      <section className="bg-brand-green-deep pb-24">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12">
          <div className="text-brand-cream">
            <p className="text-[11px] tracking-[0.32em] uppercase text-brand-gold mb-4">Informações</p>
            <h2 className="font-serif text-3xl md:text-4xl">Venha nos <span className="italic-gold">visitar</span></h2>
            <p className="mt-5 text-brand-cream/80">Estamos localizados na Vila Frezzarin, em Americana-SP. Aceitamos reservas de mesa e encomendas de marmitas.</p>

            <div className="mt-10 space-y-6">
              {infos.map(({ icon: Icon, t, d }) => (
                <div key={t} className="flex gap-4">
                  <div className="h-10 w-10 rounded-full border border-brand-gold/40 flex items-center justify-center text-brand-gold shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[11px] tracking-[0.28em] uppercase text-brand-gold">{t}</div>
                    <div className="mt-1 text-sm text-brand-cream/90">{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={onSubmit} className="bg-brand-cream rounded-2xl p-8 md:p-10 shadow-2xl space-y-5">
            <h3 className="font-serif text-2xl text-brand-green-deep">Envie uma mensagem</h3>

            <Field label="Nome completo" name="nome" placeholder="Seu nome" required />
            <Field label="E-mail" name="email" type="email" placeholder="seu@email.com" />
            <Field label="Telefone / WhatsApp" name="telefone" placeholder="(19) 9 0000-0000" />

            <div>
              <label className="block text-[11px] tracking-[0.25em] uppercase text-brand-green-deep mb-2">Assunto</label>
              <select name="assunto" className="w-full bg-white border border-border rounded-lg px-4 py-3 text-sm focus:border-brand-gold outline-none">
                <option>Reserva de mesa</option>
                <option>Encomenda de marmitas</option>
                <option>Plano semanal / mensal</option>
                <option>Parceria com academia</option>
                <option>Outro</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.25em] uppercase text-brand-green-deep mb-2">Mensagem</label>
              <textarea name="mensagem" rows={4} placeholder="Como podemos te ajudar?" className="w-full bg-white border border-border rounded-lg px-4 py-3 text-sm focus:border-brand-gold outline-none resize-none" />
            </div>

            <button type="submit" disabled={sending} className="w-full py-3.5 rounded-full bg-brand-gold text-brand-green-deep text-sm font-semibold tracking-[0.2em] uppercase hover:bg-brand-gold-soft transition-colors disabled:opacity-60">
              {sending ? "Enviando..." : "Enviar Mensagem"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-[11px] tracking-[0.25em] uppercase text-brand-green-deep mb-2">{label}</label>
      <input name={name} type={type} placeholder={placeholder} required={required} className="w-full bg-white border border-border rounded-lg px-4 py-3 text-sm focus:border-brand-gold outline-none" />
    </div>
  );
}
