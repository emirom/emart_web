import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: true, // Changed from false to true to refetch on window focus
      refetchOnReconnect: true,
      staleTime: 0, // Changed from 5 minutes to 0 to make data stale immediately
      cacheTime: 1000 * 60 * 5, // Keep cache for 5 minutes in memory
    },
    mutations: {
      retry: 1,
    },
  },
});
