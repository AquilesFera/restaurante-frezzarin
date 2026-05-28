import { Flame, Sparkles, TrendingUp } from "lucide-react";

export type BadgeKind = "promocao" | "mais-pedido" | "novo";

const config: Record<BadgeKind, { label: string; cls: string; Icon: typeof Flame }> = {
  promocao: {
    label: "Promoção",
    cls: "bg-destructive text-destructive-foreground",
    Icon: Flame,
  },
  "mais-pedido": {
    label: "Mais Pedido",
    cls: "bg-brand-green-deep text-brand-cream",
    Icon: TrendingUp,
  },
  novo: {
    label: "Novo",
    cls: "bg-brand-gold text-brand-green-deep",
    Icon: Sparkles,
  },
};

export function PratoBadge({ kind }: { kind: BadgeKind }) {
  const { label, cls, Icon } = config[kind];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] tracking-widest uppercase font-bold shadow-sm ${cls}`}
    >
      <Icon className="h-3 w-3" /> {label}
    </span>
  );
}
