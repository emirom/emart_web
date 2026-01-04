import RegisterNewAddress from "@/pages/customer/user-address/RegisterNewAddress";
import SavedAddresses from "@/pages/customer/user-address/SavedAddresses";
import { queryClient } from "@lib/apis/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "آدرس ها",
  },
  description: "آدرس های کاربر",
};

export default async function Page() {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="border border-gray-100 rounded-md p-4 flex flex-col gap-3 ">
        <SavedAddresses />
        <RegisterNewAddress />
      </div>
    </HydrationBoundary>
  );
}
