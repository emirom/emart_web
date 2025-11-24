import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: true, // Changed from false to true to refetch on window focus
      refetchOnReconnect: true,
      staleTime: 0, // Changed from 5 minutes to 0 to make data stale immediately
      gcTime: 0,
    },
    mutations: {
      retry: 1,
    },
  },
});
