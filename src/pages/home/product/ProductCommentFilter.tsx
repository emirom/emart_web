"use client";
import { cn } from "@components/lib/utils";
import { ListFilter } from "lucide-react";
import React from "react";

const filters = [
  { id: "new", title: "جدیدترین نظرات" },
  { id: "highRate", title: "بیشترین امتیاز" },
  { id: "useful", title: "مفیدترین ها" },
];
export default function ProductCommentFilter({
  className,
}: {
  className?: string;
}) {
  const [filter, setFilter] = React.useState<string>("new");

  return (
    <div
      className={cn(
        "flex items-center gap-3 text-sm text-tint-blue-500 font-medium mb-4",
        className,
      )}
      role="radiogroup"
      aria-label="فیلتر نظرات"
    >
      <ListFilter width={15} height={15} aria-hidden="true" />

      {filters.map((item) => (
        <button
          key={item.id}
          role="radio"
          aria-checked={filter === item.id}
          onClick={() => setFilter(item.id)}
          className={`transition-colors duration-200 ${
            filter === item.id
              ? "text-tint-blue-700 font-bold"
              : "text-tint-blue-500 hover:text-tint-blue-700"
          }`}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
}
