"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

const links = [
  {
    href: "/dashboard/inventory/add/addInventory",
    segment: "addInventory",
    label: "افزودن موجودی",
  },
  {
    href: "/dashboard/inventory/add/cooperationPrice",
    segment: "cooperationPrice",
    label: "قیمت همکاری",
  },
];

export default function AddInventoryLinked() {
  const activeSegment = useSelectedLayoutSegment();
  const pathname = usePathname() ?? "";

  return (
    <nav
      dir="rtl"
      className="flex items-stretch gap-1 rounded-lg bg-slate-100 p-1 w-fit mb-5"
    >
      {links.map((link, index) => {
        const isActive =
          activeSegment === link.segment ||
          pathname === link.href ||
          (!activeSegment && index === 0 && pathname.endsWith("/add"));

        return (
          <Link
            key={link.segment}
            href={link.href}
            className={clsx(
              "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
              isActive
                ? "bg-white text-tint-blue-500 shadow-sm"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-200",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
