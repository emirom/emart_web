"use client";

import { FunnelX } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function ClearFilterButton() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClearFilters = () => {
    if (!pathname) return;
    router.replace(pathname);
  };

  return (
    <Button
      onClick={handleClearFilters}
      type="button"
      className="bg-gray cursor-pointer"
    >
      <FunnelX className="stroke-gray-400 stroke-3" />
    </Button>
  );
}
