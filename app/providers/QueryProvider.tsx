'use client';

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // Maintained as instance state to protect the cache boundaries across hot-reloads
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // consider data fresh for 5 minutes
            gcTime: 10 * 60 * 1000,    // keep unused data in cache memory for 10 minutes
            retry: 2,                 // automatically retry broken calls twice before failing
            refetchOnWindowFocus: true, // auto-sync fresh parameters when user switches back to browser tab
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}