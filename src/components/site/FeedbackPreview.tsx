import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { SectionEyebrow } from "@/components/site/SectionEyebrow";

interface FeedbackRow {
  id: string;
  nome: string;
  comentario: string;
  nota: number | null;
  created_at: string;
}

export function FeedbackPreview() {
  const [items, setItems] = useState<FeedbackRow[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("feedbacks")
        .select("id, nome, comentario, nota, created_at")
        .order("created_at", { ascending: false })
        .limit(3);
      if (!cancelled && data) setItems(data as FeedbackRow[]);
    })();

    const channel = supabase
      .channel("feedbacks-preview")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "feedbacks" },
        (payload) => {
          const row = payload.new as FeedbackRow;
          setItems((prev) => [row, ...prev].slice(0, 3));
        },
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-brand-green-soft/40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <SectionEyebrow>Quem prova, aprova</SectionEyebrow>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-green-deep">
            O que dizem <span className="italic-gold">de nós</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Atualizado em tempo real conforme novos comentários chegam.</p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {items.map((f) => (
              <motion.article
                key={f.id}
                layout
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow relative"
              >
                <Sparkles className="absolute top-4 right-4 h-4 w-4 text-brand-gold/60" />
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-brand-green-deep text-brand-cream flex items-center justify-center font-serif italic text-sm">
                    {f.nome.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("")}
                  </div>
                  <div>
                    <div className="font-medium text-brand-green-deep text-sm">{f.nome}</div>
                    {f.nota != null && (
                      <div className="flex gap-0.5 mt-0.5">
                        {Array.from({ length: 5 }).map((_, k) => (
                          <Star key={k} className={`h-3 w-3 ${k < f.nota! ? "fill-brand-gold text-brand-gold" : "text-muted-foreground/30"}`} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <p className="mt-4 text-sm text-foreground/85 line-clamp-4 leading-relaxed">{f.comentario}</p>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/feedback"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-brand-green-deep text-brand-cream text-xs font-semibold tracking-[0.22em] uppercase hover:bg-brand-green transition-colors"
          >
            Ver todas as avaliações
          </Link>
        </div>
      </div>
    </section>
  );
}
