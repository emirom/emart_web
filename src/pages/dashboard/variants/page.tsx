import { queryClient } from "@lib/apis/queryClient";
import { getVariants } from "@lib/services/variants/variants";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sp = searchParams ? await searchParams : {};
  const initialQuery = {
    page: sp.page ? Number(sp.page) : 0,
    name: sp.name ? sp.name : "",
  };
  await queryClient.prefetchQuery({
    queryKey: [
      "/variants",
      {
        limit: 10,
        skip: initialQuery.page * 10,
        name: initialQuery.name,
      },
    ],
    queryFn: () =>
      getVariants({
        limit: 10,
        skip: initialQuery.page * 10,
      }),
  });
  return <div>varient</div>;
}
