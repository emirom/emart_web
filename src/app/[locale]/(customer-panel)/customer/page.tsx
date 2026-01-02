import CustomerDiscountCouponAnnouncement from "@/pages/customer/CustomerDiscountCouponAnnouncement";
import CustomerNavbar from "@/pages/customer/CustomerNavbar";
import CustomerPurchaseInformation from "@/pages/customer/CustomerPurchaseInformation";
import CustomerUserInfo from "@/pages/customer/CustomerUserInfo";
import { queryClient } from "@lib/apis/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Page() {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-4 md:hidden">
        <CustomerUserInfo />
        <CustomerPurchaseInformation />
        <CustomerNavbar />
      </div>
      <div className="hidden md:flex h-full flex-col justify-between items-center">
        <CustomerPurchaseInformation />
        <CustomerDiscountCouponAnnouncement />
      </div>
    </HydrationBoundary>
  );
}
