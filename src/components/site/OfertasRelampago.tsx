import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { useMemo } from "react";
import { useRestaurantStatus } from "@/hooks/use-restaurant-status";
import { ofertasPorTurno } from "@/data/ofertas";
import { SectionEyebrow } from "@/components/site/SectionEyebrow";
import { OfertaCard } from "@/components/site/OfertaCard";
import { Link } from "@tanstack/react-router";

const tituloPorTurno = {
  manha: "Ofertas da Manhã",
  tarde: "Ofertas da Tarde",
  noite: "Ofertas da Noite",
} as const;

export function OfertasRelampago() {
  const { turno, aberto, minutosParaFim } = useRestaurantStatus();

  // Data-alvo (fim do turno) para alimentar o countdown em tempo real
  const fimEm = useMemo(() => {
    if (!aberto || turno === "fechado") return null;
    return new Date(Date.now() + minutosParaFim * 60_000);
  }, [aberto, turno, minutosParaFim]);

  if (!aberto || turno === "fechado") {
    return (
      <section className="py-20 bg-gradient-to-b from-brand-green-deep to-brand-green text-brand-cream">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionEyebrow>Ofertas Relâmpago</SectionEyebrow>
          <h2 className="font-serif text-3xl md:text-4xl mt-2">
            Volte no <span className="italic-gold">horário de funcionamento</span>
          </h2>
          <p className="mt-4 text-brand-cream/80">
            Nossas ofertas relâmpago mudam ao longo do dia. Aberto das 10:30 às 23:00.
          </p>
        </div>
      </section>
    );
  }

  const ofertas = ofertasPorTurno[turno];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-brand-green-deep via-brand-green-deep to-brand-green text-brand-cream">
      {/* decoração */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" aria-hidden>
        <div className="absolute top-10 -left-20 h-80 w-80 rounded-full bg-brand-gold blur-3xl" />
        <div className="absolute bottom-10 -right-20 h-80 w-80 rounded-full bg-brand-gold blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <motion.span
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-[11px] tracking-[0.3em] uppercase font-semibold"
          >
            <Flame className="h-3.5 w-3.5" /> Promoção ativa
          </motion.span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">
            {tituloPorTurno[turno].split(" ")[0]}{" "}
            <span className="italic-gold">
              {tituloPorTurno[turno].split(" ").slice(1).join(" ")}
            </span>
          </h2>
          <p className="mt-3 text-brand-cream/80 text-sm">
            Aproveite enquanto durar. Ofertas mudam a cada turno do dia.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6 lg:gap-8">
          {ofertas.map((o, i) => (
            <OfertaCard key={o.id} oferta={o} fimEm={fimEm} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/cardapio"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-brand-gold/50 text-brand-gold text-xs font-semibold tracking-[0.22em] uppercase hover:bg-brand-gold hover:text-brand-green-deep transition-colors"
          >
            Ver cardápio completo
          </Link>
        </div>
      </div>
    </section>
  );
}
