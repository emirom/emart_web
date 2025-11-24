import CityTable from "@/pages/dashboard/city/CityTable";
import { HeaderWithLink } from "@components/HeaderWithLink";
import { TablePagination } from "@components/TablePagination";
import { queryClient } from "@lib/apis/queryClient";
import { getCities } from "@lib/services/cities/cities";
import { CityFilter } from "@lib/types/filter-generator";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "شهرها",
  description: "شهرها",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sp = searchParams ? await searchParams : {};

  const initialQuery: CityFilter = {
    skip: Number(sp.page ?? 0) * 10,
    limit: 10,
    provinceId: sp?.provinceId,
    search: sp?.search,
  };

  await queryClient.prefetchQuery({
    queryKey: [
      "/cities",
      {
        skip: initialQuery.skip ?? 0,
        limit: 10,
        provinceId: initialQuery.provinceId,
        search: initialQuery.search,
      },
    ],
    queryFn: () =>
      getCities({
        skip: initialQuery.skip ?? 0,
        limit: 10,
        provinceId: initialQuery.provinceId,
        search: initialQuery.search,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeaderWithLink title="شهرها" linkTitle="بازگشت" linkHref="/dashboard" />
      <CityTable initialQuery={initialQuery} />
      <TablePagination />
    </HydrationBoundary>
  );
}
