import ProvincesTable from "@/pages/dashboard/provinces/ProvincesTable";
import { HeaderWithLink } from "@components/HeaderWithLink";
import { TablePagination } from "@components/TablePagination";
import { queryClient } from "@lib/apis/queryClient";
import { getProvinces } from "@lib/services/provinces/provinces";
import { ProvinceFilter } from "@lib/types/filter-generator";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const metadata = {
  title: "استان ها",
  description: "استان ها",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sp = searchParams ? await searchParams : {};

  const page = Number(sp.page ?? 0);
  const skip = page * 10;

  const initialQuery: ProvinceFilter = {
    page,
    name: sp.name,
    abb: sp.abb,
    countryId: sp.countryId,
    order: "asc",
  };

  await queryClient.prefetchQuery({
    queryKey: [
      "/provinces",
      {
        skip,
        limit: 10,
        name: initialQuery.name,
        abb: initialQuery.abb,
        countryId: initialQuery.countryId,
        order: initialQuery.order,
      },
    ],
    queryFn: () =>
      getProvinces({
        skip,
        limit: 10,
        name: initialQuery.name,
        abb: initialQuery.abb,
        countryId: initialQuery.countryId,
        order: initialQuery.order,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeaderWithLink
        title="استان ها"
        linkTitle="بازگشت"
        linkHref="/dashboard"
      />
      <ProvincesTable initialQuery={initialQuery} />
      <TablePagination />
    </HydrationBoundary>
  );
}
