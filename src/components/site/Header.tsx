import { Link } from "@tanstack/react-router";
import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";
import { CartDrawer } from "@/components/site/CartDrawer";
import { useRestaurantStatus } from "@/hooks/use-restaurant-status";

const links: { to: "/" | "/cardapio" | "/sobre" | "/feedback" | "/contato"; label: string; exact?: boolean }[] = [
  { to: "/", label: "Início", exact: true },
  { to: "/cardapio", label: "Cardápio" },
  { to: "/sobre", label: "Sobre" },
  { to: "/feedback", label: "Avaliações" },
  { to: "/contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { aberto } = useRestaurantStatus();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-brand-green-deep/95 backdrop-blur supports-[backdrop-filter]:bg-brand-green-deep/85 text-brand-cream border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-serif text-xl italic text-brand-gold">
          <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/5 border border-brand-gold/30">
            <Leaf className="h-4 w-4 text-brand-gold" />
          </span>
          <span>Frezzarin</span>
        </Link>

        <nav className="hidden md:flex items-center gap-9 text-[13px] tracking-[0.18em] uppercase font-medium">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={l.exact ? { exact: true } : undefined}
              className="text-brand-cream/85 hover:text-brand-gold transition-colors data-[status=active]:text-brand-gold"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <CartDrawer />
          <a
            href={aberto ? "https://wa.me/5519000000000?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido%20no%20Frezzarin." : undefined}
            target="_blank" rel="noreferrer"
            aria-disabled={!aberto}
            onClick={(e) => { if (!aberto) e.preventDefault(); }}
            className={`hidden md:inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors ${
              aberto
                ? "bg-brand-gold text-brand-green-deep hover:bg-brand-gold-soft"
                : "bg-white/10 text-brand-cream/40 cursor-not-allowed"
            }`}
          >
            {aberto ? "Pedir no WhatsApp" : "Fechado"}
          </a>

          <button
            aria-label="Abrir menu"
            className="md:hidden p-2 text-brand-cream"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-brand-green-deep">
          <div className="px-6 py-4 flex flex-col gap-3 text-sm tracking-widest uppercase">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={l.exact ? { exact: true } : undefined}
                className="text-brand-cream/85 hover:text-brand-gold py-1.5 data-[status=active]:text-brand-gold"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
