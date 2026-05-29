import { useEffect, useState } from "react";
import { isAberto, turnoAtual, minutosParaFimDoTurno, nowInSaoPaulo, type Turno } from "@/lib/horario";

export interface RestaurantStatus {
  aberto: boolean;
  turno: Turno;
  minutosParaFim: number;
  hora: number;
  minuto: number;
  diaSemana: number;
}

/** Atualiza a cada 30s. Sempre America/Sao_Paulo. */
export function useRestaurantStatus(): RestaurantStatus {
  const compute = (): RestaurantStatus => {
    const { hour, minute, weekday } = nowInSaoPaulo();
    return {
      aberto: isAberto(),
      turno: turnoAtual(),
      minutosParaFim: minutosParaFimDoTurno(),
      hora: hour,
      minuto: minute,
      diaSemana: weekday,
    };
  };
  const [status, setStatus] = useState<RestaurantStatus>({
    aberto: true,
    turno: "manha",
    minutosParaFim: 0,
    hora: 10,
    minuto: 30,
    diaSemana: 1,
  });
  useEffect(() => {
    setStatus(compute());
    const id = setInterval(() => setStatus(compute()), 30_000);
    return () => clearInterval(id);
  }, []);
  return status;
}
