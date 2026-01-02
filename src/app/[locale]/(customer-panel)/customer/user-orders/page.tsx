import UserOrderList from "@/pages/customer/user-orders/UserOrderList";
import { queryClient } from "@lib/apis/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "سفارشات کاربر",
  },
  description: "لیست سفارشات کاربر",
};

export default async function Page() {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserOrderList />
    </HydrationBoundary>
  );
}
