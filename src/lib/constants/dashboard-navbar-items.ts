import {
  CityIcon,
  CountryIcon,
  ProvincesIcon,
} from "@components/icons/DashboardIcon";
import {
  ClipboardClock,
  Flag,
  Home,
  LandPlot,
  Package,
  PackageSearch,
  PaintBucket,
  Scale,
  Settings,
  ShieldCheck,
  Tags,
  Umbrella,
  Users,
} from "lucide-react";

export const navItems = [
  { href: "/", label: "صفحه اصلی", icon: Home },
  { href: "/dashboard/products", label: "محصولات", icon: Package },
  { href: "/dashboard/inventory", label: "موجودی", icon: ClipboardClock },
  { href: "/dashboard/variants", label: "تنوع محصول", icon: PackageSearch },
  { href: "/dashboard/users", label: "کاربران", icon: Users },
  { href: "/dashboard/colors", label: "رنگ‌ها", icon: PaintBucket },
  { href: "/dashboard/attributes", label: "ویژگی‌ها", icon: LandPlot },
  { href: "/dashboard/labels", label: "برچسب‌ها", icon: Tags },
  { href: "/dashboard/units", label: "کمیت ها", icon: Scale },
  { href: "/dashboard/brands", label: "برندها", icon: Flag },
  { href: "/dashboard/guarantees", label: "گارانتی ها", icon: ShieldCheck },
  { href: "/dashboard/insurances", label: "بیمه ها", icon: Umbrella },
  { href: "/dashboard/countries", label: " کشورها", icon: CountryIcon },
  {
    href: "/dashboard/provinces",
    label: " استان ها",
    icon: ProvincesIcon,
  },
  { href: "/dashboard/city", label: "شهرها", icon: CityIcon },
  { href: "/settings", label: "تنظیمات", icon: Settings },
];
