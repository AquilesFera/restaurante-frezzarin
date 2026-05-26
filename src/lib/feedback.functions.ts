import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const FeedbackSchema = z.object({
  nome: z.string().trim().min(1).max(80),
  comentario: z.string().trim().min(1).max(500),
  nota: z.number().int().min(1).max(5).nullable().optional(),
});

export const listFeedbacks = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("feedbacks")
    .select("id, nome, comentario, nota, created_at")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) {
    console.error("listFeedbacks", error);
    return { items: [] as Array<{ id: string; nome: string; comentario: string; nota: number | null; created_at: string }> };
  }
  return { items: data ?? [] };
});

export const submitFeedback = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => FeedbackSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("feedbacks").insert({
      nome: data.nome,
      comentario: data.comentario,
      nota: data.nota ?? null,
    });
    if (error) {
      console.error("submitFeedback", error);
      throw new Error("Falha ao enviar feedback");
    }
    return { ok: true };
  });
