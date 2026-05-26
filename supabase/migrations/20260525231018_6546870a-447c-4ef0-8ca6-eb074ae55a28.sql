
CREATE TABLE public.feedbacks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL CHECK (char_length(nome) BETWEEN 1 AND 80),
  comentario TEXT NOT NULL CHECK (char_length(comentario) BETWEEN 1 AND 500),
  nota SMALLINT CHECK (nota BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read feedbacks"
  ON public.feedbacks FOR SELECT
  USING (true);

CREATE POLICY "Anyone can submit feedback"
  ON public.feedbacks FOR INSERT
  WITH CHECK (true);

CREATE INDEX feedbacks_created_at_idx ON public.feedbacks (created_at DESC);
