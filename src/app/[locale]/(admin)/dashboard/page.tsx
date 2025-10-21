import TreeRender from "@/pages/dashboard/category/TreeRender";
import { queryClient } from "@lib/apis/queryClient";
import { getCategories } from "@lib/services/categories/categories";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function Dashboard() {
  await queryClient.prefetchQuery({
    queryKey: ["category-child", null],
    queryFn: () => getCategories({ parentId: null, skip: 0, limit: 20 }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TreeRender />
    </HydrationBoundary>
  );
}
