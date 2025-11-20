import BrandTable from "@/pages/dashboard/brands/BrandTable";
import { HeaderWithLink } from "@components/HeaderWithLink";
import { TablePagination } from "@components/TablePagination";
import { queryClient } from "@lib/apis/queryClient";
import { getBrands } from "@lib/services/brands/brands";
import { BrandFilter } from "@lib/types/filter-generator";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "برندها" },
  description: "برندهای محصول",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sp = searchParams ? await searchParams : {};
  const initialQuery: BrandFilter = {
    page: Number(sp?.page ?? 0) * 10,
    name: sp?.name,
    enName: sp?.enName,
    website: sp?.website,
  };
  await queryClient.prefetchQuery({
    queryKey: [
      "/brands",
      {
        skip: initialQuery.page,
        limit: 10,
        name: initialQuery.name,
        enName: initialQuery.enName,
        website: initialQuery?.website,
      },
    ],
    queryFn: () =>
      getBrands({
        limit: 10,
        skip: initialQuery.page,
        name: initialQuery.name,
        enName: initialQuery.enName,
        website: initialQuery?.website,
      }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeaderWithLink title="برندها" linkTitle="بازگشت" linkHref="/dashboard" />
      <BrandTable initialQuery={initialQuery} />
      <TablePagination />
    </HydrationBoundary>
  );
}
