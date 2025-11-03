import { MapPin, Truck, TruckIcon } from "lucide-react";
import { ReactNode } from "react";
import { v4 as uuidV4 } from "uuid";
export interface DeliveryOption {
  id: string;
  title: string;
  description: string[];
  price: string;
  icon: ReactNode;
}

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: uuidV4(),
    title: "پست پیشتاز",
    description: [
      "تحویل سریع‌تر نسبت به پست عادی با هزینه بیشتر",
      "ایده‌آل برای سفارش‌های فوری",
      "ارسال بین ۱ الی ۳ روز کاری",
    ],
    price: "۱۲۰,۰۰۰ تومان",
    icon: <Truck className="w-[10.3125rem] h-30 text-green-400 opacity-50" />,
  },
  {
    id: uuidV4(),
    title: "پست عادی",
    description: [
      "ارسال مقرون‌به‌صرفه با زمان تحویل طولانی‌تر",
      "مناسب برای سفارش‌های غیرفوری",
      "ارسال بین ۳ الی ۵ روز کاری",
    ],
    price: "۷۰,۰۰۰ تومان",
    icon: (
      <TruckIcon className="w-[10.3125rem] h-30 text-gray-300 opacity-50" />
    ),
  },
  {
    id: uuidV4(),
    title: "پست تیپاکس",
    description: [
      "ارسال سریع و مطمئن با امکان تحویل درب منزل",
      "هزینه بر اساس وزن و مسافت محاسبه می‌شود",
      "ارسال بین ۱ الی ۳ روز کاری",
    ],
    price: "۹۲,۰۰۰ تومان",
    icon: (
      <TruckIcon className="w-[10.3125rem] h-30 text-gray-300 opacity-50" />
    ),
  },
  {
    id: uuidV4(),
    title: "مراجعه حضوری",
    description: ["مراجعه حضوری جهت تحویل کالا (به‌جز روزهای تعطیل)"],
    price: "بدون هزینه",
    icon: <MapPin className="w-[10.3125rem] h-30 text-gray-300 opacity-50" />,
  },
];
