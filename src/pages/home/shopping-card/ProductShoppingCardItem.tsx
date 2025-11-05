import { DeleteButton } from "@components/BtnWithIcon";
import CustomImage from "@components/CustomImage";
import { Apple, Droplet, HardDrive } from "lucide-react";

export default function ProductShoppingCardItem() {
  return (
    <li className="flex items-start gap-4 bg-[#F9FBFF] rounded-xl p-3 shadow-sm pr-0 mb-15">
      <div className="w-[10rem] h-[7.125rem] flex items-center justify-center flex-shrink-0 rounded-xl shadow-lg bg-white overflow-hidden transform scale-y-[1.8]">
        <CustomImage
          src="/images/related-porduct.png"
          alt="تصویر محصول آیفون 16 پرو مکس"
          rounded
          className="object-fill w-[50%] h-[50%]"
          priority
          fill
        />
      </div>
      <div className="flex flex-col justify-between flex-1 text-right">
        <div className="space-y-2">
          <div className="flex items-center gap-1 justify-end">
            <span className="text-xs text-tint-blue-600 font-medium">
              iPhone 16 Pro Max
            </span>
            <Apple className="w-4 h-4 text-tint-blue-500" />
          </div>
          <div className="flex items-center gap-1 justify-end">
            <span className="text-xs text-tint-blue-600 font-medium">
              رنگ: نقره‌ای
            </span>
            <Droplet className="w-4 h-4 text-tint-blue-500" />
          </div>
          <div className="flex items-center gap-1 justify-end">
            <span className="text-xs text-tint-blue-600 font-medium">
              ظرفیت: 256GB
            </span>
            <HardDrive className="w-4 h-4 text-tint-blue-500" />
          </div>
          <div className="flex items-center gap-1 justify-end">
            <span className="text-xs text-tint-blue-600 font-medium">
              ۱,۰۵۰,۰۰۰,۰۰۰
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-tint-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 pt-2">
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center text-tint-blue-600 border border-[#0F4275]/20 rounded-lg hover:bg-[#E6F0FF] transition">
              −
            </button>
            <span className="w-8 text-center text-sm font-medium text-tint-blue-700">
              1
            </span>
            <button className="w-8 h-8 flex items-center justify-center text-tint-blue-600 border border-[#0F4275]/20 rounded-lg hover:bg-[#E6F0FF] transition">
              +
            </button>
          </div>
          <DeleteButton className="p-1 m-0" />
        </div>
      </div>
    </li>
  );
}
