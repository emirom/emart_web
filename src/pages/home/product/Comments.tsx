"use client";
import { ListFilter } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CommentsItem from "./CommenstItem";

const filters = [
  { id: uuidv4(), title: "جدیدترین نظرات" },
  { id: uuidv4(), title: "بیشترین امتیاز" },
  { id: uuidv4(), title: "مفیدترین ها" },
];

export default function Comments() {
  const [filter, setFilter] = useState("");
  return (
    <div>
      <h3 id="comments" className="py-4 text-tint-blue-500 text-sm font-bold">
        نظرات کاربران
      </h3>

      <div className="flex items-center gap-2 text-sm text-tint-blue-500 font-medium mb-4">
        <ListFilter width={15} height={15} />

        {filters.map((item) => (
          <button key={item.id} onClick={() => setFilter(item.id)}>
            {item.title}
          </button>
        ))}
      </div>
      {Array.from({ length: 10 }, (_, index) => (
        <CommentsItem key={index} />
      ))}
    </div>
  );
}
