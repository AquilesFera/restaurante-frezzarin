import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  nome: string;
  preco: string;
  imagem: string;
  qtd: number;
}

interface CartState {
  items: CartItem[];
  add: (item: Omit<CartItem, "qtd">) => void;
  remove: (id: string) => void;
  setQty: (id: string, qtd: number) => void;
  clear: () => void;
  count: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) =>
        set((s) => {
          const existing = s.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.id === item.id ? { ...i, qtd: i.qtd + 1 } : i,
              ),
            };
          }
          return { items: [...s.items, { ...item, qtd: 1 }] };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      setQty: (id, qtd) =>
        set((s) => ({
          items:
            qtd <= 0
              ? s.items.filter((i) => i.id !== id)
              : s.items.map((i) => (i.id === id ? { ...i, qtd } : i)),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((a, i) => a + i.qtd, 0),
    }),
    { name: "frezzarin-cart-v1" },
  ),
);
