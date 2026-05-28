
# Plano de Profissionalização do Restaurante Frezzarin

Foco: experiência visual premium + Supabase realtime + ofertas relâmpago profissionais. Mantém a identidade (verde profundo + dourado + creme + serif itálica).

## 1. Supabase — Feedback em Tempo Real

- Garantir que a tabela `feedbacks` (já existente) tem Realtime habilitado via migration (`alter publication supabase_realtime add table public.feedbacks` + `replica identity full`).
- Refatorar `src/routes/feedback.tsx`:
  - Subscrição via `supabase.channel('feedbacks').on('postgres_changes', { event: 'INSERT' })` para inserir novos comentários no topo da lista sem reload.
  - Animação `framer-motion` `AnimatePresence` com entrada suave (fade + slide) para novos itens.
  - Skeleton loading enquanto carrega.
  - Validação com `zod` (nome ≤80, comentário ≤500, nota 1–5).
- Criar componente reutilizável `FeedbackCard` + `FeedbackForm`.
- Adicionar uma **seção compacta de avaliações** na home (`/`) puxando os 3 mais recentes (também com realtime, opcional).

## 2. Novas Imagens do Cardápio (geradas via imagegen, qualidade premium/standard)

Substituir/gerar em `src/assets/menu/` (sobrescrevendo caminhos atuais):

- Patinho Grelhado
- Feijão Preto Caseiro
- Panqueca de Frango
- Escondidinho de Batata Doce
- Suco de Melancia com Limão
- Suco de Acerola
- Água de Coco Natural

Estilo: foto realista de restaurante, luz natural lateral, fundo madeira escura/linho, prato cerâmica, vapor sutil quando aplicável. Atualizar `src/data/menu.ts` para apontar para os novos arquivos importados como ES modules.

## 3. Ofertas Relâmpago Premium

Reescrever `src/components/site/OfertasRelampago.tsx`:

- Cards grandes (grid 1–2 colunas), imagem do prato em destaque (aspect 16/10).
- Tag animada "PROMO" pulsando (gold sobre verde, micro-animação `framer-motion`).
- **Preço antigo riscado** + **novo preço** grande dourado.
- **Contador regressivo em tempo real** (HH:MM:SS) até o fim do turno, atualizando a cada 1s.
- Botão "Pedir no WhatsApp" com mensagem pré-preenchida.
- Atualizar `src/data/ofertas.ts` para incluir `precoAntigo`, `precoNovo`, `imagem` (referência ao prato), `desconto`.
- Marcar pratos em oferta no `/cardapio` com badge dourada "EM OFERTA" + preço riscado.

## 4. Sistema de Badges no Cardápio

Adicionar campos opcionais ao tipo `Prato` em `src/data/menu.ts`:
- `maisPedido?: boolean` → badge "Mais Pedido" (verde escuro)
- `novo?: boolean` → badge "Novo" (dourado)
- `emOferta?: boolean` (derivado das ofertas ativas) → badge "Promoção" (vermelho-terra elegante)

Renderizar badges nos cards do cardápio e na home.

Nova seção **"Pratos Mais Vendidos"** na home: grid horizontal scroll com os pratos marcados `maisPedido`.

## 5. Animações & Micro-interações

- Hook `useInView` (framer-motion) para fade-in/slide-up ao rolar em todas as seções.
- Hover nos cards: lift sutil + sombra dourada + zoom da imagem.
- Botões: ripple/scale ao clicar.
- Skeleton (`src/components/ui/skeleton.tsx`) em todas imagens com `onLoad`.
- Parallax leve no hero (translateY via scroll).
- Transições de rota suaves via `AnimatePresence` no `__root.tsx`.

## 6. Componentes Premium Novos

- **`WhatsAppFloatingButton`**: botão flutuante fixo bottom-right com pulse animado, link `wa.me/5519999587638`.
- **`LoadingScreen`**: splash inicial elegante (logo + ornament dourado, fade-out após mount).
- **`Navbar` (refatorar Header)**: backdrop-blur, transparente no topo / sólido ao scroll, indicador animado no link ativo, mobile drawer estilizado.

## 7. Polimento Visual

- Tipografia: revisar hierarquia (display serif para H1/H2, sans para body, números tabulares para preços).
- Espaçamentos: padronizar `py-20 md:py-28` entre seções.
- Mobile: revisar `/cardapio`, `/feedback`, hero — ajustar para 487px de largura observada.
- Ícones lucide consistentes (peso/tamanho).
- SEO: revisar meta tags por rota (já parcialmente feito), adicionar JSON-LD `Restaurant` no `__root.tsx` (endereço, horário, telefone).

## 8. Estrutura de Arquivos (resumo)

```text
src/
  components/site/
    FeedbackCard.tsx              (novo)
    FeedbackForm.tsx              (novo)
    OfertasRelampago.tsx          (reescrito)
    OfertaCard.tsx                (novo)
    CountdownTimer.tsx            (novo)
    PratoBadge.tsx                (novo)
    PratosMaisVendidos.tsx        (novo)
    WhatsAppFloatingButton.tsx    (novo)
    LoadingScreen.tsx             (novo)
    Header.tsx                    (refatorado)
  data/
    menu.ts                       (badges + novas imagens)
    ofertas.ts                    (precoAntigo/Novo, imagem, fimEm)
  routes/
    __root.tsx                    (JSON-LD, FAB, LoadingScreen, AnimatePresence)
    index.tsx                     (PratosMaisVendidos, prévia feedbacks)
    feedback.tsx                  (realtime + AnimatePresence)
  hooks/
    use-countdown.ts              (novo)
supabase/migrations/
  <timestamp>_enable_realtime_feedbacks.sql
```

## 9. Detalhes Técnicos

- **Realtime**: usar `supabase.channel(...).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'feedbacks' }, payload => ...)`.
- **Countdown**: cálculo baseado em `America/Sao_Paulo` (já temos `src/lib/horario.ts`), atualiza a cada 1000ms via `setInterval` dentro de `useEffect`.
- **Imagens**: geradas com `imagegen` modelo `standard`, salvas como `.jpg` em `src/assets/menu/`, importadas como ES module no `menu.ts` para Vite bundle.
- **Tokens**: tudo via `src/styles.css` (`--brand-green-deep`, `--brand-gold`, `--brand-cream`); nenhum hex em componente.
- **Vercel**: ignorado por enquanto, conforme pedido.

## 10. Fora do Escopo

- Migração/config Vercel.
- Painel admin para gerenciar ofertas/badges (continua hardcoded em `data/`).
- Sistema de pedidos no banco (continua via WhatsApp).

Aprovar para eu implementar tudo de uma vez.
