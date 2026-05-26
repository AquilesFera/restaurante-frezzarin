export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] tracking-[0.32em] uppercase text-brand-gold font-medium mb-4">
      {children}
    </p>
  );
}

export function Ornament() {
  return (
    <div className="flex justify-center items-center gap-2 text-brand-gold/70 my-6 text-sm select-none">
      <span>✦</span><span>✦</span><span>✦</span>
    </div>
  );
}
