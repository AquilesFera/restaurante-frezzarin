CREATE TABLE IF NOT EXISTS public.feedbacks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL CHECK (char_length(nome) BETWEEN 1 AND 80),
  comentario TEXT NOT NULL CHECK (char_length(comentario) BETWEEN 1 AND 500),
  nota SMALLINT CHECK (nota BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.feedbacks TO anon;
GRANT SELECT, INSERT ON public.feedbacks TO authenticated;
GRANT ALL ON public.feedbacks TO service_role;

ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'feedbacks'
      AND policyname = 'Anyone can read feedbacks'
  ) THEN
    CREATE POLICY "Anyone can read feedbacks"
      ON public.feedbacks
      FOR SELECT
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'feedbacks'
      AND policyname = 'Anyone can submit feedback'
  ) THEN
    CREATE POLICY "Anyone can submit feedback"
      ON public.feedbacks
      FOR INSERT
      WITH CHECK (true);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS feedbacks_created_at_idx ON public.feedbacks (created_at DESC);

ALTER TABLE public.feedbacks REPLICA IDENTITY FULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'feedbacks'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.feedbacks;
  END IF;
END $$;