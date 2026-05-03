"use client";

/**
 * Providers — wrapper global pour le backoffice et le site public.
 *
 * Branchements :
 *  - TanStack Query (state serveur, cache, mutations) + DevTools en dev
 *  - Sonner (toasts richColors, alignés DA Purple)
 *  - Radix Tooltip Provider (delay 300ms par défaut, partagé toute l'app)
 *
 * Ce composant est instancié dans `app/layout.tsx` au-dessus de `LayoutWrapper`
 * pour que tous les enfants (site public, /admin, /client, /artisan) bénéficient
 * du même contexte de cache et de toaster.
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { Tooltip as TooltipPrimitive } from "radix-ui";
const { Provider: TooltipProvider } = TooltipPrimitive;
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            gcTime: 5 * 60_000,
            refetchOnWindowFocus: false,
            retry: (failureCount, error: unknown) => {
              // Pas de retry sur 4xx (auth, validation) — uniquement réseau
              const status = (error as { status?: number } | null)?.status;
              if (status && status >= 400 && status < 500) return false;
              return failureCount < 2;
            },
          },
          mutations: {
            retry: 0,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={300}>
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
          expand
          duration={4500}
          toastOptions={{
            classNames: {
              toast:
                "group border border-joel-violet/20 shadow-xl shadow-joel-violet/10 rounded-xl",
              title: "text-sm font-semibold",
              description: "text-xs text-zinc-600",
              actionButton:
                "bg-joel-violet text-white hover:bg-joel-violet/90 rounded-md text-xs px-2 py-1",
              cancelButton:
                "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 rounded-md text-xs px-2 py-1",
              success:
                "bg-white border-joel-violet/20 [&>div>svg]:text-joel-violet",
              error: "bg-white border-red-200 [&>div>svg]:text-red-600",
              warning:
                "bg-white border-amber-200 [&>div>svg]:text-joel-violet",
              info: "bg-white border-joel-violet/30 [&>div>svg]:text-joel-violet",
            },
          }}
        />
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}
