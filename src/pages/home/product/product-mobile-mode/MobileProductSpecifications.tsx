"use client";

import { cn } from "@components/lib/utils";
import { Button } from "@components/ui/button";
import React from "react";

export default function MobileProductSpecifications() {
  const [open, setOpen] = React.useState(false);

  const toggleOpen = React.useCallback(() => setOpen((prev) => !prev), []);

  return (
    <section
      className="my-4"
      aria-labelledby="product-specs-title"
      role="region"
      tabIndex={0}
    >
      <h2
        id="product-specs-title"
        className="text-tint-blue-500 text-sm font-medium mb-2"
      >
        مشخصات محصول
      </h2>

      <div
        className={cn(
          "relative border border-tint-blue-500 rounded-lg shadow-sm bg-white p-3 transition-[height] duration-300 ease-in-out will-change-transform",
          open ? "h-fit overflow-visible" : "h-[10vh] overflow-hidden"
        )}
        id="product-specs-content"
      >
        <ul
          className="h-full space-y-2"
          aria-label="لیست مشخصات فنی محصول"
          role="list"
        >
          {Array.from({ length: 4 }, (_, i) => (
            <li
              key={i}
              className="flex items-center justify-between border-b border-dashed pb-2 last:border-b-0 last:pb-0"
            >
              <span className="text-sm font-medium text-tint-blue-600">
                سیستم‌عامل
              </span>
              <span className="text-sm text-tint-blue-600">
                iOS 15 (قابل ارتقا به نسخه‌های بالاتر)
              </span>
            </li>
          ))}
        </ul>

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
