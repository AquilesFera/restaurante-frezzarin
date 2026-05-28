import type { Turno } from "@/lib/horario";

export interface Oferta {
  id: string;
  titulo: string;
  descricao: string;
  badge: string;
  pratoId: string;          // referência obrigatória ao menu (imagem/nome)
  precoAntigo: string;      // ex: "R$ 24,90"
  precoNovo: string;        // ex: "R$ 19,90"
  desconto: number;         // 15 = 15% off
}

export const ofertasPorTurno: Record<Exclude<Turno, "fechado">, Oferta[]> = {
  manha: [
    {
      id: "of-manha-1",
      titulo: "Combo Detox Manhã",
      descricao: "Suco Detox Verde + Vitamina de Frutas. Comece o dia leve.",
      badge: "Bom dia",
      pratoId: "suco-detox",
      precoAntigo: "R$ 21,80",
      precoNovo: "R$ 16,90",
      desconto: 22,
    },
    {
      id: "of-manha-2",
      titulo: "Wrap Integral Express",
      descricao: "Wrap integral + Suco Verde. Ideal para o pré-treino.",
      badge: "Combo Manhã",
      pratoId: "wrap-integral",
      precoAntigo: "R$ 29,80",
      precoNovo: "R$ 22,90",
      desconto: 23,
    },
  ],
  tarde: [
    {
      id: "of-tarde-1",
      titulo: "Tarde Refrescante",
      descricao: "Limonada de Gengibre + Vitamina de Frutas. Recarregue a tarde.",
      badge: "Café da Tarde",
      pratoId: "limonada-gengibre",
      precoAntigo: "R$ 22,80",
      precoNovo: "R$ 18,90",
      desconto: 17,
    },
    {
      id: "of-tarde-2",
      titulo: "Lanche Fit",
      descricao: "Wrap Integral + Suco Verde Premium pela metade do preço.",
      badge: "Combo Tarde",
      pratoId: "wrap-integral",
      precoAntigo: "R$ 29,80",
      precoNovo: "R$ 21,90",
      desconto: 27,
    },
  ],
  noite: [
    {
      id: "of-noite-1",
      titulo: "Marmita G — 15% OFF",
      descricao: "Janta reforçada com proteína dupla e salada completa.",
      badge: "Boa noite",
      pratoId: "marmita-g",
      precoAntigo: "R$ 24,90",
      precoNovo: "R$ 21,15",
      desconto: 15,
    },
    {
      id: "of-noite-2",
      titulo: "Marmita Vegana + Suco",
      descricao: "Combo plant-based com Suco Detox por preço especial.",
      badge: "Combo Noite",
      pratoId: "marmita-vegana",
      precoAntigo: "R$ 37,80",
      precoNovo: "R$ 32,90",
      desconto: 13,
    },
  ],
};

/** Lista plana de ids de pratos em oferta para um dado turno. */
export function pratosEmOferta(turno: Turno): string[] {
  if (turno === "fechado") return [];
  return ofertasPorTurno[turno].map((o) => o.pratoId);
}

/** Procura a oferta ativa para um pratoId no turno corrente. */
export function ofertaParaPrato(turno: Turno, pratoId: string): Oferta | undefined {
  if (turno === "fechado") return undefined;
  return ofertasPorTurno[turno].find((o) => o.pratoId === pratoId);
}
