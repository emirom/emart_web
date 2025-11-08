"use client";

import StarRating from "@components/StarRating";
import { Button } from "@components/ui/button";
import { ListFilter } from "lucide-react";
import { useState } from "react";
import CommentsItem from "./CommenstItem";

const filters = [
  { id: "new", title: "جدیدترین نظرات" },
  { id: "highRate", title: "بیشترین امتیاز" },
  { id: "useful", title: "مفیدترین ها" },
];

export default function Comments() {
  const [filter, setFilter] = useState<string>("new");

  return (
    <section aria-labelledby="comments-heading" className="mb-6" id="comments">
      <h3
        id="comments-heading"
        className="py-4 text-tint-blue-500 text-sm font-bold"
      >
        نظرات کاربران
      </h3>

      <div
        className="flex items-center gap-3 text-sm text-tint-blue-500 font-medium mb-4"
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

      <ul className="space-y-2">
        {Array.from({ length: 10 }, (_, index) => (
          <li key={index}>
            <CommentsItem />
          </li>
        ))}
      </ul>
      <div className="my-4">
        <Button className="w-full bg-tint-blue-500 text-white text-sm font-medium rounded-lg">
          ثبت دیدگاه شما
        </Button>
        <p className="text-tint-blue-500 text-sm font-medium my-2">
          میانگین آراء کاربران از مجموع 113 رای
        </p>
        <StarRating maxStars={5} className="justify-start" size={15} />
      </div>
    </section>
  );
}
