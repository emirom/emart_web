import { cn } from "@components/lib/utils";
import { customerNavbar } from "@lib/constants/customer-navbar";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import CustomerPanelLogout from "./CustomerPanelLogout";
import CustomerUserInfo from "./CustomerUserInfo";

export default function CustomerPanelNavbar() {
  return (
    <nav
      className={cn(
        "hidden",
        "md:col-span-3 md:flex flex-col gap-4 items-center h-full flex-1 border border-tint-blue-500 rounded-lg p-2 py-4",
      )}
    >
      <div className="flex justify-between gap-2 items-stretch w-full">
        <span className="bg-tint-blue-500 flex items-center justify-center rounded-md p-2">
          <LayoutDashboard width={20} height={20} className="stroke-white  " />
        </span>
        <button className="p-2 py-[0.375rem] flex-1 text-white bg-tint-blue-500 rounded-md font-bold text-sm cursor-pointer">
          داشبورد
        </button>
      </div>
      <CustomerUserInfo />
      <ul className="w-full flex flex-col gap-2 mt-auto mb-10">
        {customerNavbar.map((item) => (
          <li
            key={item.id}
            className="flex items-stretch gap-2 text-tint-blue-500 text-sm font-medium"
          >
            <span className=" border rounded-md flex items-center justify-center p-2">
              {item.icon}
            </span>
            <Link
              href={item.href}
              className="flex-1 border rounded-md flex items-center justify-center "
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      <CustomerPanelLogout />
    </nav>
  );
}
