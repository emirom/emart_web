import { queryClient } from "@lib/apis/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import clsx from "clsx";

export default async function Page() {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div
        className={clsx("grid items-stretch gap-2 relative ", "lg:grid-cols-2")}
      >
        <div className="p-2 border border-[#D4F1F4] rounded-[10px] "></div>
        <div className="w-full border border-[#D4F1F4] rounded-[10px] overflow-hidden"></div>
      </div>
    </HydrationBoundary>
  );
}
