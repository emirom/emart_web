import UnitsTable from "@/pages/dashboard/units/UnitsTable";
import { HeaderWithLink } from "@components/HeaderWithLink";
import { TablePagination } from "@components/TablePagination";
import { queryClient } from "@lib/apis/queryClient";
import { getUnits } from "@lib/services/units/units";
import { UnitFilter } from "@lib/types/filter-generator";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "کمیت ها" },
  description: "واحدهای مدیریت کمیت",
};
export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string>>;
}) {
  const sp = searchParams ? await searchParams : {};
  const initialQuery: UnitFilter = {
    page: Number(sp?.page ?? 0) * 10,
    title: sp?.search,
  };

  await queryClient.prefetchQuery({
    queryKey: [
      "/units",
      { skip: initialQuery.page, limit: 10, title: initialQuery.title },
    ],
    queryFn: () =>
      getUnits({
        skip: initialQuery.page,
        limit: 10,
        title: initialQuery.title,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeaderWithLink
        title="کمیت ها"
        linkTitle="بازگشت"
        linkHref="/dashboard"
      />
      <UnitsTable initialQuery={initialQuery} />
      <TablePagination />
    </HydrationBoundary>
  );
}
