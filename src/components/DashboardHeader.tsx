"use client";

import { DashboardMobileNavbar } from "./DashboardMobileNavbar";
import { cn } from "./lib/utils";

export default function DashboardHeader() {
  return (
    <div className="w-full max-w-[99%] mx-auto ">
      <header
        role="banner"
        aria-label="پنل مدیریت"
        className={cn("rounded-md p-2 bg-white shadow-md")}
      >
        <div className=" flex items-center justify-between text-gray-900">
          <div className="flex items-center gap-2">
            <DashboardMobileNavbar />
            <h1 className="text-sm font-semibold 900">پنل مدیریت</h1>
          </div>
          <span className="text-sm font-semibold">
            دوشنبه 4 فروردین ماه 1403
          </span>
        </div>
      </header>
    </div>
  );
}
