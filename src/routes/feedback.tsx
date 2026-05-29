import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquareQuote } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/feedback")({
  component: FeedbackPage,
  head: () => ({
    meta: [
      { title: "Avaliações — Restaurante Frezzarin" },
      { name: "description", content: "Veja depoimentos de quem já experimentou o Restaurante Frezzarin e deixe a sua avaliação." },
      { property: "og:title", content: "Avaliações — Restaurante Frezzarin" },
      { property: "og:description", content: "Depoimentos reais de clientes do Frezzarin." },
      { property: "og:url", content: "/feedback" },
    ],
    links: [{ rel: "canonical", href: "/feedback" }],
  }),
});

interface FeedbackRow {
  id: string;
  nome: string;
  comentario: string;
  nota: number | null;
  created_at: string;
}

function FeedbackPage() {
  const [items, setItems] = useState<FeedbackRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState("");
  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState<number | null>(null);
  const [sending, setSending] = useState(false);

  async function carregar() {
    try {
      const { data, error } = await supabase
        .from("feedbacks")
        .select("id, nome, comentario, nota, created_at")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      setItems((data ?? []) as FeedbackRow[]);
    } catch (err) {
      console.error("[feedback] load", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
    const channel = supabase
      .channel("feedbacks-page")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "feedbacks" },
        (payload) => {
          const row = payload.new as FeedbackRow;
          setItems((prev) => (prev.some((p) => p.id === row.id) ? prev : [row, ...prev]));
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const n = nome.trim();
    const c = comentario.trim();
    if (!n) return toast.error("Informe seu nome.");
    if (!c) return toast.error("Escreva um comentário.");
    if (n.length > 80) return toast.error("Nome muito longo (máx. 80).");
    if (c.length > 500) return toast.error("Comentário muito longo (máx. 500).");

    setSending(true);
    try {
      const { error } = await supabase
        .from("feedbacks")
        .insert({ nome: n, comentario: c, nota });
      if (error) throw error;
      toast.success("Obrigado pelo seu feedback!");
      setNome(""); setComentario(""); setNota(null);
      await carregar();
    } catch (err) {
      console.error("[feedback] submit", err);
      toast.error("Não foi possível enviar. Tente novamente.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <section className="bg-brand-green-deep text-brand-cream py-24 md:py-32 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[11px] tracking-[0.32em] uppercase text-brand-gold mb-4">Avaliações</p>
          <h1 className="font-serif text-5xl md:text-6xl">O que dizem <span className="italic-gold">de nós</span></h1>
          <p className="mt-5 text-brand-cream/85">Depoimentos reais de quem já provou nossa comida. Deixe o seu também!</p>
        </div>
      </section>

      <section className="py-20 bg-brand-cream">
        <div className="mx-auto max-w-5xl px-6 grid lg:grid-cols-[1fr_1.3fr] gap-12">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-7 md:p-8 border border-border h-fit lg:sticky lg:top-24 shadow-sm">
            <h2 className="font-serif text-2xl text-brand-green-deep">Deixe seu feedback</h2>
            <p className="text-sm text-muted-foreground mt-1">Sua opinião nos ajuda a melhorar cada dia.</p>

            <div className="mt-6">
              <label className="block text-[11px] tracking-[0.25em] uppercase text-brand-green-deep mb-2">Seu nome</label>
              <input value={nome} onChange={(e) => setNome(e.target.value)} maxLength={80} placeholder="Como devemos te chamar?" className="w-full bg-brand-cream border border-border rounded-lg px-4 py-3 text-sm focus:border-brand-gold outline-none" />
            </div>

            <div className="mt-4">
              <label className="block text-[11px] tracking-[0.25em] uppercase text-brand-green-deep mb-2">Nota (opcional)</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" onClick={() => setNota(nota === n ? null : n)} aria-label={`${n} estrelas`} className="p-1.5">
                    <Star className={`h-6 w-6 transition-all ${nota && n <= nota ? "fill-brand-gold text-brand-gold" : "text-muted-foreground/40 hover:text-brand-gold"}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-[11px] tracking-[0.25em] uppercase text-brand-green-deep mb-2">Comentário</label>
              <textarea value={comentario} onChange={(e) => setComentario(e.target.value)} rows={5} maxLength={500} placeholder="Conte como foi sua experiência..." className="w-full bg-brand-cream border border-border rounded-lg px-4 py-3 text-sm focus:border-brand-gold outline-none resize-none" />
              <div className="text-right text-xs text-muted-foreground mt-1">{comentario.length}/500</div>
            </div>

            <button type="submit" disabled={sending} className="mt-5 w-full py-3.5 rounded-full bg-brand-gold text-brand-green-deep text-sm font-semibold tracking-[0.2em] uppercase hover:bg-brand-gold-soft transition-colors disabled:opacity-60">
              {sending ? "Enviando..." : "Enviar Avaliação"}
            </button>
          </form>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-brand-green-deep">
                {loading ? "Carregando..." : `${items.length} depoimento${items.length === 1 ? "" : "s"}`}
              </h2>
              <MessageSquareQuote className="h-5 w-5 text-brand-gold" />
            </div>

            {!loading && items.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 border border-dashed border-border text-center text-muted-foreground">
                Ainda não há avaliações. Seja o primeiro a comentar!
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((f, i) => (
                  <motion.article
                    key={f.id}
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i, 6) * 0.04 }}
                    className="bg-white rounded-2xl p-6 border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-brand-green-deep text-brand-cream flex items-center justify-center font-serif italic text-sm">
                          {initials(f.nome)}
                        </div>
                        <div>
                          <div className="font-medium text-brand-green-deep">{f.nome}</div>
                          <div className="text-xs text-muted-foreground">{formatDate(f.created_at)}</div>
                        </div>
                      </div>
                      {f.nota != null && (
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, k) => (
                            <Star key={k} className={`h-4 w-4 ${k < f.nota! ? "fill-brand-gold text-brand-gold" : "text-muted-foreground/30"}`} />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="mt-4 text-foreground/90 leading-relaxed text-sm whitespace-pre-line">{f.comentario}</p>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function initials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");
}
function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  } catch { return ""; }
}
