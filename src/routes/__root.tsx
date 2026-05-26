import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";
import { RestaurantStatusBanner } from "@/components/site/RestaurantStatusBanner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">A página que você procura não existe ou foi movida.</p>
        <div className="mt-6">
          <a href="/" className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">Voltar ao início</a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">Algo deu errado</h1>
        <p className="mt-2 text-sm text-muted-foreground">Tente novamente ou volte para o início.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">Tentar de novo</button>
          <a href="/" className="rounded-full border border-input bg-background px-5 py-2.5 text-sm">Início</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Restaurante Frezzarin — Saúde e Sabor para Todos" },
      { name: "description", content: "Comida fit, marmitas saudáveis, opções sem glúten, sem lactose, veganas e low carb. Vila Frezzarin, Americana–SP." },
      { name: "author", content: "Restaurante Frezzarin" },
      { name: "theme-color", content: "#1f3d2b" },
      { property: "og:title", content: "Restaurante Frezzarin — Saúde e Sabor para Todos" },
      { property: "og:description", content: "Comida fit, marmitas saudáveis, opções sem glúten, sem lactose, veganas e low carb. Vila Frezzarin, Americana–SP." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Restaurante Frezzarin" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Restaurante Frezzarin — Saúde e Sabor para Todos" },
      { name: "twitter:description", content: "Comida fit, marmitas saudáveis, opções sem glúten, sem lactose, veganas e low carb. Vila Frezzarin, Americana–SP." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bafc5b0d-9956-4089-bcb7-bf6f24f0cb16/id-preview-a827092f--e29bbc84-a007-4f2c-94c6-d5f66433a64a.lovable.app-1779750979221.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bafc5b0d-9956-4089-bcb7-bf6f24f0cb16/id-preview-a827092f--e29bbc84-a007-4f2c-94c6-d5f66433a64a.lovable.app-1779750979221.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Restaurant",
        name: "Restaurante Frezzarin",
        servesCuisine: ["Fit", "Saudável", "Vegana"],
        address: { "@type": "PostalAddress", addressLocality: "Americana", addressRegion: "SP", addressCountry: "BR", streetAddress: "Vila Frezzarin" },
        openingHours: ["Mo-Fr 11:00-15:00", "Sa 11:00-14:00"],
      }),
    }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="pt-16">
          <RestaurantStatusBanner />
        </div>
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <Toaster richColors position="top-center" />
      </div>
    </QueryClientProvider>
  );
}
