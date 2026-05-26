# Restaurante Frezzarin

Site institucional + cardápio + carrinho do Restaurante Frezzarin.
Stack: **TanStack Start (React 19 + Vite 7)** · **Tailwind v4** · **shadcn/ui** · **Supabase** (Lovable Cloud) · **framer-motion** · **zustand**.

---

## Estrutura de pastas

```text
src/
  routes/             # roteamento file-based (TanStack Router)
    __root.tsx        # layout raiz (header, banner de horário, footer, toaster)
    index.tsx         # Home
    cardapio.tsx      # Cardápio com abas Almoço / Café da Tarde / Jantar
    sobre.tsx
    contato.tsx
    feedback.tsx
  components/
    site/             # componentes específicos do site
      Header.tsx
      Footer.tsx
      RestaurantStatusBanner.tsx
      OfertasRelampago.tsx
      PratoDoDiaCard.tsx
      AddToCartButton.tsx
      CartDrawer.tsx
      MenuQuiz.tsx
      NutritionalModal.tsx
      SectionEyebrow.tsx
    ui/               # componentes shadcn/ui
  data/
    menu.ts           # cardápio completo (com campo `refeicao`)
    ofertas.ts        # ofertas relâmpago fixas por turno
    prato-do-dia.ts   # mapa fixo prato → dia da semana
  hooks/
    use-restaurant-status.ts
  lib/
    horario.ts        # lógica de horário (sempre America/Sao_Paulo)
  stores/
    cart.ts           # carrinho persistido em localStorage
  integrations/
    supabase/         # cliente Supabase (browser + server)
  assets/
    menu/             # fotos dos pratos importadas como ES modules
supabase/
  migrations/         # migrações SQL
vercel.json           # configuração de deploy no Vercel
```

> **Importante:** este projeto NÃO é HTML/CSS/JS puro. É uma aplicação React/Vite com SSR. O Vercel a reconhece automaticamente pelo `vite` framework. Não crie `index.html` na raiz nem mova arquivos para `/css` e `/js` — isso quebra o bundling do Vite e o roteamento do TanStack.

---

## Regras de negócio implementadas

- **Horário de funcionamento**: 10:30 – 23:00, sempre no fuso **America/Sao_Paulo** (`src/lib/horario.ts`). Fora do horário, o site mostra o banner vermelho "Fechado" e desabilita os botões de adicionar ao carrinho e finalizar pedido.
- **Ofertas relâmpago** mudam por turno:
  - Manhã (10:30 – 14:00)
  - Tarde (14:00 – 18:00)
  - Noite (18:00 – 23:00)
- **Abas no cardápio**: Almoço, Café da Tarde, Jantar. A aba abre automaticamente conforme o turno atual.
- **Prato do Dia**: muda por dia da semana (ex.: quarta = Tilápia). Editar em `src/data/prato-do-dia.ts`.
- **Carrinho**: persistido em `localStorage`, drawer no Header, finalização envia mensagem formatada para o WhatsApp.

---

## Rodando localmente

```bash
bun install
bun run dev
```

---

## Deploy no Vercel

1. Faça push do repositório para o GitHub.
2. No painel do Vercel: **Add New → Project → Import** do repositório.
3. Em **Build & Output Settings** o Vercel já detecta Vite automaticamente — não altere nada.
4. Em **Environment Variables**, adicione as 6 variáveis do Supabase (mesmas que o Lovable Cloud usa):

| Nome                          | Onde encontrar                                  |
| ----------------------------- | ----------------------------------------------- |
| `VITE_SUPABASE_URL`           | Lovable Cloud → Settings → API URL              |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Lovable Cloud → Settings → publishable / anon key |
| `VITE_SUPABASE_PROJECT_ID`    | Lovable Cloud → Settings → Project ID           |
| `SUPABASE_URL`                | mesma URL acima                                 |
| `SUPABASE_PUBLISHABLE_KEY`    | mesma publishable key acima                     |
| `SUPABASE_SERVICE_ROLE_KEY`   | Lovable Cloud → Settings → service role (secret) |

5. Clique em **Deploy**.

O `vercel.json` na raiz já contém o fallback de SPA (`/(.*)` → `/`), garantindo que refresh em `/cardapio`, `/sobre` etc. nunca dê 404.

> **Alternativa mais simples**: clique no botão **Publish** dentro da Lovable. O app vai ao ar em `https://*.lovable.app` sem nenhuma configuração extra.

---

## Como editar conteúdo

- **Cardápio**: `src/data/menu.ts` — cada item tem `refeicao: ["almoco"|"cafe"|"jantar"][]` controlando em quais abas aparece.
- **Ofertas relâmpago**: `src/data/ofertas.ts` — 3 buckets (manha/tarde/noite).
- **Prato do dia**: `src/data/prato-do-dia.ts` — mapa por dia da semana (0=Dom, 6=Sáb).
- **WhatsApp**: troque `5519000000000` em `src/components/site/Header.tsx` e `src/components/site/CartDrawer.tsx` pelo número real.
