import PricingTierTable from "@/pages/pricing-tier/PricingTierTable";
import { queryClient } from "@lib/apis/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "محدوده قیمت ها",
  },
  description: "محدوده قیمت های محصول",
};

export default function PricingTierPage() {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PricingTierTable />
    </HydrationBoundary>
  );
}
