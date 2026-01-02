import UserInfoForm from "@/pages/customer/user-info/UserInfoForm";
import { queryClient } from "@lib/apis/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "کاربر اطلاعات",
  description: "کاربر اطلاعات",
};

export default async function Page() {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserInfoForm />
    </HydrationBoundary>
  );
}
