import TreeRender from "@/pages/dashboard/category/TreeRender";
import { queryClient } from "@lib/apis/queryClient";
import { getCategories } from "@lib/services/categories/categories";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import Link from "next/link";

export default async function Dashboard() {
  await queryClient.prefetchQuery({
    queryKey: ["/categories", { parentId: null, skip: 0, limit: 20 }],
    queryFn: () => getCategories({ parentId: null, skip: 0, limit: 20 }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold">دسته بندی ها</h2>
        <Link
          className="bg-sky-500 p-2 rounded-lg text-white  "
          href="/dashboard/category/add"
        >
          افزودن دسته بندی
        </Link>
      </div>
      <TreeRender />
    </HydrationBoundary>
  );
}
