import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SectionEyebrow } from "@/components/site/SectionEyebrow";
import { menu, categorias, type Categoria } from "@/data/menu";
import { NutritionalModal, useNutritionModal } from "@/components/site/NutritionalModal";
import { MenuQuiz } from "@/components/site/MenuQuiz";

export const Route = createFileRoute("/cardapio")({
  component: CardapioPage,
  head: () => ({
    meta: [
      { title: "Cardápio — Restaurante Frezzarin" },
      { name: "description", content: "Cardápio completo: fit por quilo, marmitas, congelados e bebidas saudáveis. Filtros por categoria, quiz personalizado e informações nutricionais." },
      { property: "og:title", content: "Cardápio — Restaurante Frezzarin" },
      { property: "og:description", content: "Alimentação saudável, saborosa e acessível — para você comer bem todo dia." },
      { property: "og:url", content: "/cardapio" },
    ],
    links: [{ rel: "canonical", href: "/cardapio" }],
  }),
});

function CardapioPage() {
  const [cat, setCat] = useState<"Todos" | Categoria>("Todos");
  const { prato, open, close } = useNutritionModal();

  const filtrados = useMemo(() => cat === "Todos" ? menu : menu.filter((m) => m.categoria === cat), [cat]);

  return (
    <>
      {/* HERO compacto */}
      <section className="relative bg-brand-green-deep text-brand-cream py-24 md:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-gradient-to-b from-transparent via-brand-green/40 to-transparent" />
        <div className="relative max-w-3xl mx-auto px-6">
          <p className="text-[11px] tracking-[0.32em] uppercase text-brand-gold mb-4">O que servimos</p>
          <h1 className="font-serif text-5xl md:text-6xl">Nosso <span className="italic-gold">Cardápio</span></h1>
          <p className="mt-5 text-brand-cream/85">Alimentação saudável, saborosa e acessível — para você comer bem todo dia.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <MenuQuiz />
          </div>
        </div>
      </section>

      {/* FILTROS */}
      <section className="bg-brand-cream sticky top-16 z-30 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-wrap gap-2 justify-center">
          {categorias.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-5 py-2 rounded-full text-xs tracking-[0.18em] uppercase font-medium transition-colors border ${
                cat === c
                  ? "bg-brand-green-deep text-brand-cream border-brand-green-deep"
                  : "bg-white text-brand-green-deep border-border hover:border-brand-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* CARDS */}
      <section className="py-16 md:py-24 bg-brand-cream">
        <div className="mx-auto max-w-7xl px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrados.map((p, i) => (
            <motion.button
              key={p.id}
              type="button"
              onClick={() => open(p)}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              className="group text-left bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={p.imagem} alt={p.nome} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                  {p.tags.slice(0, 2).map((t) => (
                    <span key={t} className="text-[10px] tracking-widest uppercase px-2 py-1 rounded-full bg-white/90 text-brand-green-deep">{t}</span>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-brand-green-deep">{p.nome}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.descricao}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-semibold text-brand-green-deep">{p.preco}</span>
                  <span className="text-[11px] tracking-widest uppercase text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity">Ver detalhes →</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
        {filtrados.length === 0 && (
          <p className="text-center text-muted-foreground mt-10">Nenhum prato nessa categoria.</p>
        )}
      </section>

      <NutritionalModal prato={prato} onClose={close} />
    </>
  );
}
