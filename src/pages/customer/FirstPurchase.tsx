import { Button } from "@components/ui/button";
import { CircleAlert } from "lucide-react";

export default function FirstPurchase() {
  return (
    <div className="flex flex-col gap-2  ">
      <div className="relative text-sm text-tint-blue-500 font-medium w-fit">
        <span>اولین خرید</span>
        <CircleAlert
          className="absolute -left-3 -top-2 bg-red-600 rounded-full stroke-white"
          size={13}
        />
      </div>
      <div className="bg-tint-blue-100 rounded-md p-4 flex flex-col gap-2">
        <p className="text-tint-blue-500 text-sm font-medium text-nowrap">
          تاریخ اعتبار : تا همیشه - 1 بار
        </p>
        <Button className="bg-red-800 text-white cursor-pointer">
          استفاده شده
        </Button>
      </div>
    </div>
  );
}
