import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { menu, type Prato } from "@/data/menu";
import { pratoDoDiaPorDia, nomesDiasSemana } from "@/data/prato-do-dia";
import { useRestaurantStatus } from "@/hooks/use-restaurant-status";
import { AddToCartButton } from "@/components/site/AddToCartButton";

export function PratoDoDiaCard() {
  const { diaSemana } = useRestaurantStatus();
  const id = pratoDoDiaPorDia[diaSemana];
  const prato: Prato | undefined = menu.find((p) => p.id === id);
  if (!prato) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-3xl overflow-hidden border-2 border-brand-gold bg-gradient-to-br from-brand-green-deep to-brand-green text-brand-cream"
    >
      <div className="grid md:grid-cols-2">
        <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
          <img
            src={prato.imagem}
            alt={prato.nome}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <span className="inline-flex self-start items-center gap-2 px-3 py-1 rounded-full bg-brand-gold text-brand-green-deep text-[10px] tracking-[0.22em] uppercase font-bold">
            <Award className="h-3 w-3" /> Prato do Dia · {nomesDiasSemana[diaSemana]}
          </span>
          <h3 className="mt-4 font-serif text-3xl md:text-4xl">{prato.nome}</h3>
          <p className="mt-3 text-brand-cream/85">{prato.descricao}</p>
          <div className="mt-6 flex items-center gap-4">
            <span className="font-serif text-3xl italic-gold">{prato.preco}</span>
            <AddToCartButton prato={prato} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
