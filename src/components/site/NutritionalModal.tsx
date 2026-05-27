import { useState } from "react";
import { X } from "lucide-react";
import type { Prato } from "@/data/menu";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  prato: Prato | null;
  onClose: () => void;
}

export function NutritionalModal({ prato, onClose }: Props) {
  return (
    <AnimatePresence>
      {prato && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="bg-white w-full md:max-w-2xl rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 md:h-64">
              <img src={prato.imagem} alt={prato.nome} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/95 hover:bg-white flex items-center justify-center shadow"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-5 left-6 right-6">
                <h3 className="font-serif text-3xl text-white drop-shadow">{prato.nome}</h3>
                <p className="text-white/85 text-sm mt-1">{prato.preco}</p>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <p className="text-muted-foreground">{prato.descricao}</p>

              <div className="flex flex-wrap gap-2">
                {prato.tags.map((t) => (
                  <span key={t} className="text-[11px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full bg-brand-green-soft text-brand-green-deep border border-brand-green-deep/10">
                    {t}
                  </span>
                ))}
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-[0.25em] text-brand-gold mb-3">Ingredientes</h4>
                <p className="text-sm text-foreground/90 leading-relaxed">{prato.ingredientes.join(" · ")}</p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-[0.25em] text-brand-gold mb-3">Informação Nutricional <span className="text-muted-foreground/60 normal-case tracking-normal">(por porção)</span></h4>
                <div className="grid grid-cols-4 gap-3 text-center">
                  {[
                    { l: "Kcal", v: prato.calorias },
                    { l: "Proteína", v: `${prato.proteina_g}g` },
                    { l: "Carbo", v: `${prato.carbo_g}g` },
                    { l: "Gordura", v: `${prato.gordura_g}g` },
                  ].map((m) => (
                    <div key={m.l} className="bg-brand-cream rounded-xl py-3 border border-border">
                      <div className="font-serif text-2xl text-brand-green-deep">{m.v}</div>
                      <div className="text-[10px] tracking-widest uppercase text-muted-foreground mt-1">{m.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={`https://wa.me/5519999587638?text=Olá!%20Quero%20pedir%20${encodeURIComponent(prato.nome)}.`}
                target="_blank" rel="noreferrer"
                className="block text-center w-full px-6 py-3.5 rounded-full bg-brand-gold text-brand-green-deep text-sm font-semibold tracking-[0.18em] uppercase hover:bg-brand-gold-soft transition-colors"
              >
                Pedir no WhatsApp
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function useNutritionModal() {
  const [prato, setPrato] = useState<Prato | null>(null);
  return { prato, open: setPrato, close: () => setPrato(null) };
}
