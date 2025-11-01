"use client";

import { cn } from "@components/lib/utils";
import {
  Flag,
  Home,
  LandPlot,
  Package,
  PackageSearch,
  PaintBucket,
  Settings,
  ShieldCheck,
  Tags,
  Umbrella,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "صفحه اصلی", icon: Home },
    { href: "/dashboard/products", label: "محصولات", icon: Package },
    { href: "/dashboard/variants", label: "تنوع محصول", icon: PackageSearch },
    { href: "/dashboard/users", label: "کاربران", icon: Users },
    { href: "/dashboard/colors", label: "رنگ‌ها", icon: PaintBucket },
    { href: "/dashboard/attributes", label: "ویژگی‌ها", icon: LandPlot },
    { href: "/dashboard/labels", label: "برچسب‌ها", icon: Tags },
    { href: "/dashboard/brands", label: "برندها", icon: Flag },
    { href: "/dashboard/guarantees", label: "گارانتی ها", icon: ShieldCheck },
    { href: "/dashboard/insurances", label: "بیمه ها", icon: Umbrella },
    { href: "/settings", label: "تنظیمات", icon: Settings },
  ];

  return (
    <nav aria-label="منوی اصلی پنل مدیریت" className="space-y-3 text-gray-800">
      <h2
        id="dashboard-menu-heading"
        className="font-semibold text-sm text-gray-700 tracking-tight"
      >
        داشبورد
      </h2>

      <ul
        className="space-y-1"
        aria-labelledby="dashboard-menu-heading"
        role="list"
      >
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <li key={href} role="listitem">
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                  "hover:bg-gray-100",
                  isActive
                    ? "bg-primary/10 text-primary-700 font-semibold"
                    : "text-gray-700 hover:text-gray-900"
                )}
              >
                <Icon
                  className={cn(
                    "size-4 shrink-0 transition-colors duration-150",
                    isActive ? "text-primary-600" : "text-gray-500"
                  )}
                  aria-hidden="true"
                />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
