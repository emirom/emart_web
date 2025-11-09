import { BadgeCheck, ShieldEllipsis, StoreIcon, Truck } from "lucide-react";

const warrantyItems = [
  { icon: StoreIcon, label: "فروشنده: ماهور همراه" },
  { icon: ShieldEllipsis, label: "۱۸ ماه گارانتی ماهور" },
  { icon: BadgeCheck, label: "۷ روز مهلت بازگشت کالا" },
  { icon: Truck, label: "ارسال فوری و رایگان" },
];
export default function SellerInformation() {
  return (
    <ul className="flex flex-col gap-1 justify-between lg:gap-4" role="list">
      {warrantyItems.map(({ icon: Icon, label }, index) => (
        <li
          key={index}
          className="flex items-center gap-1 text-tint-blue-600"
          aria-label={label}
        >
          <Icon
            width={16}
            height={16}
            aria-hidden="true"
            focusable="false"
            className="text-tint-blue-600"
          />
          <span className="text-xs font-medium text-tint-blue-500">
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}
