"use client";

import { Button } from "@components/ui/button";
import { ListFilter } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

type Filter = {
  label: string;
  href: string;
  segment: string;
};

export default function ProductComparisonFilterLink({ id }: { id: string }) {
  const segment = useSelectedLayoutSegment("tabs");

  const filters: Filter[] = [
    {
      label: "پربازدیدترین",
      href: `/product-comparison/${id}/mostVisited`,
      segment: "mostVisited",
    },
    {
      label: "جدیدترین",
      href: `/product-comparison/${id}/newest`,
      segment: "newest",
    },
    {
      label: "پرفروش ترین",
      href: `/product-comparison/${id}/bestSeller`,
      segment: "bestSeller",
    },
    {
      label: "گران ترین",
      href: `/product-comparison/${id}/mostExpensive`,
      segment: "mostExpensive",
    },
    {
      label: "ارزان ترین",
      href: `/product-comparison/${id}/cheapest`,
      segment: "cheapest",
    },
    {
      label: "پرتخفیف ترین",
      href: `/product-comparison/${id}/discounts`,
      segment: "discounts",
    },
  ];

  const activeSegment = segment ?? "mostVisited";

  return (
    <nav className="flex items-center gap-4 bg-tint-blue-100 rounded-lg p-2 py-1 text-tint-blue-500 text-sm font-medium mb-4">
      <ListFilter width={19} height={19} />
      <div className="flex items-center gap-6 w-full">
        {filters.map((filter) => {
          // const isActive = activeSegment === filter.segment;
          return (
            <Link
              key={filter.segment}
              href={filter.href}
              prefetch={false}
              className={`pb-1 py-[0.625rem] border-b-2 transition-all duration-200 ${
                filter.href.endsWith(activeSegment ?? "")
                  ? "border-tint-blue-500 text-tint-blue-500"
                  : "border-transparent hover:border-tint-blue-500"
              }`}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>
      <Button className="bg-white text-tint-blue-500 cursor-pointer">
        مقایسه محصول (۲)
      </Button>
    </nav>
  );
}
