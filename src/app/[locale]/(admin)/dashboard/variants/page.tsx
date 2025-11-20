import VariantsTable from "@/pages/dashboard/variants/VariantsTable";
import { HeaderWithLink } from "@components/HeaderWithLink";
import { TablePagination } from "@components/TablePagination";
import { queryClient } from "@lib/apis/queryClient";
import { getVariants } from "@lib/services/variants/variants";
import { VariantFilter } from "@lib/types/filter-generator";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تنوع محصول",
  description: "مدیریت تنوع محصول",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sp = searchParams ? await searchParams : {};

  const initialQuery: VariantFilter = {
    page: Number(sp.page ?? 0) * 10,
    sku: sp.sku,
    barcode: sp.barcode,
    mpn: sp.mpn,
  };
  await queryClient.prefetchQuery({
    queryKey: [
      "/variants",
      {
        skip: initialQuery.page * 10,
        limit: 10,
        sku: initialQuery.sku,
        barcode: initialQuery.barcode,
        mpn: initialQuery.mpn,
      },
    ],
    queryFn: () =>
      getVariants({
        skip: initialQuery.page,
        limit: 10,
        sku: initialQuery.sku,
        barcode: initialQuery.barcode,
        mpn: initialQuery.mpn,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeaderWithLink
        title="تنوع محصول"
        linkTitle="بازگشت"
        linkHref="/dashboard"
      />
      <VariantsTable initialQuery={initialQuery} />
      <TablePagination />
    </HydrationBoundary>
  );
}
