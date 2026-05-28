import { Clock } from "lucide-react";
import { useCountdown } from "@/hooks/use-countdown";

interface Props {
  target: Date | null;
  className?: string;
  variant?: "light" | "dark";
}

export function CountdownTimer({ target, className = "", variant = "light" }: Props) {
  const { horas, minutos, segundos, finalizado } = useCountdown(target);

  if (finalizado) {
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${className}`}>
        <Clock className="h-3.5 w-3.5" /> Oferta encerrada
      </span>
    );
  }

  const pad = (n: number) => n.toString().padStart(2, "0");
  const boxBase =
    variant === "dark"
      ? "bg-brand-green-deep text-brand-gold border border-brand-gold/30"
      : "bg-brand-cream text-brand-green-deep border border-brand-green-deep/10";

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <Clock className="h-3.5 w-3.5 opacity-70" />
      <div className="flex items-center gap-1 font-mono text-sm tabular-nums">
        <span className={`${boxBase} rounded-md px-2 py-1 font-semibold`}>{pad(horas)}</span>
        <span className="opacity-60">:</span>
        <span className={`${boxBase} rounded-md px-2 py-1 font-semibold`}>{pad(minutos)}</span>
        <span className="opacity-60">:</span>
        <span className={`${boxBase} rounded-md px-2 py-1 font-semibold`}>{pad(segundos)}</span>
      </div>
    </div>
  );
}
