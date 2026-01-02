import { CircleAlert } from "lucide-react";

export default function MobileMafia() {
  return (
    <div className="flex flex-col gap-2   ">
      <div className="relative text-sm text-tint-blue-500 font-medium w-fit">
        <span>مافیای موبایل !</span>
        <CircleAlert
          className="absolute -left-3 -top-2 bg-red-600 rounded-full stroke-white"
          size={13}
        />
      </div>
      <div className="bg-tint-blue-100 rounded-md  flex flex-col gap-2">
        <p className="text-tint-blue-500 text-sm  font-medium w-[70%] text-center mx-auto py-4">
          0.5% تخفیف خرید بالای یک میلیارد تومان قابل استفاده برای همکاران
        </p>
      </div>
    </div>
  );
}
