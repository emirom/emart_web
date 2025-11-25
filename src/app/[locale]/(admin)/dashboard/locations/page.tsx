import LocationTable from "@/pages/dashboard/locations/LocationTable";
import { HeaderWithLink } from "@components/HeaderWithLink";
import { TablePagination } from "@components/TablePagination";
import { queryClient } from "@lib/apis/queryClient";
import { ListLocationsResponse } from "@lib/schemas";
import { getLocations } from "@lib/services/locations/locations";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "آدرس ها",
  },
  description: "آدرس فروشنده ها ",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sp = searchParams ? await searchParams : {};
  const page = Number(sp.page ?? 0);
  const skip = page * 10;

  const queryKey = [
    "/locations",
    { skip, limit: 10, postalCode: sp.postalCode, street: sp.street },
  ];

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () =>
      getLocations({
        skip,
        limit: 10,
        postalCode: sp.postalCode,
        street: sp.street,
      }),
  });
  const cachedData = queryClient.getQueryData(
    queryKey,
  ) as ListLocationsResponse;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeaderWithLink
        title="آدرس ها"
        linkHref="/dashboard/locations"
        linkTitle="بازگشت"
      />
      <LocationTable data={cachedData} />
      <TablePagination />
    </HydrationBoundary>
  );
}
