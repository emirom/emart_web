import { cn } from "@components/lib/utils";
import { Button } from "@components/ui/button";
import { Shield, Store } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function ProductGuaranteeItem({
  id,
  selected,
  setSelected,
}: {
  id: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}) {
  return (
    <li
      className={cn(
        "flex items-center justify-between rounded-lg gap-2  p-3",
        id === selected ? "bg-sky-blue" : "bg-tint-blue-100",
      )}
      aria-label="اطلاعات فروشنده، گارانتی و قیمت محصول"
    >
      <span
        className="block h-[1.625rem] w-[0.125rem] rounded-[0.4375rem] bg-tint-blue-500"
        aria-hidden="true"
      ></span>

      <div
        className="flex items-center text-xs font-medium text-tint-blue-600 gap-1"
        aria-label="فروشنده: ماهور همراه"
      >
        <Store
          width={15}
          height={15}
          aria-hidden="true"
          focusable="false"
          className="text-tint-blue-600"
        />
        <span>ماهور همراه</span>
      </div>

      <div
        className="flex items-center text-xs font-medium text-tint-blue-600 gap-1"
        aria-label="۱۸ ماه گارانتی ماهور"
      >
        <Shield
          width={15}
          height={15}
          aria-hidden="true"
          focusable="false"
          className="text-tint-blue-600"
        />
        <span>۱۸ ماه گارانتی ماهور</span>
      </div>

      <div
        className="grid grid-cols-2 gap-1 items-center text-center w-1/4 lg:max-w-fit  "
        aria-labelledby="price-info-label"
      >
        <span id="price-info-label" className="sr-only">
          اطلاعات قیمت و تخفیف
        </span>

        <span
          className="bg-red-700 w-fit text-white rounded-md text-xs font-semibold py-1 px-2"
          aria-label="تخفیف ۵ درصدی"
        >
          ۵٪
        </span>

        <span
          className="line-through text-start text-gray-700  text-xs"
          aria-label="قیمت قبل از تخفیف ۹۹,۰۰۰ تومان"
        >
          ۹۹,۰۰۰
        </span>

        <span
          className="text-tint-blue-600 text-start text-xs col-span-2 font-bold "
          title="قیمت نهایی 88,500,000 تومان"
          aria-label="قیمت نهایی: ۸۸ میلیون و پانصد هزار تومان"
        >
          88,500,000 تومان
        </span>
      </div>

      <Button
        onClick={() => setSelected(id)}
        type="button"
        aria-label="افزودن محصول به سبد خرید"
        title="افزودن به سبد خرید"
        className="bg-tint-blue-500 hover:bg-tint-blue-600 text-white text-[0.625rem] px-1 sm:text-sm sm:font-semibold sm:py-2 sm:px-3 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-tint-blue-500"
      >
        افزودن به سبد خرید
      </Button>
    </li>
  );
}
