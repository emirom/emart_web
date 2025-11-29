import StoreTable from "@/pages/dashboard/stores/StoreTable";
import { HeaderWithLink } from "@components/HeaderWithLink";
import { TablePagination } from "@components/TablePagination";
import { queryClient } from "@lib/apis/queryClient";
import { ListStoresResponse } from "@lib/schemas";
import { getStores } from "@lib/services/stores/stores";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "فروشگاه ها",
  },
  description: "لیست فروشگاه های فروشنده ها",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sp = searchParams ? await searchParams : {};
  const page = Number(sp.page ?? 0);
  const skip = page * 10;
  const queryKey = ["/stores", { skip, limit: 10 }];
  await queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: () => getStores({ skip, limit: 10 }),
  });
  const cachedData = queryClient.getQueryData(queryKey) as ListStoresResponse;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeaderWithLink
        title="فروشگاه‌ها"
        linkTitle="بازگشت"
        linkHref="/dashboard"
      />
      <StoreTable data={cachedData} />
      <TablePagination />
    </HydrationBoundary>
  );
}
