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
      // First, unregister all existing service workers
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        Promise.all(
          registrations.map((registration) => registration.unregister())
        ).then(() => {
          // Wait a bit for unregistration to complete
          setTimeout(() => {
            // Now register the new service worker with cache busting
            navigator.serviceWorker
              .register("/sw.js?v=" + Date.now())
              .then((registration) => {
                console.log("Service Worker registered:", registration.scope);
              })
              .catch((error) => {
                console.error("Service Worker registration failed:", error);
              });
          }, 100);
        });
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
