import { useCart } from "@/stores/cart";
import { useRestaurantStatus } from "@/hooks/use-restaurant-status";
import { ShoppingCart, Lock } from "lucide-react";
import { toast } from "sonner";
import type { Prato } from "@/data/menu";

interface Props {
  prato: Prato;
  className?: string;
  precoOverride?: string;
  ofertaLabel?: string;
}

export function AddToCartButton({ prato, className = "", precoOverride, ofertaLabel }: Props) {
  const add = useCart((s) => s.add);
  const { aberto } = useRestaurantStatus();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!aberto) {
      toast.error("Estamos fechados agora", {
        description: "Funcionamos das 10:30 às 23:00 (horário de Brasília).",
      });
      return;
    }
    add({
      id: ofertaLabel ? `${prato.id}:${ofertaLabel}` : prato.id,
      nome: ofertaLabel ? `${prato.nome} — ${ofertaLabel}` : prato.nome,
      preco: precoOverride ?? prato.preco,
      imagem: prato.imagem,
    });
    toast.success(`${prato.nome} adicionado ao pedido${ofertaLabel ? " com promoção" : ""}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!aberto}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
        aberto
          ? "bg-brand-gold text-brand-green-deep hover:bg-brand-gold-soft hover:scale-[1.03]"
          : "bg-muted text-muted-foreground cursor-not-allowed"
      } ${className}`}
      aria-label={aberto ? `Adicionar ${prato.nome} ao pedido` : "Restaurante fechado"}
      title={aberto ? "Adicionar ao pedido" : "Restaurante fechado no momento"}
    >
      {aberto ? <ShoppingCart className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
      Adicionar
    </button>
  );
}
