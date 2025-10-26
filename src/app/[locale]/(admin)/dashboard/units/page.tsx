import UnitsTable from "@/pages/dashboard/units/UnitsTable";
import { queryClient } from "@lib/apis/queryClient";
import { getUnits } from "@lib/services/units/units";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Page() {
  await queryClient.prefetchQuery({
    queryKey: ["/units", { skip: 0, limit: 10 }],
    queryFn: () => getUnits({ skip: 0, limit: 10 }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UnitsTable />
    </HydrationBoundary>
  );
}
