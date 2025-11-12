import { Button } from "@components/ui/button";
import { ListFilter } from "lucide-react";
import Link from "next/link";
import { v4 as uuid } from "uuid";
type Filter = {
  id: string;
  label: string;
  href: string;
};

export default function ProductComparisonFilterLink({ id }: { id: string }) {
  const filters: Filter[] = [
    {
      id: uuid(),
      label: "پربازدیدترین",
      href: `/product-comparison/${id}/mostVisited`,
    },
    {
      id: uuid(),
      label: "جدیدترین",
      href: `/product-comparison/${id}/newest`,
    },
    {
      id: uuid(),
      label: "پرفروش ترین",
      href: `/product-comparison/${id}/bestSeller`,
    },
    {
      id: uuid(),
      label: "گران ترین",
      href: `/product-comparison/${id}/mostExpensive`,
    },
    {
      id: uuid(),
      label: "ارزان ترین",
      href: `/product-comparison/${id}/discounts`,
    },
  ];
  return (
    <nav className="flex items-center gap-4 bg-tint-blue-100 rounded-lg p-2 py-3 text-tint-blue-500 text-sm font-medium ">
      <ListFilter width={19} height={19} />
      <div className="flex items-center gap-4 w-full">
        {filters.map((filter) => (
          <Link
            key={filter.id}
            href={filter.href}
            className="last:text-red-600"
          >
            {filter.label}
          </Link>
        ))}
      </div>
      <Button className="bg-white text-tint-blue-500 cursor-pointer">
        مقایسه محصول (۲)
      </Button>
    </nav>
  );
}
