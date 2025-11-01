import VariantsTable from "@/pages/dashboard/variants/VariantsTable";
import { HeaderWithLink } from "@components/HeaderWithLink";
import { TablePagination } from "@components/TablePagination";
import { queryClient } from "@lib/apis/queryClient";
import { getVariants } from "@lib/services/variants/variants";
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

  const initialQuery = {
    page: Number(sp.page ?? 0),
  };
  await queryClient.prefetchQuery({
    queryKey: ["/variants", { skip: initialQuery.page * 10, limit: 10 }],
    queryFn: () => getVariants({ skip: initialQuery.page * 10, limit: 10 }),
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
