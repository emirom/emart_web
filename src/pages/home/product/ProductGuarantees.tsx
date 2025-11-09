"use client";

import { cn } from "@components/lib/utils";
import { useState } from "react";
import ProductGuaranteeItem from "./product-mobile-mode/ProductGuaranteeItem";

export default function ProductGuarantees() {
  const [selected, setSelected] = useState<string>("");

  return (
    <section
      aria-labelledby="product-guarantees-title"
      className={cn(
        "my-4  rounded-lg shadow-sm bg-white p-3",
        "md:shadow-none md:px-0",
      )}
    >
      <h2 id="product-guarantees-title" className="sr-only ">
        قیمت همکاری
      </h2>
      <h2
        id="product-guarantees-title"
        className="hidden md:block text-tint-blue-500 text-sm font-medium mb-4 "
      >
        قیمت همکاری
      </h2>

      <ul role="list" className="flex flex-col gap-2">
        {Array.from({ length: 4 }, (_, indx) => (
          <ProductGuaranteeItem
            key={indx}
            id={indx.toString()}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </ul>
    </section>
  );
}
