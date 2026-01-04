"use client";
import { LayoutDashboard } from "lucide-react";

export default function CustomerDashboardLayoutButton() {
  return (
    <div className="flex justify-between gap-2 items-stretch w-full">
      <span className="bg-tint-blue-500 flex items-center justify-center rounded-md p-2">
        <LayoutDashboard width={20} height={20} className="stroke-white" />
      </span>
      <button className="p-2 py-[0.375rem] flex-1 text-white bg-tint-blue-500 rounded-md font-bold text-sm cursor-pointer">
        داشبورد
      </button>
    </div>
  );
}
