import LabelTable from "@/pages/dashboard/labels/LabelTable";
import { HeaderWithLink } from "@components/HeaderWithLink";
import { TablePagination } from "@components/TablePagination";
import { queryClient } from "@lib/apis/queryClient";
import { getLabels } from "@lib/services/labels/labels";
import { LabelFilter } from "@lib/types/filter-generator";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "برچسب ها" },
  description: "برچسب ها",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sp = searchParams ? await searchParams : {};
  const initialQuery: LabelFilter = {
    page: Number(sp?.page ?? 0) * 10,
    name: sp?.name,
  };
  await queryClient.prefetchQuery({
    queryKey: [
      "/labels",
      { skip: initialQuery.page, limit: 10, name: initialQuery.name },
    ],
    queryFn: () =>
      getLabels({
        skip: initialQuery.page,
        limit: 10,
        name: initialQuery.name,
      }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeaderWithLink title=" برچسب" linkTitle="بازگشت" linkHref="/dashboard" />
      <LabelTable initialQuery={initialQuery} />
      <TablePagination />
    </HydrationBoundary>
  );
}
