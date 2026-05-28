import { motion } from "framer-motion";
import { menu } from "@/data/menu";
import { SectionEyebrow } from "@/components/site/SectionEyebrow";
import { PratoBadge } from "@/components/site/PratoBadge";
import { AddToCartButton } from "@/components/site/AddToCartButton";
import { ofertaParaPrato } from "@/data/ofertas";
import { useRestaurantStatus } from "@/hooks/use-restaurant-status";

export function PratosMaisVendidos() {
  const { turno } = useRestaurantStatus();
  const pratos = menu.filter((p) => p.maisPedido);
  if (pratos.length === 0) return null;

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <SectionEyebrow>Favoritos da casa</SectionEyebrow>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-green-deep">
            Pratos Mais <span className="italic-gold">Vendidos</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Os queridinhos que os clientes pedem todo dia.</p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pratos.slice(0, 4).map((p, i) => {
            const oferta = ofertaParaPrato(turno, p.id);
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative bg-brand-cream rounded-2xl overflow-hidden border border-border hover:shadow-2xl hover:shadow-brand-gold/20 transition-all"
              >
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
                  <PratoBadge kind="mais-pedido" />
                  {oferta && <PratoBadge kind="promocao" />}
                  {p.novo && <PratoBadge kind="novo" />}
                </div>
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.imagem}
                    alt={p.nome}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg text-brand-green-deep">{p.nome}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{p.descricao}</p>
                  <div className="mt-4 flex items-center justify-between gap-2">
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
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
