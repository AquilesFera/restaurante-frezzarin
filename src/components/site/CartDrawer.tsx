import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/stores/cart";
import { useRestaurantStatus } from "@/hooks/use-restaurant-status";
import { ShoppingBag, Plus, Minus, Trash2, MessageCircle } from "lucide-react";
import { useMemo, useState } from "react";

function parsePreco(p: string): number {
  // "R$ 18,90" | "R$ 28/kg" -> número aproximado para totalização
  const m = p.replace(/[^\d,]/g, "").replace(",", ".");
  return parseFloat(m) || 0;
}

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const { aberto } = useRestaurantStatus();

  const total = useMemo(
    () => items.reduce((a, i) => a + parsePreco(i.preco) * i.qtd, 0),
    [items],
  );

  const wppMessage = useMemo(() => {
    if (items.length === 0) return "";
    const linhas = items
      .map((i) => `• ${i.qtd}x ${i.nome} — ${i.preco}`)
      .join("%0A");
    return `Olá! Quero fazer um pedido no Frezzarin:%0A%0A${linhas}%0A%0ATotal aprox.: R$ ${total
      .toFixed(2)
      .replace(".", ",")}`;
  }, [items, total]);

  const totalItens = items.reduce((a, i) => a + i.qtd, 0);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Abrir carrinho"
          className="relative inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/5 border border-brand-gold/30 hover:bg-white/10 transition-colors"
        >
          <ShoppingBag className="h-4 w-4 text-brand-gold" />
          {totalItens > 0 && (
            <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-brand-gold text-brand-green-deep text-[10px] font-bold flex items-center justify-center">
              {totalItens}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl text-brand-green-deep">
            Seu Pedido
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm py-10">
              Seu carrinho está vazio. Volte ao cardápio e adicione algo gostoso!
            </p>
          ) : (
            items.map((i) => (
              <div
                key={i.id}
                className="flex gap-3 bg-white border border-border rounded-xl p-3"
              >
                <img
                  src={i.imagem}
                  alt={i.nome}
                  className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-medium text-sm text-brand-green-deep line-clamp-1">
                      {i.nome}
                    </div>
                    <button
                      onClick={() => remove(i.id)}
                      className="text-muted-foreground hover:text-destructive"
                      aria-label="Remover"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-xs text-muted-foreground">{i.preco}</div>
                  <div className="mt-2 inline-flex items-center gap-2 bg-brand-cream rounded-full px-1 py-0.5">
                    <button
                      onClick={() => setQty(i.id, i.qtd - 1)}
                      className="h-6 w-6 rounded-full bg-white hover:bg-brand-gold/20 flex items-center justify-center"
                      aria-label="Diminuir"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{i.qtd}</span>
                    <button
                      onClick={() => setQty(i.id, i.qtd + 1)}
                      className="h-6 w-6 rounded-full bg-white hover:bg-brand-gold/20 flex items-center justify-center"
                      aria-label="Aumentar"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total aproximado</span>
              <span className="font-serif text-2xl text-brand-green-deep">
                R$ {total.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              * Itens vendidos por quilo são estimativas. O valor final é confirmado no
              atendimento.
            </p>
            <a
              href={
                aberto
                  ? `https://wa.me/5519000000000?text=${wppMessage}`
                  : undefined
              }
              target="_blank"
              rel="noreferrer"
              aria-disabled={!aberto}
              onClick={(e) => {
                if (!aberto) e.preventDefault();
              }}
              className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold tracking-[0.18em] uppercase transition-all ${
                aberto
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              <MessageCircle className="h-4 w-4" />
              {aberto ? "Finalizar no WhatsApp" : "Restaurante fechado"}
            </a>
            <button
              onClick={clear}
              className="w-full text-xs text-muted-foreground hover:text-destructive py-2"
            >
              Limpar carrinho
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
