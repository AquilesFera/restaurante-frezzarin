// Mapa fixo Prato do Dia por dia da semana (0=Dom ... 6=Sáb).
// IDs precisam existir em src/data/menu.ts.
export const pratoDoDiaPorDia: Record<number, string> = {
  0: "marmita-vegana",     // Domingo
  1: "frango-grelhado",    // Segunda
  2: "marmita-p",          // Terça
  3: "tilapia",            // Quarta — Tilápia
  4: "marmita-g",          // Quinta
  5: "marmita-sem-gluten", // Sexta
  6: "salada-mediterranea",// Sábado
};

export const nomesDiasSemana = [
  "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado",
];
