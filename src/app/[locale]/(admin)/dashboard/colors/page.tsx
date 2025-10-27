import ColorTable from "@/pages/dashboard/colors/ColorTable";
import { HeaderWithLink } from "@components/HeaderWithLink";
import { TablePagination } from "@components/TablePagination";
import { queryClient } from "@lib/apis/queryClient";
import { getColors } from "@lib/services/colors/colors";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "رنگ‌ها",
  description: "رنگ‌های محصول",
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
      "/colors",
      { skip: initialQuery.page * 4, limit: 4, name: initialQuery.name },
    ],
    queryFn: () =>
      getColors({
        skip: initialQuery.page * 4,
        limit: 4,
        name: initialQuery.name,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeaderWithLink title="رنگ‌ها" linkTitle="بازگشت" linkHref="/dashboard" />
      <ColorTable initialQuery={initialQuery} />
      <TablePagination />
    </HydrationBoundary>
  );
}
