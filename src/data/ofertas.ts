import type { Turno } from "@/lib/horario";

export interface Oferta {
  id: string;
  titulo: string;
  descricao: string;
  badge: string;
  pratoId?: string; // referência opcional ao menu
}

export const ofertasPorTurno: Record<Exclude<Turno, "fechado">, Oferta[]> = {
  manha: [
    {
      id: "of-manha-1",
      titulo: "Suco Detox + Vitamina",
      descricao: "Comece o dia leve: combo de bebidas naturais por R$ 16,90.",
      badge: "Bom dia · 20% off",
      pratoId: "suco-detox",
    },
    {
      id: "of-manha-2",
      titulo: "Wrap Integral Express",
      descricao: "Wrap + suco verde por R$ 22,90. Ideal para o pré-treino.",
      badge: "Combo manhã",
      pratoId: "wrap-integral",
    },
  ],
  tarde: [
    {
      id: "of-tarde-1",
      titulo: "Tarde Refrescante",
      descricao: "Limonada de Gengibre + Vitamina de Frutas por R$ 18,90.",
      badge: "Café da Tarde · -25%",
      pratoId: "limonada-gengibre",
    },
    {
      id: "of-tarde-2",
      titulo: "Lanche Fit",
      descricao: "Wrap Integral + Suco Verde por R$ 21,90.",
      badge: "Combo tarde",
      pratoId: "wrap-integral",
    },
  ],
  noite: [
    {
      id: "of-noite-1",
      titulo: "Marmita G com 15% off",
      descricao: "Janta reforçada com proteína dupla e salada completa.",
      badge: "Boa noite · 15% off",
      pratoId: "marmita-g",
    },
    {
      id: "of-noite-2",
      titulo: "Marmita Vegana + Suco",
      descricao: "Combo plant-based por R$ 32,90.",
      badge: "Combo noite",
      pratoId: "marmita-vegana",
    },
  ],
};
