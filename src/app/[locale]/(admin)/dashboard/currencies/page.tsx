import CurrenciesTable from "@/pages/dashboard/currencies/CurrenciesTable";
import { HeaderWithLink } from "@components/HeaderWithLink";
import { queryClient } from "@lib/apis/queryClient";
import { CurrencyListResponse } from "@lib/schemas";
import { getCurrencies } from "@lib/services/currencies/currencies";
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
  const queryKey = [
    "/currencies",
    { skip, limit: 10, name: sp.name, symbol: sp.symbol },
  ];
  await queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: () =>
      getCurrencies({ skip, limit: 10, name: sp.name, symbol: sp.symbol }),
  });

  const cachedData = queryClient.getQueryData(queryKey) as CurrencyListResponse;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeaderWithLink title="ارزها" linkTitle="بازگشت" linkHref="/dashboard" />
      <CurrenciesTable data={cachedData} />
    </HydrationBoundary>
  );
}
