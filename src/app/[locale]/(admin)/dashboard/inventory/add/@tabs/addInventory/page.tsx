import CreateInventoryForm from "@/pages/dashboard/inventory/CreateInventoryForm";
import { queryClient } from "@lib/apis/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "افزودن موجودی",
  description: "افزودن موجودی",
};
export default async function Page() {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateInventoryForm />
    </HydrationBoundary>
  );
}
