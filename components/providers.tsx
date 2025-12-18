"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ReactNode, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  // Register service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      // Unregister any existing service workers first to clear cache
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister());
      });

      // Register with cache busting
      navigator.serviceWorker
        .register("/sw.js?v=" + Date.now())
        .then((registration) => {
          console.log("Service Worker registered:", registration.scope);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          {children}
          <Toaster position="top-right" />
        </NuqsAdapter>
      </QueryClientProvider>
    </SessionProvider>
  );
}
