"use client";

import { useMemo } from "react";
import { v4 as uuid } from "uuid";
import ExpressIcon from "./icons/ExpressIcon";
import PriceGuaranteeIcon from "./icons/PriceGuaranteeIcon";
import ProductGuaranteeIcon from "./icons/ProductGuaranteeIcon";
import ProductReturnGuaranteeIcon from "./icons/ProductReturnGuaranteeIcon";
import TelephoneSupportIcon from "./icons/TelephoneSupportIcon";

export default function ProductSupport() {
  const productSupportOptions = useMemo(
    () => [
      {
        id: uuid(),
        title: "تحویل اکسپرس",
        icon: <ExpressIcon aria-hidden="true" />,
      },
      {
        id: uuid(),
        title: "ضمانت اصالت کالا",
        icon: <ProductGuaranteeIcon aria-hidden="true" />,
      },
      {
        id: uuid(),
        title: "ضمانت بازگشت کالا ۷ روز",
        icon: <ProductReturnGuaranteeIcon aria-hidden="true" />,
      },
      {
        id: uuid(),
        title: "پشتیبانی تلفنی",
        icon: <TelephoneSupportIcon aria-hidden="true" />,
      },
      {
        id: uuid(),
        title: "تضمین قیمت",
        icon: <PriceGuaranteeIcon aria-hidden="true" />,
      },
    ],
    [],
  );

  return (
    <section
      aria-labelledby="product-support-heading"
      className="mt-10 bg-tint-blue-100 rounded-lg"
    >
      <h2 id="product-support-heading" className="sr-only">
        پشتیبانی و خدمات محصول
      </h2>

      <ul
        role="list"
        className="hidden lg:flex items-center justify-between py-5 px-10"
      >
        {productSupportOptions.map((item) => (
          <li
            key={item.id}
            role="listitem"
            aria-label={item.title}
            className="flex items-center gap-3"
          >
            {item.icon}
            <span
              className="text-sm text-tint-blue-500 font-medium"
              aria-hidden="false"
            >
              {item.title}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
