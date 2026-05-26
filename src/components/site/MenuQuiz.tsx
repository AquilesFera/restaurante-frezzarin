import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronRight, RotateCcw } from "lucide-react";
import { menu, type Prato, type Porte, type Proteina } from "@/data/menu";

interface Answers {
  porte?: Porte;
  semGluten?: boolean;
  semLactose?: boolean;
  proteina?: Proteina;
  estilo?: "lowcarb" | "fit" | "tradicional";
}

const perguntas = [
  {
    key: "porte" as const,
    titulo: "Você quer uma refeição...",
    options: [
      { v: "leve", l: "Leve", d: "Algo refrescante e rápido" },
      { v: "media", l: "Média", d: "Equilibrada para o dia a dia" },
      { v: "reforcada", l: "Reforçada", d: "Pós-treino, fome de verdade" },
    ],
  },
  {
    key: "semGluten" as const,
    titulo: "Tem restrição a glúten?",
    options: [
      { v: true, l: "Sim", d: "Quero opções sem glúten" },
      { v: false, l: "Não", d: "Pode ter glúten" },
    ],
  },
  {
    key: "semLactose" as const,
    titulo: "Tem restrição a lactose?",
    options: [
      { v: true, l: "Sim", d: "Sem lactose, por favor" },
      { v: false, l: "Não", d: "Pode ter lactose" },
    ],
  },
  {
    key: "proteina" as const,
    titulo: "Qual sua preferência de proteína?",
    options: [
      { v: "frango", l: "Frango", d: "" },
      { v: "peixe", l: "Peixe", d: "" },
      { v: "carne", l: "Carne", d: "" },
      { v: "vegetariano", l: "Vegetariano", d: "" },
      { v: "vegano", l: "Vegano", d: "" },
    ],
  },
  {
    key: "estilo" as const,
    titulo: "Qual estilo combina mais com você?",
    options: [
      { v: "lowcarb", l: "Low Carb", d: "Menos carboidrato" },
      { v: "fit", l: "Fit", d: "Balanceado e proteico" },
      { v: "tradicional", l: "Tradicional", d: "Refeição completa" },
    ],
  },
];

function score(a: Answers, p: Prato): number {
  let s = 0;
  if (a.porte && a.porte === p.porte) s += 3;
  if (a.semGluten && !p.semGluten) s -= 100;
  if (a.semLactose && !p.semLactose) s -= 100;
  if (a.proteina && a.proteina !== "nenhuma") {
    if (a.proteina === p.proteina) s += 4;
    else if (a.proteina === "vegetariano" && (p.proteina === "vegano" || p.proteina === "nenhuma")) s += 2;
    else if (p.proteina === "nenhuma") s += 0;
    else s -= 2;
  }
  if (a.estilo === "lowcarb" && p.lowCarb) s += 3;
  if (a.estilo === "fit" && p.tags.includes("Fit")) s += 3;
  if (a.estilo === "tradicional" && p.categoria === "Marmitas") s += 2;
  return s;
}

export function MenuQuiz() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  function reset() { setStep(0); setAnswers({}); }
  function pick(key: keyof Answers, value: Answers[keyof Answers]) {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    if (step < perguntas.length - 1) setTimeout(() => setStep(step + 1), 120);
    else setTimeout(() => setStep(perguntas.length), 120);
  }

  const sorted = [...menu].map((p) => ({ p, s: score(answers, p) })).sort((a, b) => b.s - a.s);
  const top = sorted[0]?.p;
  const alternativas = sorted.slice(1, 4).map((x) => x.p);
  const showResult = step >= perguntas.length;
  const current = perguntas[step];

  return (
    <>
      <button
        onClick={() => { setOpen(true); reset(); }}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-green-deep text-brand-cream text-sm font-semibold tracking-[0.18em] uppercase hover:bg-brand-green transition-colors"
      >
        <Sparkles className="h-4 w-4 text-brand-gold" /> Fazer Quiz do Cardápio
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-brand-cream w-full md:max-w-2xl md:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="bg-brand-green-deep text-brand-cream px-6 md:px-8 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-4 w-4 text-brand-gold" />
                  <span className="text-xs tracking-[0.25em] uppercase">Quiz do Cardápio</span>
                </div>
                <button onClick={() => setOpen(false)} className="text-brand-cream/70 hover:text-brand-gold text-sm">Fechar</button>
              </div>

              {/* Progress */}
              {!showResult && (
                <div className="h-1 bg-brand-green-deep/10">
                  <div className="h-full bg-brand-gold transition-all" style={{ width: `${((step + 1) / perguntas.length) * 100}%` }} />
                </div>
              )}

              <div className="p-6 md:p-10">
                {!showResult && current ? (
                  <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <p className="text-[11px] tracking-[0.28em] uppercase text-brand-gold mb-3">Pergunta {step + 1} de {perguntas.length}</p>
                    <h3 className="font-serif text-2xl md:text-3xl text-brand-green-deep">{current.titulo}</h3>
                    <div className="mt-7 grid gap-3">
                      {current.options.map((o) => (
                        <button
                          key={String(o.v)}
                          onClick={() => pick(current.key, o.v as Answers[keyof Answers])}
                          className="group flex items-center justify-between text-left px-5 py-4 bg-white border border-border rounded-xl hover:border-brand-gold hover:shadow-md transition-all"
                        >
                          <div>
                            <div className="font-medium text-brand-green-deep">{o.l}</div>
                            {o.d && <div className="text-xs text-muted-foreground mt-0.5">{o.d}</div>}
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : top ? (
                  <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                    <p className="text-[11px] tracking-[0.28em] uppercase text-brand-gold">Recomendação para você</p>
                    <h3 className="font-serif text-3xl md:text-4xl text-brand-green-deep mt-2">{top.nome}</h3>

                    <div className="mt-6 rounded-2xl overflow-hidden border border-border bg-white">
                      <div className="aspect-[16/9] overflow-hidden">
                        <img src={top.imagem} alt={top.nome} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-5">
                        <p className="text-sm text-muted-foreground">{top.descricao}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="font-semibold text-brand-green-deep">{top.preco}</span>
                          <div className="flex gap-1.5 flex-wrap justify-end">
                            {top.tags.slice(0, 3).map((t) => (
                              <span key={t} className="text-[10px] tracking-widest uppercase px-2 py-1 rounded-full bg-brand-green-soft text-brand-green-deep">{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {alternativas.length > 0 && (
                      <>
                        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mt-8 mb-3">Também combinam com você</p>
                        <div className="grid sm:grid-cols-3 gap-3">
                          {alternativas.map((a) => (
                            <div key={a.id} className="bg-white border border-border rounded-xl overflow-hidden">
                              <img src={a.imagem} alt={a.nome} className="w-full aspect-[4/3] object-cover" />
                              <div className="p-3">
                                <div className="text-sm font-medium text-brand-green-deep">{a.nome}</div>
                                <div className="text-xs text-muted-foreground">{a.preco}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    <button
                      onClick={reset}
                      className="mt-8 inline-flex items-center gap-2 text-sm text-brand-green-deep hover:text-brand-gold"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Refazer quiz
                    </button>
                  </motion.div>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
