// Lógica central de horário do restaurante. Sempre America/Sao_Paulo,
// independente do fuso do navegador do cliente.

export const ABERTURA_MIN = 10 * 60 + 30; // 10:30
export const FECHAMENTO_MIN = 23 * 60;    // 23:00

export type Turno = "manha" | "tarde" | "noite" | "fechado";

/** Retorna hora/minuto/diaSemana no fuso America/Sao_Paulo. */
export function nowInSaoPaulo(date: Date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
  }).formatToParts(date);

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const hour = parseInt(get("hour"), 10);
  const minute = parseInt(get("minute"), 10);
  const weekdayShort = get("weekday"); // Mon, Tue...
  const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return {
    hour,
    minute,
    minutes: hour * 60 + minute,
    weekday: map[weekdayShort] ?? 0,
  };
}

export function isAberto(date: Date = new Date()) {
  const { minutes } = nowInSaoPaulo(date);
  return minutes >= ABERTURA_MIN && minutes < FECHAMENTO_MIN;
}

export function turnoAtual(date: Date = new Date()): Turno {
  const { minutes } = nowInSaoPaulo(date);
  if (minutes < ABERTURA_MIN || minutes >= FECHAMENTO_MIN) return "fechado";
  if (minutes < 14 * 60) return "manha";        // 10:30 – 14:00
  if (minutes < 18 * 60) return "tarde";        // 14:00 – 18:00
  return "noite";                                // 18:00 – 23:00
}

export function minutosParaFimDoTurno(date: Date = new Date()): number {
  const { minutes } = nowInSaoPaulo(date);
  const turno = turnoAtual(date);
  switch (turno) {
    case "manha": return 14 * 60 - minutes;
    case "tarde": return 18 * 60 - minutes;
    case "noite": return FECHAMENTO_MIN - minutes;
    default: return 0;
  }
}

export function formatHora(min: number): string {
  const h = Math.floor(min / 60).toString().padStart(2, "0");
  const m = (min % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}
