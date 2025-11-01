import BrandTable from "@/pages/dashboard/brands/BrandTable";
import { HeaderWithLink } from "@components/HeaderWithLink";
import { TablePagination } from "@components/TablePagination";
import { queryClient } from "@lib/apis/queryClient";
import { getBrands } from "@lib/services/brands/brands";
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
  const initialQuery = {
    page: Number(sp?.page ?? 0),
    name: sp?.search ?? "",
  };
  await queryClient.prefetchQuery({
    queryKey: [
      "/brands",
      { skip: initialQuery.page * 10, limit: 10, name: initialQuery.name },
    ],
    queryFn: () =>
      getBrands({
        limit: 10,
        skip: initialQuery.page * 10,
        name: initialQuery.name,
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
