import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useRestaurantStatus } from "@/hooks/use-restaurant-status";

export function WhatsAppFloatingButton() {
  const { aberto } = useRestaurantStatus();
  const href = "https://wa.me/5519999587638?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido%20no%20Frezzarin.";

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Fale conosco no WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 right-6 z-40 group"
    >
      <span className="absolute inset-0 rounded-full bg-brand-gold/60 animate-ping" aria-hidden />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-gold to-brand-gold-soft text-brand-green-deep shadow-2xl ring-2 ring-white/40 group-hover:scale-110 transition-transform">
        <MessageCircle className="h-6 w-6" />
      </span>
      <span className="absolute right-16 top-1/2 -translate-y-1/2 hidden md:block whitespace-nowrap rounded-full bg-brand-green-deep text-brand-cream text-xs px-3 py-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
        {aberto ? "Pedir pelo WhatsApp" : "Deixe sua mensagem"}
      </span>
    </motion.a>
  );
}
