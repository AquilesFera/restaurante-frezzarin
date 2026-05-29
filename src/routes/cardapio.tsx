import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menu, categorias, refeicoes, type Categoria, type Refeicao } from "@/data/menu";
import { NutritionalModal, useNutritionModal } from "@/components/site/NutritionalModal";
import { MenuQuiz } from "@/components/site/MenuQuiz";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AddToCartButton } from "@/components/site/AddToCartButton";
import { PratoDoDiaCard } from "@/components/site/PratoDoDiaCard";
import { PratoBadge } from "@/components/site/PratoBadge";
import { ofertaParaPrato } from "@/data/ofertas";
import { useRestaurantStatus } from "@/hooks/use-restaurant-status";

export const Route = createFileRoute("/cardapio")({
  component: CardapioPage,
  head: () => ({
    meta: [
      { title: "Cardápio — Restaurante Frezzarin" },
      { name: "description", content: "Cardápio organizado por refeição: almoço, café da tarde e jantar. Prato do Dia, filtros por categoria e pedidos pelo WhatsApp." },
      { property: "og:title", content: "Cardápio — Restaurante Frezzarin" },
      { property: "og:description", content: "Almoço, café da tarde e jantar — alimentação saudável e saborosa todo dia." },
      { property: "og:url", content: "/cardapio" },
    ],
    links: [{ rel: "canonical", href: "/cardapio" }],
  }),
});

function CardapioPage() {
  const { turno } = useRestaurantStatus();
  // Inicia já na aba correspondente ao turno atual
  const inicial: Refeicao =
    turno === "noite" ? "jantar" : turno === "tarde" ? "cafe" : "almoco";
  const [refeicao, setRefeicao] = useState<Refeicao>(inicial);
  const [cat, setCat] = useState<"Todos" | Categoria>("Todos");
  const { prato, open, close } = useNutritionModal();

  const filtrados = useMemo(() => {
    let list = menu.filter((m) => m.refeicao.includes(refeicao));
    if (cat !== "Todos") list = list.filter((m) => m.categoria === cat);
    return list;
  }, [refeicao, cat]);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-brand-green-deep text-brand-cream py-24 md:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-gradient-to-b from-transparent via-brand-green/40 to-transparent" />
        <div className="relative max-w-3xl mx-auto px-6">
          <p className="text-[11px] tracking-[0.32em] uppercase text-brand-gold mb-4">O que servimos</p>
          <h1 className="font-serif text-5xl md:text-6xl">Nosso <span className="italic-gold">Cardápio</span></h1>
          <p className="mt-5 text-brand-cream/85">Selecione a refeição e monte seu pedido.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <MenuQuiz />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-brand-cream">
        <div className="mx-auto max-w-7xl px-6">
          <Tabs value={refeicao} onValueChange={(v) => setRefeicao(v as Refeicao)}>
            <TabsList className="mx-auto flex w-full max-w-2xl bg-white border border-border h-auto p-1.5 rounded-full">
              {refeicoes.map((r) => (
                <TabsTrigger
                  key={r.id}
                  value={r.id}
                  className="flex-1 rounded-full text-xs md:text-sm tracking-[0.18em] uppercase font-medium data-[state=active]:bg-brand-green-deep data-[state=active]:text-brand-cream py-2.5"
                >
                  <span className="mr-1.5" aria-hidden>{r.emoji}</span>{r.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {refeicoes.map((r) => (
              <TabsContent key={r.id} value={r.id} className="mt-10">
                <div className="text-center mb-8">
                  <p className="text-[11px] tracking-[0.28em] uppercase text-brand-gold">
                    {r.label} · {r.horario}
                  </p>
                </div>

                {/* Prato do dia (só no almoço e jantar — refeições principais) */}
                {(r.id === "almoco" || r.id === "jantar") && (
                  <div className="mb-12">
                    <PratoDoDiaCard />
                  </div>
                )}

                {/* Sub-filtros por categoria */}
                <div className="flex flex-wrap gap-2 justify-center mb-10">
                  {categorias.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCat(c)}
                      className={`px-4 py-1.5 rounded-full text-[11px] tracking-[0.18em] uppercase font-medium transition-colors border ${
                        cat === c
                          ? "bg-brand-green-deep text-brand-cream border-brand-green-deep"
                          : "bg-white text-brand-green-deep border-border hover:border-brand-gold"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={`${refeicao}-${cat}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {filtrados.map((p, i) => {
                      const oferta = ofertaParaPrato(turno, p.id);
                      return (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                        className="group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                      >
                        <button
                          type="button"
                          onClick={() => open(p)}
                          className="aspect-[4/3] overflow-hidden relative text-left"
                        >
                          <img
                            src={p.imagem}
                            alt={p.nome}
                            loading="lazy"
                            width={1024}
                            height={768}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                            {oferta && <PratoBadge kind="promocao" />}
                            {p.maisPedido && <PratoBadge kind="mais-pedido" />}
                            {p.novo && <PratoBadge kind="novo" />}
                          </div>
                          <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
                            {p.tags.slice(0, 2).map((t) => (
                              <span
                                key={t}
                                className="text-[10px] tracking-widest uppercase px-2 py-1 rounded-full bg-white/90 text-brand-green-deep"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </button>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="font-serif text-xl text-brand-green-deep">{p.nome}</h3>
                          <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">{p.descricao}</p>
                          <div className="mt-4 flex items-center justify-between gap-3">
                            {oferta ? (
                              <div className="flex flex-col leading-tight">
                                <span className="text-[11px] line-through text-muted-foreground">{oferta.precoAntigo}</span>
                                <span className="font-semibold italic-gold">{oferta.precoNovo}</span>
                              </div>
                            ) : (
                              <span className="font-semibold text-brand-green-deep">{p.preco}</span>
                            )}
                            <AddToCartButton prato={p} />
                          </div>
                          <button
                            type="button"
                            onClick={() => open(p)}
                            className="mt-3 text-[11px] tracking-widest uppercase text-brand-gold hover:underline self-start"
                          >
                            Ver detalhes nutricionais →
                          </button>
                        </div>
                      </motion.div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>

                {filtrados.length === 0 && (
                  <p className="text-center text-muted-foreground mt-10">
                    Nenhum item disponível para essa combinação.
                  </p>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <NutritionalModal prato={prato} onClose={close} />
    </>
  );
}
