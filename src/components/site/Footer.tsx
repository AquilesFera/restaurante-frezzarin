import { Link } from "@tanstack/react-router";
import { Leaf, Instagram, MapPin, Clock, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-green-deep text-brand-cream/85 mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-serif text-2xl italic text-brand-gold mb-3">
            <Leaf className="h-5 w-5" />
            <span>Frezzarin</span>
          </div>
          <p className="text-sm leading-relaxed text-brand-cream/70">
            Comida fit, saborosa e acessível — feita com carinho na Vila Frezzarin, Americana–SP.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-brand-gold mb-4">Navegação</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-brand-gold">Início</Link></li>
            <li><Link to="/cardapio" className="hover:text-brand-gold">Cardápio</Link></li>
            <li><Link to="/sobre" className="hover:text-brand-gold">Sobre</Link></li>
            <li><Link to="/feedback" className="hover:text-brand-gold">Avaliações</Link></li>
            <li><Link to="/contato" className="hover:text-brand-gold">Contato</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-brand-gold mb-4">Visite-nos</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-brand-gold" /> Vila Frezzarin, Americana–SP</li>
            <li className="flex gap-2"><Clock className="h-4 w-4 mt-0.5 text-brand-gold" /> Seg–Sex 11h–15h · Sáb 11h–14h</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-brand-gold" /> contato@frezzarin.com.br</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-brand-gold mb-4">Pedidos</h4>
          <p className="text-sm mb-4 text-brand-cream/70">Entrega via iFood · Rappi · Uber Eats</p>
          <a
            href="https://wa.me/5519999587638?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido%20no%20Frezzarin."
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold text-brand-green-deep text-xs font-semibold tracking-wider uppercase hover:bg-brand-gold-soft transition-colors"
          >
            WhatsApp (19) 99958-7638
          </a>
          <a href="#" aria-label="Instagram" className="mt-5 inline-flex items-center gap-2 text-sm hover:text-brand-gold">
            <Instagram className="h-4 w-4" /> @restaurantefrezzarin
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 text-xs text-brand-cream/60 flex flex-wrap justify-between gap-3">
          <span>© {new Date().getFullYear()} Restaurante Frezzarin. Todos os direitos reservados.</span>
          <span>Vila Frezzarin · Americana–SP · CNPJ 00.000.000/0001-00</span>
        </div>
      </div>
    </footer>
  );
}
