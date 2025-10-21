import TreeRender from "@/pages/dashboard/category/TreeRender";
import { getCategories } from "@lib/services/categories/categories";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Dashboard() {
  const queryClient = new QueryClient();
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
