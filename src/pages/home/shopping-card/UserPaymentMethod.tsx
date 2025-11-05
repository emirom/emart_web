"use client";

import CustomImage from "@components/CustomImage";
import { cn } from "@components/lib/utils";
import { Button } from "@components/ui/button";
import { useState } from "react";
import ShoppingCardPortalButton from "./ShoppingCardPortalButton";

export default function UserPaymentMethod() {
  const [selected, setSelected] = useState<number>(0);
  return (
    <div className="p-2 border border-gray-300 rounded-md">
      <h2 className="text-orange-500 text-base font-semibold mb-6 text-center">
        روش های پرداخت
      </h2>
      <form className="grid grid-cols-2 gap-10">
        {Array.from({ length: 4 }, (_, indx) => (
          <label
            key={indx}
            htmlFor="index"
            className="font-bold rounded-lg shadow-md px-10 py-4"
          >
            <h3 className="text-tint-blue-500 mb-3">پرداخت آنلاین (سداد)</h3>
            <div className="flex items-end justify-between">
              <Button
                onClick={() => setSelected(indx)}
                type="button"
                className={cn(
                  "border border-gray-500 font-bold bg-white text-tint-blue-500  px-10",
                  selected === indx
                    ? "bg-green-400 border-green-400 text-white"
                    : "",
                )}
              >
                انتخاب
              </Button>
              <CustomImage
                src="/images/sadad.png"
                alt="sada"
                className="w-[9.625rem] h-[6.9375rem] object-center"
                width={170}
                height={150}
              />
            </div>
          </label>
        ))}
        <ShoppingCardPortalButton
          onClick={() => console.log("hello world")}
          className="text-white bg-green-400"
          label="پرداخت"
        />
      </form>
      <div className="py-5 pb-2 flex flex-col gap-2 text-[12px] leading-relaxed">
        <p>
          با انتخاب “پرداخت در محل” لطفاً مبلغ سفارش را هنگام تحویل آماده داشته
          باشید.
        </p>
        <p>
          کد رهگیری پس از ارسال در اختیار شما قرار می‌گیرد. می‌توانید وضعیت بسته
          را از طریق سامانه پستی به آدرس tracking.post.ir بررسی کنید.
        </p>
        <p>
          در صورت مشاهده هرگونه آسیب‌دیدگی هنگام تحویل، از دریافت آن خودداری
          کرده و با پشتیبانی به شماره 70020070-021 تماس بگیرید.
        </p>
        <p>
          مسئولیت تأخیرهای احتمالی ناشی از شرکت‌های پستی بر عهده ما نیست، اما در
          صورت بروز مشکل، تیم پشتیبانی آماده پیگیری است.
        </p>
      </div>
    </div>
  );
}
