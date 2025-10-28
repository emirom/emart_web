import InsuranceTable from "@/pages/dashboard/insurances/InsuranceTable";
import { TablePagination } from "@components/TablePagination";
import { queryClient } from "@lib/apis/queryClient";
import { getInsurances } from "@lib/services/insurances/insurances";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sp = searchParams ? await searchParams : {};
  const initialQuery = {
    page: Number(sp.page ?? 0),
    title: sp.search,
  };

  await queryClient.prefetchQuery({
    queryKey: [
      "/insurances",
      {
        skip: initialQuery.page * 10,
        limit: 10,
        title: initialQuery.title,
      },
    ],
    queryFn: () =>
      getInsurances({
        skip: initialQuery.page * 10,
        limit: 10,
        title: initialQuery.title,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <InsuranceTable initialQuery={initialQuery} />
      <TablePagination />
    </HydrationBoundary>
  );
}
