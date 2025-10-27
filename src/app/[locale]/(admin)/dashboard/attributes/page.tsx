import { Metadata } from "next";

import AttributeTable from "@/pages/dashboard/attribute/AttributeTable";
import { HeaderWithLink } from "@components/HeaderWithLink";
import { TablePagination } from "@components/TablePagination";
import { queryClient } from "@lib/apis/queryClient";
import { getAttributes } from "@lib/services/attributes/attributes";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const metadata: Metadata = {
  title: "ویژگی ها",
  description: "ویژگی های دسته بندی",
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
    queryKey: ["/attributes", { skip: initialQuery.page, limit: 10 }],
    queryFn: () => getAttributes({ skip: initialQuery.page, limit: 10 }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeaderWithLink
        title="ویزگی های دسته بندی"
        linkTitle="بازگشت"
        linkHref="/dashboard"
      />
      <AttributeTable initialQuery={initialQuery} />
      <TablePagination />
    </HydrationBoundary>
  );
}
