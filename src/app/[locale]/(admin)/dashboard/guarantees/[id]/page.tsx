import EditGuaranteeForm from "@/pages/dashboard/guarantees/EditGuaranteeForm";
import { queryClient } from "@lib/apis/queryClient";
import { getGuaranteesId } from "@lib/services/guarantees/guarantees";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<string, string>>;
}) {
  const { id } = await params;

  const guarantee = await getGuaranteesId(id);
  if (guarantee) {
    return {
      title: `ویرایش گارانتی ${guarantee.data.title}`,
      description: `ویرایش گارانتی ${guarantee.data.title}`,
    };
  }
  return {};
}
export default async function Page({
  params,
}: {
  params: Promise<Record<string, string>>;
}) {
  const { id } = await params;
  await queryClient.prefetchQuery({
    queryKey: ["/guarantees", id],
    queryFn: () => getGuaranteesId(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <header
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mb-6 border-b border-gray-200 pb-3"
        aria-label="ویرایش گارانتی"
      >
        <h1 className="text-sm font-bold text-tint-blue-600 tracking-tight">
          ویرایش گارانتی
        </h1>

        <Link
          href="/dashboard/guarantees"
          aria-label="بازگشت به لیست گارانتی‌ها"
          className="text-sm text-tint-blue-500 hover:text-tint-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-tint-blue-500 focus-visible:ring-offset-2 transition-colors duration-200 font-medium mt-2 sm:mt-0"
        >
          ← بازگشت
        </Link>
      </header>
      <EditGuaranteeForm id={id} />
    </HydrationBoundary>
  );
}
