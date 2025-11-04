"use client";

import CustomImage from "@components/CustomImage";
import { cn } from "@components/lib/utils";
import ProductColor from "../ProductColor";
import ProductButtonAction from "./ProductButtonAction";

export default function ProductMobileInfo() {
  return (
    <article
      className={cn(
        "shadow-md rounded-lg p-3 my-4 transition-shadow hover:shadow-lg focus-within:shadow-lg outline-none",
        "sm:hidden"
      )}
      role="region"
      aria-label="اطلاعات محصول برای موبایل"
      tabIndex={0}
    >
      <div className="flex items-stretch gap-2">
        <span
          className="w-4 h-3.5 bg-green-500 rounded-full block mt-2"
          role="status"
          aria-label="موجود در انبار"
        ></span>

        <figure className="relative flex-1">
          <CustomImage
            className="w-full aspect-[3/2] object-contain rounded-md"
            src="/images/product.png"
            alt="تصویر گوشی موبایل آیفون ۱۳ پرو مکس"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            fill
            priority
          />
          <figcaption className="sr-only">
            آیفون ۱۳ پرو مکس با دوربین سه‌گانه
          </figcaption>
        </figure>

        <ProductButtonAction />
      </div>

      <div
        className="flex items-center justify-between gap-6 my-3"
        aria-label="جزئیات قیمت محصول"
      >
        <h1
          className="text-sm font-bold leading-tight"
          title="گوشی موبايل آیفون 13 پرو مکس"
        >
          گوشی موبايل آیفون ۱۳ پرو مکس
        </h1>

        <div
          className="grid grid-cols-2 justify-between gap-1 items-center w-1/4 text-center"
          aria-label="قیمت و تخفیف"
        >
          <span className=" bg-red-700 w-fit block p-1 px-2  text-white rounded-lg text-sm py-1  font-medium">
            ۵٪
          </span>
          <span className="line-through text-gray-500 text-end text-sm">
            ۹۹,۰۰۰
          </span>
          <span
            className="text-sky-500 text-xs col-span-2 font-bold"
            title="88,500,000 تومان"
          >
            88,500,000 تومان
          </span>
        </div>
      </div>
      <ProductColor />
    </article>
  );
}
