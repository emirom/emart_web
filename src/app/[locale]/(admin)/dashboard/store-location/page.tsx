import StoreLocationTable from "@/pages/dashboard/store-location/StoreLocationTable";
import { HeaderWithLink } from "@components/HeaderWithLink";
import { TablePagination } from "@components/TablePagination";
import { queryClient } from "@lib/apis/queryClient";
import { ListStoreLocationsResponse } from "@lib/schemas";
import { getStoreLocations } from "@lib/services/store-locations/store-locations";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "موقعیت فروشگاه‌ها",
  },
  description: " موقعیت فروشگاه‌ها در سایت ما",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sp = searchParams ? await searchParams : {};
  const page = Number(sp.page ?? 0);
  const skip = page * 10;
  const queryKey = ["/store-location", { skip, limit: 10 }];
  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getStoreLocations({ skip, limit: 10 }),
  });
  const cachedData = queryClient.getQueryData(
    queryKey,
  ) as ListStoreLocationsResponse;
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeaderWithLink
        title="موقعیت فروشگاه‌ها"
        linkTitle="بازگشت"
        linkHref="/dashboard/stores"
      />
      <StoreLocationTable data={cachedData} />
      <TablePagination />
    </HydrationBoundary>
  );
}
