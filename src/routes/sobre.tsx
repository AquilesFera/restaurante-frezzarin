import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionEyebrow } from "@/components/site/SectionEyebrow";
import interior from "@/assets/interior-ByLBiY_l.jpg";

export const Route = createFileRoute("/sobre")({
  component: SobrePage,
  head: () => ({
    meta: [
      { title: "Sobre — Restaurante Frezzarin" },
      { name: "description", content: "A história do Frezzarin: um restaurante criado por estudantes com paixão por alimentação saudável e empreendedorismo na Vila Frezzarin." },
      { property: "og:title", content: "Sobre — Restaurante Frezzarin" },
      { property: "og:description", content: "Conheça a história, valores e equipe do Restaurante Frezzarin." },
      { property: "og:url", content: "/sobre" },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
});

const numeros = [
  { n: "12%", l: "Crescimento mercado saudável/ano" },
  { n: "34mil", l: "Academias no Brasil" },
  { n: "65%", l: "Intolerantes à lactose" },
  { n: "4", l: "Academias na Vila Frezzarin" },
];

const valores = [
  { t: "Praticidade", d: "Soluções rápidas que se encaixam na rotina corrida" },
  { t: "Saúde", d: "Ingredientes frescos e opções inclusivas para todos" },
  { t: "Custo-benefício", d: "Preço justo sem comprometer a qualidade" },
  { t: "Confiança", d: "Serviço consistente e alimentos sempre frescos" },
];

const equipe = [
  { i: "GL", n: "Giovana Rodrigues de Lima" },
  { i: "GF", n: "Gustavo Favaro" },
  { i: "NG", n: "Nickolas Alexandre S. D. Gonçalves" },
  { i: "YG", n: "Yasmin Vechi Gomes" },
  { i: "AS", n: "Aquiles Ito Franco e Silva" },
];

function SobrePage() {
  return (
    <>
      <section className="bg-brand-green-deep text-brand-cream py-24 md:py-32 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[11px] tracking-[0.32em] uppercase text-brand-gold mb-4">Nossa História</p>
          <h1 className="font-serif text-5xl md:text-6xl">Sobre o <span className="italic-gold">Frezzarin</span></h1>
          <p className="mt-5 text-brand-cream/85">Um restaurante criado por estudantes com paixão por alimentação saudável e empreendedorismo.</p>
        </div>
      </section>

      <section className="py-24 bg-brand-cream">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-14 items-start">
          <div>
            <SectionEyebrow>A Ideia</SectionEyebrow>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-green-deep">O que nos <span className="italic-gold">motiva</span></h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              O Restaurante Frezzarin nasceu de uma pesquisa que identificou um grande problema na Vila Frezzarin, em Americana-SP: não havia nenhum restaurante fit na região, mesmo com 4 academias ativas e uma crescente busca por alimentação saudável.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Nossa proposta é simples: oferecer refeições rápidas, saborosas e equilibradas para trabalhadores, estudantes e famílias que não têm tempo para cozinhar, mas querem comer bem.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-border">
            <h3 className="font-serif text-2xl text-brand-green-deep mb-6">Nossos Números</h3>
            <div className="grid grid-cols-2 gap-6">
              {numeros.map((n) => (
                <div key={n.l}>
                  <div className="font-serif text-3xl text-brand-gold italic">{n.n}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{n.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <SectionEyebrow>Nossos Valores</SectionEyebrow>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-green-deep">O que nos <span className="italic-gold">guia</span></h2>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map((v, i) => (
              <motion.div
                key={v.t}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-brand-cream rounded-2xl p-7 border border-border"
              >
                <div className="h-1 w-10 bg-brand-gold rounded-full mb-5" />
                <h3 className="font-serif text-xl text-brand-green-deep">{v.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 overflow-hidden">
        <img src={interior} alt="Salão do Restaurante Frezzarin" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-green-deep/85" />
        <div className="relative max-w-4xl mx-auto px-6 text-center text-brand-cream">
          <SectionEyebrow>Quem somos</SectionEyebrow>
          <h2 className="font-serif text-4xl md:text-5xl">Nossa <span className="italic-gold">Equipe</span></h2>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-5 gap-6">
            {equipe.map((e) => (
              <div key={e.n} className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full border border-brand-gold/50 flex items-center justify-center font-serif text-xl italic text-brand-gold">
                  {e.i}
                </div>
                <div className="mt-3 text-sm text-brand-cream/90">{e.n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
