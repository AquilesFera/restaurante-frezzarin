DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.feedbacks;

CREATE POLICY "Visitors can submit valid feedback"
  ON public.feedbacks
  FOR INSERT
  WITH CHECK (
    char_length(btrim(nome)) BETWEEN 1 AND 80
    AND char_length(btrim(comentario)) BETWEEN 1 AND 500
    AND (nota IS NULL OR nota BETWEEN 1 AND 5)
  );