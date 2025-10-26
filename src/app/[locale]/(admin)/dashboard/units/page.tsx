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
  const page = Number(sp?.page ?? 0);
  const title = sp?.search;

  await queryClient.prefetchQuery({
    queryKey: ["/units", { skip: page * 10, limit: 10, title }],
    queryFn: () => getUnits({ skip: page * 10, limit: 10, title }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UnitsTable serverPage={page} serverSearch={title} />
      <TablePagination />
    </HydrationBoundary>
  );
}
