import CountryTable from "@/pages/dashboard/countries/CountryTable";
import { HeaderWithLink } from "@components/HeaderWithLink";
import { TablePagination } from "@components/TablePagination";
import { queryClient } from "@lib/apis/queryClient";
import { getCountries } from "@lib/services/countries/countries";
import { CountryFilter } from "@lib/types/filter-generator";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "افزودن کشور" },
  description: "افزودن کشور",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sp = searchParams ? await searchParams : {};
  const initialQuery: CountryFilter = {
    page: Number(sp.page ?? 0) * 10,
    name: sp?.name,
    isoCode: sp?.isoCode,
    phoneCode: sp?.phoneCode,
  };

  queryClient.prefetchQuery({
    queryKey: [
      "/countries",
      {
        skip: initialQuery.page ?? 0,
        limit: 10,
        name: initialQuery.name,
        isoCode: initialQuery.isoCode,
        phoneCode: initialQuery.phoneCode,
      },
    ],
    queryFn: () =>
      getCountries({
        skip: initialQuery.page ?? 0,
        limit: 10,
        name: initialQuery.name,
        isoCode: initialQuery.isoCode,
        phoneCode: initialQuery.phoneCode,
      }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeaderWithLink
        linkTitle="بازگشت"
        linkHref="/dashboard"
        title="افزودن کشور"
      />
      <CountryTable initialQuery={initialQuery} />
      <TablePagination />
    </HydrationBoundary>
  );
}
