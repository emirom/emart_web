import InventoryTable from "@/pages/dashboard/inventory/InventoryTable";
import { HeaderWithLink } from "@components/HeaderWithLink";
import { queryClient } from "@lib/apis/queryClient";
import { ListInventoryResponse } from "@lib/schemas";
import { getInventories } from "@lib/services/inventories/inventories";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "موجودی محصول" },
  description: " موجودی محصول",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sp = searchParams ? await searchParams : {};
  const page = Number(sp.page ?? 0);
  const skip = page * 10;
  const queryKey = ["/inventory", { skip, limit: 10 }];
  await queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: () => getInventories({ skip, limit: 10 }),
  });
  const cachedData = queryClient.getQueryData(
    queryKey,
  ) as ListInventoryResponse;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeaderWithLink
        linkTitle="بازگشت"
        linkHref="/dashboard"
        title="موجودی محصول"
      />
      <InventoryTable data={cachedData} />
    </HydrationBoundary>
  );
}
