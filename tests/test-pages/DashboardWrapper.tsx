import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { queryClient } from "../../src/lib/apis/queryClient";
import { getCategories } from "../../src/lib/services/categories/categories";
import TreeRender from "./TreeRenderWrapper";

export default async function DashboardWrapper() {
  await queryClient.prefetchQuery({
    queryKey: ["/categories", { parentId: null, skip: 0, limit: 20 }],
    queryFn: () => getCategories({ parentId: null, skip: 0, limit: 20 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold">دسته بندی ها</h2>
        <a
          className="bg-sky-500 p-2 rounded-lg text-white"
          href="/dashboard/category/add"
        >
          افزودن دسته بندی
        </a>
      </div>
      <TreeRender />
    </HydrationBoundary>
  );
}
