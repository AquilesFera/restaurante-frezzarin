import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Check } from "lucide-react";
import { SectionEyebrow, Ornament } from "@/components/site/SectionEyebrow";
import { menu } from "@/data/menu";
import { OfertasRelampago } from "@/components/site/OfertasRelampago";
import { PratoDoDiaCard } from "@/components/site/PratoDoDiaCard";
import { PratosMaisVendidos } from "@/components/site/PratosMaisVendidos";
import { FeedbackPreview } from "@/components/site/FeedbackPreview";
import interior from "@/assets/interior-ByLBiY_l.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Restaurante Frezzarin — Saúde e Sabor para Todos" },
      { name: "description", content: "Refeições fit por quilo, marmitas saudáveis e congelados sem glúten, sem lactose, veganos e low carb. Vila Frezzarin, Americana–SP." },
      { property: "og:title", content: "Restaurante Frezzarin — Saúde e Sabor para Todos" },
      { property: "og:description", content: "Comida de verdade, sem complicação. Vila Frezzarin, Americana–SP." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const proposta = ["Sem Glúten", "Sem Lactose", "Low Carb", "Vegano", "Fit por Quilo", "Marmitas"];

function Index() {
  const destaque = menu.slice(0, 6);
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={interior} alt="Interior do Restaurante Frezzarin com mesas de madeira e plantas" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-green-deep/85 via-brand-green-deep/60 to-brand-green-deep/85" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-brand-gold/40 bg-brand-green-deep/40 backdrop-blur text-[11px] tracking-[0.28em] uppercase text-brand-gold">
            🌿 Americana – SP · Vila Frezzarin
          </span>
          <h1 className="mt-8 font-serif text-5xl md:text-7xl lg:text-8xl text-brand-cream leading-[1.02]">
            Saúde e <span className="italic-gold">Sabor</span><br />Para Todos
          </h1>
          <p className="mt-6 text-brand-cream/85 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Refeições fit, saborosas e com qualidade caseira — pensadas para quem vive na correria mas não abre mão de comer bem.
          </p>
          <div className="mt-9 flex flex-wrap gap-4 justify-center">
            <Link to="/cardapio" className="px-7 py-3.5 rounded-full bg-brand-gold text-brand-green-deep text-sm font-semibold tracking-[0.18em] uppercase hover:bg-brand-gold-soft transition-all hover:scale-[1.02]">
              Ver Cardápio
            </Link>
            <Link to="/sobre" className="px-7 py-3.5 rounded-full border border-brand-cream/40 text-brand-cream text-sm font-semibold tracking-[0.18em] uppercase hover:border-brand-gold hover:text-brand-gold transition-colors">
              Nossa História
            </Link>
          </div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-brand-cream/70 text-xs tracking-[0.3em] uppercase flex flex-col items-center gap-2 animate-bounce">
          Rolar <ChevronDown className="h-4 w-4" />
        </div>
      </section>

      {/* STATS */}
      <section className="bg-brand-green-deep text-brand-cream py-14 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6 grid grid-cols-3 gap-6 text-center">
          {[
            { n: "+30", l: "Opções saudáveis" },
            { n: "4", l: "Academias parceiras" },
            { n: "30min", l: "Entrega delivery" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-serif text-4xl md:text-5xl text-brand-gold italic">{s.n}</div>
              <div className="mt-2 text-xs md:text-sm tracking-[0.2em] uppercase text-brand-cream/70">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* OFERTAS RELÂMPAGO */}
      <OfertasRelampago />

      {/* PROPOSTA */}
      <section className="py-24 md:py-32 bg-brand-cream">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <SectionEyebrow>Nossa Proposta</SectionEyebrow>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-brand-green-deep">
              Comida de <span className="italic-gold">verdade</span>,<br />sem complicação
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              O Restaurante Frezzarin nasceu da ideia de que alimentação saudável precisa ser prática e acessível. Servimos comida fit por quilo, marmitas especiais e congelados saudáveis — sem glúten, sem lactose e cheios de sabor.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {proposta.map((p) => (
              <div key={p} className="flex items-center gap-2 bg-white border border-border rounded-xl px-4 py-3 text-sm">
                <Check className="h-4 w-4 text-brand-gold" /> {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRATO DO DIA EM DESTAQUE */}
      <section className="py-16 bg-brand-cream">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-8">
            <SectionEyebrow>Destaque de hoje</SectionEyebrow>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-green-deep">
              Prato do <span className="italic-gold">Dia</span>
            </h2>
          </div>
          <PratoDoDiaCard />
        </div>
      </section>

      <Ornament />

      {/* CARDÁPIO PRÉVIA */}
      <section className="py-20 md:py-28 bg-brand-cream">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <SectionEyebrow>O que servimos</SectionEyebrow>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-green-deep">
              Nosso <span className="italic-gold">Cardápio</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              Pratos pensados com carinho, balanceados por nutricionistas e preparados com ingredientes frescos.
            </p>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destaque.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
                className="group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.imagem} alt={p.nome} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-brand-green-deep">{p.nome}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.descricao}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-semibold text-brand-green-deep">{p.preco}</span>
                    <span className="text-[10px] tracking-widest uppercase text-brand-gold">{p.tags[0]}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link to="/cardapio" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-green-deep text-brand-cream text-sm font-semibold tracking-[0.18em] uppercase hover:bg-brand-green transition-colors">
              Ver cardápio completo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
