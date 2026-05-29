import { useEffect, useState } from "react";

/** Retorna o tempo restante (em segundos) até um Date-alvo. Atualiza a cada 1s. */
export function useCountdown(target: Date | null): {
  total: number;
  horas: number;
  minutos: number;
  segundos: number;
  formatado: string;
  finalizado: boolean;
} {
  const calc = () => {
    if (!target) return 0;
    return Math.max(0, Math.floor((target.getTime() - Date.now()) / 1000));
  };
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(calc());
    const id = setInterval(() => setTotal(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target?.getTime() ?? 0]);

  const horas = Math.floor(total / 3600);
  const minutos = Math.floor((total % 3600) / 60);
  const segundos = total % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return {
    total,
    horas,
    minutos,
    segundos,
    formatado: `${pad(horas)}:${pad(minutos)}:${pad(segundos)}`,
    finalizado: total === 0,
  };
}
