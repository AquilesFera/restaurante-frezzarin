import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useRestaurantStatus } from "@/hooks/use-restaurant-status";
import { ofertasPorTurno } from "@/data/ofertas";
import { SectionEyebrow } from "@/components/site/SectionEyebrow";

const tituloPorTurno = {
  manha: "Ofertas da Manhã",
  tarde: "Ofertas da Tarde",
  noite: "Ofertas da Noite",
} as const;

export function OfertasRelampago() {
  const { turno, aberto, minutosParaFim } = useRestaurantStatus();

  if (!aberto || turno === "fechado") {
    return (
      <section className="py-16 bg-brand-green-deep text-brand-cream">
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
  const horas = Math.floor(minutosParaFim / 60);
  const min = minutosParaFim % 60;

  return (
    <section className="py-20 bg-gradient-to-b from-brand-green-deep to-brand-green text-brand-cream">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <SectionEyebrow>Ofertas Relâmpago</SectionEyebrow>
          <h2 className="font-serif text-4xl md:text-5xl mt-2">
            {tituloPorTurno[turno].split(" ")[0]}{" "}
            <span className="italic-gold">
              {tituloPorTurno[turno].split(" ").slice(1).join(" ")}
            </span>
          </h2>
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-brand-gold">
            <Zap className="h-4 w-4" /> Termina em {horas > 0 ? `${horas}h ` : ""}
            {min}min
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          {ofertas.map((o, i) => (
            <motion.div
              key={o.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="relative rounded-2xl bg-brand-cream text-brand-green-deep p-6 border border-brand-gold/30 overflow-hidden"
            >
              <span className="absolute top-4 right-4 text-[10px] tracking-widest uppercase bg-brand-gold text-brand-green-deep px-2.5 py-1 rounded-full font-semibold">
                {o.badge}
              </span>
              <Zap className="h-5 w-5 text-brand-gold" />
              <h3 className="mt-3 font-serif text-2xl">{o.titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{o.descricao}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
