import { Button } from "@components/ui/button";
import { CalendarDays } from "lucide-react";
import SellerInformation from "./SellerInformation";

export default function ProductPricingSection() {
  return (
    <div className="flex justify-between gap-4 mt-4">
      <div className="border rounded-lg w-full p-8">
        <SellerInformation />
      </div>

      <div className="flex flex-col justify-between">
        <div className="flex justify-between gap-2">
          <span className="flex items-center justify-between px-4 py-2 bg-red-800 text-white text-xs font-medium text-nowrap rounded-lg">
            ۵٪ تخفیف
          </span>
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
        </div>

        <small className="text-tint-blue-500 line-through text-xs">
          90,000,000 تومان
        </small>

        <div className="flex items-center justify-between text-sky-500 text-sm font-medium">
          <span>88,500,000 تومان</span>
          <div className="flex gap-2 items-center">
            <span className="w-2 h-2 rounded-full bg-green-200"></span>
            <span>موجود در انبار</span>
          </div>
        </div>

        <Button className="bg-tint-blue-500 py-7 text-white w-full">
          افزودن به سبد خرید
        </Button>
      </div>
    </div>
  );
}
