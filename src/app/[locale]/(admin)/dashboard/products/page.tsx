import ProductTable from "@/pages/dashboard/products/ProductTable";
import { TablePagination } from "@components/TablePagination";
import { queryClient } from "@lib/apis/queryClient";
import { getProducts } from "@lib/services/products/products";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "محصولات",
  description: "محصولات",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sp = searchParams ? await searchParams : {};
  const initialQuery = {
    page: sp.page ? Number(sp.page) : 0,
    name: sp.name ? sp.name : "",
  };
  await queryClient.prefetchQuery({
    queryKey: [
      "/products",
      {
        limit: 10,
        skip: initialQuery.page * 10,
        name: initialQuery.name,
      },
    ],
    queryFn: () =>
      getProducts({
        limit: 10,
        skip: initialQuery.page * 10,
        name: initialQuery.name,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductTable initialQuery={initialQuery} />
      <TablePagination />
    </HydrationBoundary>
  );
}
