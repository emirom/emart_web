"use client";

import { FunnelX } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

export function ClearFilterButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasQuery = !!searchParams && searchParams.size > 0;

  const handleClearFilters = () => {
    if (!pathname || !hasQuery) return;
    router.replace(pathname);
  };

  return (
    <Button
      title="پاک کردن همه فیلتر ها"
      role="button"
      onClick={handleClearFilters}
      type="button"
      disabled={!hasQuery}
      className="bg-gray cursor-pointer"
    >
      <FunnelX className="stroke-gray-400 stroke-3" />
    </Button>
  );
}
