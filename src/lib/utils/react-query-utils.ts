import { QueryClient } from "@tanstack/react-query";

/**
 * Invalidate all queries for a given entity
 * @param queryClient - The React Query client instance
 * @param entity - The entity name (e.g., '/cities', '/attributes', '/brands', etc.)
 */
export const invalidateEntityQueries = async (
  queryClient: QueryClient,
  entity: string,
) => {
  // First invalidate all queries matching the entity
  await queryClient.invalidateQueries({
    predicate: (query) => {
      return Array.isArray(query.queryKey) && query.queryKey[0] === entity;
    },
  });

  // Then refetch to ensure fresh data is loaded
  await queryClient.refetchQueries({
    predicate: (query) => {
      return Array.isArray(query.queryKey) && query.queryKey[0] === entity;
    },
    type: "active", // Only refetch active queries
  });
};

/**
 * Utility hooks for common cache invalidation operations
 */
export const invalidateAllDashboardQueries = (queryClient: QueryClient) => {
  const entities = [
    "/cities",
    "/attributes",
    "/brands",
    "/categories",
    "/colors",
    "/countries",
    "/provinces",
    "/units",
    "/labels",
    "/guarantees",
    "/insurances",
    "/products",
    "/variants",
    "/inventory",
    "/sections",
  ];

  entities.forEach((entity) => {
    invalidateEntityQueries(queryClient, entity);
  });
};
