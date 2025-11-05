import CreateGuarantee from "@/pages/dashboard/guarantees/CreateGuaranteeForm";
import { queryClient } from "@lib/apis/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "افزودن گارانتی",
  description: "افزودن گارانتی",
};
export default function Page() {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <header
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mb-6 border-b border-gray-200 pb-3"
        aria-label="افزودن گارانتی"
      >
        <h1 className="text-sm font-bold text-tint-blue-600 tracking-tight">
          افزودن گارانتی
        </h1>

        <Link
          href="/dashboard/guarantees"
          aria-label="بازگشت به لیست گارانتی‌ها"
          className="text-sm text-tint-blue-500 hover:text-tint-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-tint-blue-500 focus-visible:ring-offset-2 transition-colors duration-200 font-medium mt-2 sm:mt-0"
        >
          ← بازگشت
        </Link>
      </header>
      <CreateGuarantee />
    </HydrationBoundary>
  );
}
