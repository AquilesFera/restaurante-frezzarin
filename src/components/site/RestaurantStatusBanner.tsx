import { useRestaurantStatus } from "@/hooks/use-restaurant-status";
import { Clock } from "lucide-react";

export function RestaurantStatusBanner() {
  const { aberto, minutosParaFim } = useRestaurantStatus();

  if (aberto) {
    const horas = Math.floor(minutosParaFim / 60);
    const min = minutosParaFim % 60;
    return (
      <div className="w-full bg-emerald-600 text-white text-[11px] md:text-xs tracking-[0.18em] uppercase">
        <div className="mx-auto max-w-7xl px-6 py-1.5 flex items-center justify-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-200 animate-pulse" />
          Aberto agora · Fechamos em {horas > 0 ? `${horas}h ` : ""}{min}min
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
