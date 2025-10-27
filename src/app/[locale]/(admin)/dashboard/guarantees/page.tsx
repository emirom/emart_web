import GuaranteeTable from "@/pages/dashboard/guarantees/GuaranteeTable";
import { HeaderWithLink } from "@components/HeaderWithLink";
import { TablePagination } from "@components/TablePagination";
import { queryClient } from "@lib/apis/queryClient";
import { getGuarantees } from "@lib/services/guarantees/guarantees";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ضمانت نامه ",
  description: "ضمانت نامه",
};
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sp = searchParams ? await searchParams : {};
  const initialQuery = {
    page: Number(sp?.page ?? 0),
    title: sp?.search,
  };
  await queryClient.prefetchQuery({
    queryKey: [
      "/guarantees",
      {
        skip: initialQuery.page * 10,
        limit: 3,
        title: initialQuery.title,
      },
    ],
    queryFn: () =>
      getGuarantees({
        skip: initialQuery.page * 10,
        limit: 3,
        title: initialQuery.title,
      }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeaderWithLink
        title="ضمانت نامه "
        linkTitle="بازگشت"
        linkHref="/dashboard"
      />
      <GuaranteeTable initialQuery={initialQuery} />
      <TablePagination />
    </HydrationBoundary>
  );
}
