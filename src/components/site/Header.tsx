import { Link } from "@tanstack/react-router";
import { Leaf, Menu, X, Phone } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const { aberto } = useRestaurantStatus();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 text-brand-cream ${
        scrolled
          ? "bg-brand-green-deep/95 backdrop-blur-lg border-b border-brand-gold/15 shadow-lg shadow-brand-green-deep/30"
          : "bg-brand-green-deep/80 backdrop-blur supports-[backdrop-filter]:bg-brand-green-deep/55 border-b border-white/5"
      }`}
    >
      <div className={`mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between transition-all ${scrolled ? "h-14" : "h-16"}`}>
        <Link to="/" className="flex items-center gap-2.5 font-serif text-xl italic text-brand-gold group">
          <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/5 border border-brand-gold/40 group-hover:rotate-12 transition-transform">
            <Leaf className="h-4 w-4 text-brand-gold" />
          </span>
          <span>Frezzarin</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-[12px] tracking-[0.2em] uppercase font-medium">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={l.exact ? { exact: true } : undefined}
              className="relative text-brand-cream/85 hover:text-brand-gold transition-colors data-[status=active]:text-brand-gold group py-1.5"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-brand-gold scale-x-0 group-hover:scale-x-100 data-[status=active]:scale-x-100 origin-left transition-transform" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <CartDrawer />
          <a
            href={aberto ? "https://wa.me/5519999587638?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido%20no%20Frezzarin." : undefined}
            target="_blank" rel="noreferrer"
            aria-disabled={!aberto}
            onClick={(e) => { if (!aberto) e.preventDefault(); }}
            className={`hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-semibold tracking-[0.18em] uppercase transition-all ${
              aberto
                ? "bg-brand-gold text-brand-green-deep hover:bg-brand-gold-soft hover:scale-[1.03] shadow-md shadow-brand-gold/30"
                : "bg-white/10 text-brand-cream/40 cursor-not-allowed"
            }`}
          >
            <Phone className="h-3.5 w-3.5" />
            {aberto ? "(19) 99958-7638" : "Fechado"}
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
        <div className="md:hidden border-t border-brand-gold/10 bg-brand-green-deep">
          <div className="px-6 py-5 flex flex-col gap-3 text-sm tracking-[0.2em] uppercase">
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
            <a
              href="https://wa.me/5519999587638"
              target="_blank" rel="noreferrer"
              className="mt-3 inline-flex items-center justify-center gap-2 py-3 rounded-full bg-brand-gold text-brand-green-deep font-semibold text-[11px] tracking-[0.22em]"
            >
              <Phone className="h-3.5 w-3.5" /> (19) 99958-7638
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
