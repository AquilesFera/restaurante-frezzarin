import { AnimatePresence, motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-green-deep"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mx-auto h-16 w-16 rounded-full bg-white/5 border border-brand-gold/40 flex items-center justify-center"
            >
              <Leaf className="h-7 w-7 text-brand-gold" />
            </motion.div>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-5 font-serif italic text-3xl text-brand-gold"
            >
              Frezzarin
            </motion.p>
            <div className="mt-4 flex justify-center gap-1.5 text-brand-gold/70 text-xs tracking-[0.4em] uppercase">
              <span className="animate-pulse">Saúde</span>
              <span>·</span>
              <span className="animate-pulse" style={{ animationDelay: "0.3s" }}>Sabor</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
