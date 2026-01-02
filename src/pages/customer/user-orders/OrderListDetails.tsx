import { Button } from "@components/ui/button";
import OrderState from "./OrderState";

export default function OrderListDetails() {
  return (
    <div className="flex flex-col gap-2 ">
      <OrderState state="SENT" />
      <ul className="border border-tint-blue-500 rounded-md flex flex-col gap-2 p-1 px-2 ">
        {Array.from({ length: 4 }, (_, i) => (
          <li
            key={i}
            className="flex items-center justify-between font-medium text-xs py-1 border-b border-dashed border-tint-blue-500 text-tint-blue-500 last:border-b-0 "
          >
            <span>کد سفارش</span>
            <span>1404/09/19</span>
          </li>
        ))}
        <li className="flex flex-col  justify-between font-medium text-xs py-2 border-b border-dashed border-tint-blue-500 text-tint-blue-500 last:border-b-0 ">
          <span>ارسال به</span>
          <p className="text-xs font-medium">
            تهران، بزرگراه آیت‌الله هاشمی رفسنجانی (نیایش)، خیابان علامه جعفری
            شمالی، خیابان سیمای ایران، کوچه گلستان چهارم
          </p>
        </li>
      </ul>
      <div className="border border-tint-blue-500 rounded-md flex flex-col gap-2 p-2">
        <div className="flex  justify-between items-center text-tint-blue-500 text-xs font-medium">
          <span>مبلغ کل :</span>
          <span>51,850,000 تومان</span>
        </div>
        <button className="text-xs font-light cursor-pointer text-tint-blue-500 ">
          جزئیات سفارش
        </button>
      </div>
      <Button className="w-full bg-sky-400 text-white font-medium text-sm cursor-pointer">
        بازگشت
      </Button>
    </div>
  );
}
