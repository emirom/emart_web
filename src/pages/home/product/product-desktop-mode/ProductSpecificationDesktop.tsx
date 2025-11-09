"use client";
import { cn } from "@components/lib/utils";
import { Button } from "@components/ui/button";
import React, { useState } from "react";

export default function ProductSpecificationDesktop() {
  const [open, setOpen] = useState<boolean>(false);
  const toggleOpen = React.useCallback(() => setOpen((prev) => !prev), []);

  const specs = Array.from({ length: 14 }, (_, i) => ({
    title: "سیستم‌عامل",
    value: "iOS 15 (قابل ارتقا به نسخه‌های بالاتر)",
  }));

  const midpoint = Math.ceil(specs.length / 2);
  const leftSpecs = specs.slice(0, midpoint);
  const rightSpecs = specs.slice(midpoint);

  return (
    <section
      className="my-4"
      aria-labelledby="product-specs-title"
      role="region"
      tabIndex={0}
      id="specification"
    >
      <div
        className={cn(
          "relative border border-sky-blue rounded-lg shadow-sm bg-white p-3 transition-[height] duration-300 ease-in-out will-change-transform",
          open ? "h-fit overflow-visible" : "h-[20vh] overflow-hidden",
        )}
        id="product-specs-content"
      >
        <div className="relative flex">
          <ul
            className="flex-1 space-y-2 px-4"
            aria-label="مشخصات سمت راست"
            role="list"
          >
            {leftSpecs.map((spec, i) => (
              <li
                key={i}
                className="flex items-center justify-between border-b border-dashed pb-2 px-3 last:border-b-0 last:pb-0"
              >
                <span className="text-sm font-medium text-tint-blue-600">
                  {spec.title}
                </span>
                <span className="text-sm text-tint-blue-600">{spec.value}</span>
              </li>
            ))}
          </ul>

          <div className="absolute top-0 bottom-0 left-1/2 w-px border-l border-dashed border-tint-blue-200 pointer-events-none" />

          <ul
            className="flex-1 space-y-2 px-4"
            aria-label="مشخصات سمت چپ"
            role="list"
          >
            {rightSpecs.map((spec, i) => (
              <li
                key={i}
                className="flex items-center justify-between border-b border-dashed pb-2 px-2  last:border-b-0 last:pb-0 "
              >
                <span className="text-sm font-medium text-tint-blue-600">
                  {spec.title}
                </span>
                <span className="text-sm text-tint-blue-600">{spec.value}</span>
              </li>
            ))}
          </ul>
        </div>
        {!open && (
          <div
            className="absolute inset-x-0 bottom-0 h-7 bg-gradient-to-t from-gray-100 via-transparent to-transparent pointer-events-none"
            aria-hidden="true"
          />
        )}
      </div>

      <div className="flex justify-center mb-2">
        <Button
          onClick={toggleOpen}
          className="text-tint-blue-500 bg-white border border-tint-blue-500 rounded-tl-none rounded-tr-none border-t-0 py-[0.125rem] mx-auto cursor-pointer text-xs"
          aria-expanded={open}
          aria-controls="product-specs-content"
          type="button"
        >
          {open ? "بستن" : "بیشتر"}
        </Button>
      </div>
    </section>
  );
}
