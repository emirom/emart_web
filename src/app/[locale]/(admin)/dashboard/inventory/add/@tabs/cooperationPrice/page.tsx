import CooperationPriceTable from "@/pages/dashboard/cooperation-price/CooperationPriceTable";
import { queryClient } from "@lib/apis/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "لیست. قیمت های همکاری",
  description: "لیست قیمت های همکاری",
};

export default async function Page() {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CooperationPriceTable />
    </HydrationBoundary>
  );
}
