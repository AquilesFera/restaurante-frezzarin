import { useRestaurantStatus } from "@/hooks/use-restaurant-status";
import { FECHAMENTO_MIN } from "@/lib/horario";
import { Clock } from "lucide-react";

const TURNO_LABEL: Record<string, string> = {
  manha: "Almoço",
  tarde: "Café da Tarde",
  noite: "Jantar",
  fechado: "Fechado",
};

export function RestaurantStatusBanner() {
  const { aberto, turno, hora, minuto } = useRestaurantStatus();

  if (aberto) {
    // Sempre conta o tempo total até o fechamento definitivo (23:00),
    // não apenas até o fim do turno atual.
    const minutosAteFechar = FECHAMENTO_MIN - (hora * 60 + minuto);
    const horas = Math.floor(minutosAteFechar / 60);
    const min = minutosAteFechar % 60;
    const tempo = horas > 0 ? `${horas}h${min.toString().padStart(2, "0")}` : `${min}min`;
    const label = TURNO_LABEL[turno] ?? "";
    return (
      <div className="w-full bg-emerald-600 text-white text-[11px] md:text-xs tracking-[0.18em] uppercase">
        <div className="mx-auto max-w-7xl px-6 py-1.5 flex items-center justify-center gap-2 text-center">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-200 animate-pulse" />
          <span>
            Aberto · {label} · Fechamos em {tempo} (às 23:00)
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full bg-red-700 text-white text-[11px] md:text-xs tracking-[0.18em] uppercase">
      <div className="mx-auto max-w-7xl px-6 py-1.5 flex items-center justify-center gap-2">
        <Clock className="h-3 w-3" />
        Fechado · Funcionamos das 10:30 às 23:00 (horário de Brasília)
      </div>
    </div>
  );
}
