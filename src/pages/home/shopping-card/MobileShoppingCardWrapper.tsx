import { cn } from "@components/lib/utils";
import { Button } from "@components/ui/button";
import { AlertOctagon, Trash2 } from "lucide-react";

export default function MobileShoppingCardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("mt-15 h-full ")}
      role="region"
      aria-label="سبد خرید موبایل"
    >
      <header
        className="pt-4 pb-3 border-b border-b-gray-100 flex items-stretch justify-between"
        role="banner"
      >
        <div className="flex gap-2 text-tint-blue-500 items-center">
          <h2 id="cart-title" className="font-semibold text-base">
            سبد خرید شما
          </h2>
          <span
            aria-hidden="true"
            className="h-full w-[1px] bg-tint-blue-500"
          />
          <span className="font-medium text-xs leading-6">۳ کالا</span>
        </div>

        <button
          className="flex items-center gap-2 text-sm text-tint-blue-500"
          aria-label="حذف کل سبد خرید"
        >
          <span>حذف کل سبد خرید</span>
          <Trash2 aria-hidden="true" focusable="false" />
        </button>
      </header>

      <main role="main" className="py-3 h-[65vh] overflow-y-scroll">
        {children}
      </main>

      <footer role="contentinfo">
        <h3 className="text-sm font-medium text-tint-blue-500">صورتحساب</h3>

        <ul
          className="bg-gray border border-gray-100 rounded-md p-4 flex flex-col gap-2 mt-1"
          aria-labelledby="cart-title"
        >
          {Array.from({ length: 4 }, (_, i) => (
            <li
              key={i}
              className="flex justify-between items-center text-sm font-medium text-tint-blue-500"
              role="listitem"
            >
              <span>مجموع قیمت محصولات</span>
              <span aria-label="قیمت">1,425,000,000 تومان</span>
            </li>
          ))}
        </ul>

        <div className="text-xs flex items-center gap-1 mt-2 text-gray-600 py-3">
          <AlertOctagon width={10} height={10} aria-hidden="true" />
          <span>
            فاکتور خرید پس از تکمیل سفارش در حساب کاربری قابل مشاهده می باشد.
          </span>
        </div>

        <div className="flex justify-between items-center mt-2 py-2 border-t border-gray-100">
          <Button className="bg-green-400 text-white" aria-label="ادامه خرید">
            ادامه خرید
          </Button>
          <span className="text-tint-blue-500 font-semibold text-sm">
            1,365,000,000 تومان
          </span>
        </div>
      </footer>
    </div>
  );
}
