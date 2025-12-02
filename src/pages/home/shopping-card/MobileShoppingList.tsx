import CustomImage from "@components/CustomImage";
import { Button } from "@components/ui/button";
import {
  BadgePercent,
  ChevronLeft,
  EllipsisVertical,
  Shield,
} from "lucide-react";

export default function MobileShoppingList() {
  return (
    <ul role="list" aria-label="لیست کالاهای سبد خرید">
      {Array.from({ length: 10 }).map((_, index) => (
        <li
          key={index}
          role="listitem"
          className="grid grid-cols-12 gap-3 border-b border-b-gray-100 pb-4 pt-2"
        >
          <div className="col-span-5">
            <div className="flex items-center justify-between">
              <Button
                aria-label="تنظیمات محصول"
                className="bg-transparent border border-black rounded-lg p-1"
              >
                <EllipsisVertical
                  aria-hidden="true"
                  className="stroke-gray-600"
                />
              </Button>

              <div className="flex items-center gap-2">
                <span
                  className="flex items-center justify-center px-2 py-1 rounded-lg bg-orange-700 text-white text-sm font-medium"
                  aria-label="درصد تخفیف"
                >
                  ۱۴٪
                </span>

                <BadgePercent aria-hidden="true" className="stroke-red-600" />
              </div>
            </div>

            {/* IMAGE */}
            <figure className="aspect-square my-3" role="figure">
              <CustomImage
                className="w-full h-full"
                src="/images/mobile-ex.png"
                alt="تصویر محصول آیفون ۱۶ پرومکس"
                fill
              />
              <figcaption className="sr-only">
                تصویر محصول آیفون ۱۶ پرومکس
              </figcaption>
            </figure>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-span-7 text-tint-blue-500">
            <h2 className="text-sm font-semibold">آیفون ۱۶ پرومکس</h2>

            <p className="text-xs leading-5 mt-2 font-medium">
              آیفون 16 پرومکس رجیستر‌شده دو سیم‌کارت 128 گیگابایت با رم 8
              گیگابایت
            </p>

            <ul
              className="my-4 flex flex-col gap-2"
              role="list"
              aria-label="ویژگی‌ها"
            >
              {Array.from({ length: 4 }, (_, i) => (
                <li
                  key={i}
                  role="listitem"
                  className="flex items-center font-medium text-sm gap-2 text-tint-blue-500"
                >
                  <Shield aria-hidden="true" />
                  <span>گارانتی اصالت و سلامت فیزیکی کالا</span>
                </li>
              ))}
            </ul>

            <p
              className="text-tint-blue-500 text-sm font-semibold"
              aria-label="قیمت نهایی"
            >
              105,000,000 تومان
            </p>

            <div className="mb-3 mt-2 flex items-center">
              <span
                className="text-green-300 text-xs font-medium"
                aria-label="تخفیف"
              >
                1,350,000 تومان
              </span>
            </div>
          </div>

          {/* INSURANCE BOX */}
          <div
            className="col-span-12 p-3 py-4 flex items-center gap-3 rounded-lg border border-tint-blue-500 mb-2"
            role="group"
            aria-labelledby="insurance-title"
          >
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5"
                aria-label="فعال‌سازی بیمه"
              />
            </label>

            <div className="w-full text-tint-blue-500">
              <p
                id="insurance-title"
                className="text-xs font-medium leading-5"
                aria-label="عنوان بیمه"
              >
                بیمه تجهیزات دیجیتال | حضرت ابوالفضل
              </p>

              <span className="text-sm font-medium" aria-label="قیمت بیمه">
                1,350,000 تومان
              </span>
            </div>

            <button
              className="flex items-center text-tint-blue-500 gap-1"
              aria-label="مشاهده جزئیات بیمه"
            >
              <span>جزئیات</span>
              <ChevronLeft aria-hidden="true" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
