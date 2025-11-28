import { queryClient } from "@lib/apis/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metaData: Metadata = {
  title: {
    absolute: "ارزها",
  },
  description: "ارزهای موجود در سیستم",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sp = searchParams ? await searchParams : {};
  const page = Number(sp.page || 0);
  const skip = page * 10;
  const queryKey = ["/currencies", { skip, limit: 10 }];
  await queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: () => queryClient.getQueryData(queryKey),
  });

  const cachedData = queryClient.getQueryData(queryKey);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>currencies</div>
    </HydrationBoundary>
  );
}
