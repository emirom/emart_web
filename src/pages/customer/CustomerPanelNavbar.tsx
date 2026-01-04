import { cn } from "@components/lib/utils";
import { customerNavbar } from "@lib/constants/customer-navbar";
import Link from "next/link";
import CustomerDashboardLayoutButton from "./CustomerDashboardLayoutButton";
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
      <CustomerDashboardLayoutButton />
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
