"use client";

import { cn } from "@components/lib/utils";
import { Button } from "@components/ui/button";
import {
  BadgeCheck,
  CalendarDays,
  ShieldEllipsis,
  StoreIcon,
  Truck,
} from "lucide-react";

const warrantyItems = [
  { icon: StoreIcon, label: "فروشنده: ماهور همراه" },
  { icon: ShieldEllipsis, label: "۱۸ ماه گارانتی ماهور" },
  { icon: BadgeCheck, label: "۷ روز مهلت بازگشت کالا" },
  { icon: Truck, label: "ارسال فوری و رایگان" },
];

export default function ProductMobileWarranty() {
  return (
    <section
      aria-labelledby="product-warranty-title"
      className={cn(
        "flex items-stretch gap-3 mt-4 rounded-lg shadow-sm border border-gray-100 p-3"
      )}
    >
      <div className="w-full flex flex-col justify-between gap-2">
        <h2 id="product-warranty-title" className="sr-only">
          اطلاعات گارانتی و فروشنده
        </h2>

        <ul className="flex flex-col gap-1" role="list">
          {warrantyItems.map(({ icon: Icon, label }, index) => (
            <li
              key={index}
              className="flex items-center gap-1 text-tint-blue-600"
              aria-label={label}
            >
              <Icon
                width={16}
                height={16}
                aria-hidden="true"
                focusable="false"
                className="text-tint-blue-600"
              />
              <span className="text-xs font-medium text-tint-blue-500">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2 justify-end">
        <Button
          type="button"
          aria-label="مشاهده زمان ارسال محصول"
          title="ارسال به تهران همین امروز"
          className="bg-tint-blue-100 text-tint-blue-600 hover:bg-tint-blue-200 flex justify-center items-center gap-1 py-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-tint-blue-500"
        >
          <CalendarDays width={14} height={14} aria-hidden="true" />
          <span className="text-xs font-semibold">
            ارسال به تهران همین امروز
          </span>
        </Button>

        <Button
          type="button"
          aria-label="افزودن محصول به سبد خرید"
          title="افزودن محصول به سبد خرید"
          className="bg-tint-blue-500 hover:bg-tint-blue-600 text-white text-xs py-2 font-semibold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-tint-blue-500"
        >
          افزودن به سبد خرید
        </Button>
      </div>
    </section>
  );
}
