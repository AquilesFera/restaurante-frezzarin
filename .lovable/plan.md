## Resumo do que será feito

Vou substituir o conteúdo atual do projeto Lovable pelo conteúdo do zip enviado (`tasty-taste-guide-main`), depois aplicar duas camadas de mudança: **(A) compatibilidade Vercel** e **(B) novas regras de negócio e cardápio**.

---

## A. Estrutura e deploy no Vercel

O projeto é uma aplicação **TanStack Start (SSR React)**, não HTML/CSS/JS puro. No Vercel ele roda como uma aplicação Node/Edge — não como arquivos estáticos. O Vercel detecta isso automaticamente via `package.json` + `vite.config.ts`. Não existe (e não deve existir) `index.html` na raiz nem pastas `/css` e `/js` soltas — isso é convenção de sites estáticos e quebraria o roteamento, SSR e o bundling de assets do Vite.

Mudanças concretas:

1. **Remover o target Cloudflare Workers** (causa do "não identifica arquivos" no Vercel):
   - Deletar `wrangler.jsonc`.
   - Remover `@cloudflare/vite-plugin` do `package.json`.
   - Trocar `src/server.ts` (entry do Worker) por um entry compatível com o adapter Node/Vercel do TanStack Start.
   - Ajustar `vite.config.ts` para não passar `tanstackStart.server.entry` apontando para o wrapper Cloudflare.
2. **Adicionar `vercel.json`** com:
   - `framework: "vite"`,
   - rewrite catch-all `"/(.*)" -> "/"` como fallback de SPA para garantir que refresh em `/cardapio`, `/sobre`, etc. nunca dê 404 (cinto + suspensório junto com o SSR do TanStack).
3. **Variáveis de ambiente no Vercel** (Project Settings → Environment Variables), iguais às que o Lovable Cloud já injeta:
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID` (client),
   - `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server).
4. **Assets**: continuam em `src/assets/**` importados como ES modules — o Vite faz o hashing/bundle. Não mover para `/public` solto (quebra os imports existentes do menu).
5. **Estrutura final** (já é a correta para Vercel + TanStack):
   ```text
   src/
     routes/        ← roteamento file-based (index, cardapio, sobre, contato, feedback)
     components/    ← UI + site
     data/          ← menu.ts e novos arquivos (horario, ofertas, prato-do-dia)
     assets/menu/   ← imagens importadas
     integrations/supabase/   ← cliente Supabase
   vercel.json
   package.json
   vite.config.ts
   ```

> **Importante**: a Lovable também publica esse mesmo projeto sem nenhum ajuste pelo botão Publish. O Vercel é opcional. Vou deixar tudo funcionando nos dois.

## B. Banco de dados (Supabase)

Mantenho a integração existente (`src/integrations/supabase/`) e a migração em `supabase/migrations/`. No Vercel basta colar as env vars acima — os dados persistidos no projeto Supabase atual continuam acessíveis.

## C. Horário de funcionamento (10:30–23:00, America/Sao_Paulo)

- Novo hook `src/hooks/use-restaurant-status.ts` que calcula o horário **sempre em America/Sao_Paulo** via `Intl.DateTimeFormat` (independente do fuso do navegador) e atualiza a cada 30s.
- Retorna `{ aberto, proximaAbertura, minutosParaFechar }`.
- Novo componente `RestaurantStatusBanner` fixo no topo: verde "Aberto agora" ou vermelho "Fechado — abrimos às 10:30".
- Botões de "Adicionar ao pedido" e "Finalizar pedido" ficam **disabled** + tooltip quando fechado.

## D. Ofertas relâmpago dinâmicas (fixas por turno)

- Novo arquivo `src/data/ofertas.ts` com 3 buckets:
  - **Manhã** (10:30–14:00): ex. Suco Detox 20% off,
  - **Tarde** (14:00–18:00): ex. Vitamina + Wrap combo,
  - **Noite** (18:00–23:00): ex. Marmita G com 15% off.
- Componente `OfertasRelampago` na home escolhe o bucket baseado na hora SP atual e mostra contagem regressiva até o fim do turno.

## E. Abas do cardápio: Almoço / Café da Tarde / Jantar

- Adicionar campo `refeicao: ("almoco" | "cafe" | "jantar")[]` em cada `Prato` (`src/data/menu.ts`). Itens existentes ganham a classificação (ex.: marmitas → almoço e jantar, sucos/vitaminas → café da tarde, etc).
- Refatorar `src/routes/cardapio.tsx` usando `<Tabs>` do shadcn (já instalado) com as 3 abas + animação `framer-motion` (já instalado). Mantém o filtro de categoria existente como sub-filtro dentro de cada aba.
- **Prato do Dia**: novo `src/data/prato-do-dia.ts` com mapa fixo por dia da semana (0–6), por exemplo `{ 3: "tilapia" }` (quarta = Tilápia). Card destacado no topo da aba ativa.

## F. Novos sucos + carrinho

- Adicionar 4 sucos novos ao `menu.ts`: Suco Verde, Limonada de Gengibre, Suco de Maracujá com Hortelã, Suco de Abacaxi com Hortelã. Imagens geradas via `imagegen` (qualidade `standard`), salvas em `src/assets/menu/` e importadas como ES modules — garante caminho válido em dev, build e Vercel.
- Verificar/implementar carrinho:
  - Store leve com `zustand` (`src/stores/cart.ts`) persistido em `localStorage`.
  - Botão "Adicionar ao pedido" em cada card do cardápio (desabilitado quando fechado).
  - Drawer de carrinho no `Header` com contador, lista, totais e botão "Enviar pedido pelo WhatsApp" (link `https://wa.me/...` com mensagem montada).

---

## Detalhes técnicos

- **Stack**: TanStack Start 1.x + React 19 + Vite 7 + Tailwind v4 + shadcn + Supabase + framer-motion (todos já no `package.json`).
- **Roteamento**: file-based em `src/routes/`; `routeTree.gen.ts` é gerado — não editar à mão.
- **Fuso horário SP**: implementado com `new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit", weekday: "short" })` para evitar bug de fuso no cliente.
- **SEO**: cada rota mantém seu `head()` próprio com title/description/og distintos.
- **Sem mudanças de schema** no Supabase nesta etapa (cardápio fica no código conforme você escolheu).
- **Imports faltantes**: novos arquivos serão criados no mesmo batch dos imports para não quebrar o build estrito do TanStack.

## Entregáveis ao fim

1. Projeto rodando no preview da Lovable com tudo acima.
2. `vercel.json` + instruções de deploy (push para GitHub → Import no Vercel → colar 6 env vars → Deploy).
3. Estrutura de pastas explicada no `README`.
