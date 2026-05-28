import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import type { Oferta } from "@/data/ofertas";
import { menu } from "@/data/menu";
import { CountdownTimer } from "@/components/site/CountdownTimer";
import { AddToCartButton } from "@/components/site/AddToCartButton";

interface Props {
  oferta: Oferta;
  fimEm: Date | null;
  index?: number;
}

export function OfertaCard({ oferta, fimEm, index = 0 }: Props) {
  const prato = menu.find((p) => p.id === oferta.pratoId);
  if (!prato) return null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative rounded-3xl overflow-hidden bg-brand-cream border border-brand-gold/40 shadow-xl shadow-brand-green-deep/20"
    >
      {/* PROMO ribbon */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-4 left-4 z-10 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-destructive text-destructive-foreground text-[10px] tracking-[0.22em] uppercase font-bold shadow-lg"
      >
        <Flame className="h-3 w-3" /> {oferta.desconto}% OFF
      </motion.div>
      <span className="absolute top-4 right-4 z-10 text-[10px] tracking-[0.22em] uppercase bg-brand-gold text-brand-green-deep px-2.5 py-1 rounded-full font-semibold">
        {oferta.badge}
      </span>

      <div className="grid md:grid-cols-[1.05fr_1fr]">
        <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
          <img
            src={prato.imagem}
            alt={prato.nome}
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="p-6 md:p-7 flex flex-col">
          <p className="text-[11px] tracking-[0.28em] uppercase text-brand-green-deep/70">
            {prato.nome}
          </p>
          <h3 className="mt-2 font-serif text-2xl md:text-3xl text-brand-green-deep leading-tight">
            {oferta.titulo}
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">{oferta.descricao}</p>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-sm text-muted-foreground line-through">
              {oferta.precoAntigo}
            </span>
            <span className="font-serif text-3xl md:text-4xl italic-gold">
              {oferta.precoNovo}
            </span>
          </div>

          <div className="mt-4">
            <p className="text-[10px] tracking-[0.28em] uppercase text-brand-green-deep/60 mb-1.5">
              Termina em
            </p>
            <CountdownTimer target={fimEm} variant="light" />
          </div>

          <div className="mt-5">
            <AddToCartButton prato={prato} className="w-full justify-center py-2.5" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
