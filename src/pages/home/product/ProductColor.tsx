"use client";

import { cn } from "@components/lib/utils";
import { useState } from "react";

const COLORS = [
  { id: "white-color-option", name: "سفید", value: "#e5e5e5" },
  { id: "black-color-option", name: "مشکی", value: "#000000" },
  { id: "gold-color-option", name: "طلایی", value: "#d4af37" },
  { id: "silver-color-option", name: "نقره‌ای", value: "#c0c0c0" },
];

export default function ProductColor() {
  const [selected, setSelected] = useState<string>("");

  return (
    <fieldset
      className="flex gap-2 items-stretch my-3"
      aria-label="انتخاب رنگ محصول"
    >
      <legend className="sr-only">انتخاب رنگ</legend>

      {COLORS.map((color) => (
        <label
          key={color.id}
          htmlFor={color.id}
          className={cn(
            "flex items-center justify-center grow gap-2 font-bold p-2 border rounded-lg cursor-pointer transition-all duration-200 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500",
            selected === color.id
              ? "ring-2 ring-sky-500 border-sky-500 bg-sky-50"
              : "border-gray-200 hover:bg-gray-50",
          )}
          style={{
            borderColor: selected === color.id ? color.value : "#d1d5db",
          }}
        >
          <input
            id={color.id}
            onChange={() => setSelected(color.id)}
            checked={selected === color.id}
            className="sr-only peer"
            name="product-color"
            type="radio"
            value={color.value}
            aria-label={`انتخاب رنگ ${color.name}`}
          />

          <span
            aria-hidden="true"
            className="w-5 h-5 rounded-full border border-gray-300 shadow-sm"
            style={{ backgroundColor: color.value }}
          />

          <span
            className={cn(
              "text-sm font-semibold text-center select-none",
              selected === color.id ? "text-sky-700" : "text-gray-700",
            )}
          >
            {color.name}
          </span>
        </label>
      ))}
    </fieldset>
  );
}
