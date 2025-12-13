"use client";
import InPersonIcon from "@components/icons/InPersonIcon";
import LeadingPostIcon from "@components/icons/LeadingPostIcon";
import NormalPostIcon from "@components/icons/NormalPostIcon";
import TipaxIcon from "@components/icons/TipaxIcon";
import { cn } from "@components/lib/utils";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import PostMethodDetailsModal from "./PostMethodDetailsModal";

const shippingMethods = [
  {
    id: uuidv4(),
    label: "پست عادی",
    postInterval: "ارسال بین 2 الی 5 روز کاری",
    price: 70000,
    icon: <NormalPostIcon />,
    value: "NORMAL",
  },
  {
    id: uuidv4(),
    label: "پست پیشتاز",
    postInterval: "ارسال بین 2 الی 3 روز کاری",
    price: 120000,
    icon: <LeadingPostIcon />,
    value: "LEADING",
  },
  {
    id: uuidv4(),
    label: "پست تیپاکس ",
    postInterval: "ارسال بین 2 الی 5 روز کاری",
    price: 120000,
    icon: <TipaxIcon />,
    value: "TIPAX",
  },
  {
    id: uuidv4(),
    label: "مراجعه حضوری",
    postInterval: "مراجعه حضوری",
    price: "بدون هزینه",
    icon: <InPersonIcon />,
    value: "INPERSON",
  },
];

export default function MobileShippingMethods() {
  const [selectedMethod, setSelectedMethod] = React.useState<
    "NORMAL" | "LEADING" | "TIPAX" | "INPERSON" | string
  >("NORMAL");
  return (
    <div className="py-2 mt-4 mb-10">
      <p className="text-tint-blue-500 text-xs font-medium ">شیوه ارسال</p>

      <ul className="grid grid-cols-1 gap-y-12 gap-2 mt-2 sm:grid-cols-2 text-nowrap">
        {shippingMethods.map((method) => (
          <li
            key={method.id}
            className="px-4 py-2 border border-tint-blue-500 rounded-lg cursor-pointer relative"
            onClick={() => setSelectedMethod(method.value)}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={cn(
                  "text-sm font-semibold",
                  selectedMethod === method.value
                    ? "text-success-light"
                    : "text-tint-blue-500",
                )}
              >
                {method.label}
              </span>
              <span className="text-[#F3F3F3]">{method.icon}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">{method.postInterval}</span>
              <span
                className={cn(
                  "text-xs font-medium",
                  selectedMethod === method.value
                    ? "text-success-light"
                    : "text-tint-blue-500",
                )}
              >
                {method.price} تومان
              </span>
            </div>
            <PostMethodDetailsModal
              price={10000}
              description="مورد 1
لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
و با استفاده از  طراحان گرافیک است، 
چاپگرها و متون بلکه روزنامه و مجله در ستون و  سطرآنچنان که لازم است، 
و برای شرایط فعلی تکنولوژی مورد نیاز، 
و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، 
کتابهای زیادی در شصت و سه  درصد گذشته حال و آینده، 
شناخت فراوان جامعه و متخصصان را می طلبد، 
مورد 2
تا با  نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان  خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، 
در این صورت می توان امید  داشت که تمام و دشواری موجود در ارائه راهکارها، 
و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی،"
              title="بیمه تجهیزات دیجیتال | حضرت ابوالفضل"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
