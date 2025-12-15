import ColorTable from "@/pages/dashboard/colors/ColorTable";
import { queryClient } from "@lib/apis/queryClient";
import { getColors } from "@lib/services/colors/colors";
import { ColorFilter } from "@lib/types/filter-generator";
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

  const initialQuery: ColorFilter = {
    page: Number(sp.page ?? 0) * 10,
    name: sp?.name,
    enName: sp?.enName,
    displayName: sp?.displayName,
    hex: sp?.hex,
  };

  await queryClient.prefetchQuery({
    queryKey: [
      "/colors",
      {
        skip: initialQuery.page ?? 0,
        limit: 10,
        name: initialQuery.name,
        enName: initialQuery.enName,
        displayName: initialQuery.displayName,
        hex: initialQuery.hex,
      },
    ],
    queryFn: () =>
      getColors({
        skip: initialQuery.page ?? 0,
        limit: 10,
        name: initialQuery.name,
        enName: initialQuery.enName,
        displayName: initialQuery.displayName,
        hex: initialQuery.hex,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ColorTable initialQuery={initialQuery} />
    </HydrationBoundary>
  );
}
