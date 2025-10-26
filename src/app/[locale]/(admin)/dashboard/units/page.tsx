import UnitsTable from "@/pages/dashboard/units/UnitsTable";
import { TablePagination } from "@components/TablePagination";
import { queryClient } from "@lib/apis/queryClient";
import { getUnits } from "@lib/services/units/units";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string>>;
}) {
  const sp = searchParams ? await searchParams : {};
  const initialQuery = {
    page: Number(sp?.page ?? 0),
    title: sp?.search,
  };

  await queryClient.prefetchQuery({
    queryKey: [
      "/units",
      { skip: initialQuery.page * 10, limit: 10, title: initialQuery.title },
    ],
    queryFn: () =>
      getUnits({
        skip: initialQuery.page * 10,
        limit: 10,
        title: initialQuery.title,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UnitsTable initialQuery={initialQuery} />
      <TablePagination />
    </HydrationBoundary>
  );
}
