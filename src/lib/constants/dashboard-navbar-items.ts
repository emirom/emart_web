import {
  CityIcon,
  CountryIcon,
  ProvincesIcon,
} from "@components/icons/DashboardIcon";
import {
  BadgeDollarSignIcon,
  ClipboardClock,
  Flag,
  Home,
  LandPlot,
  MapPinHouse,
  Package,
  PackageSearch,
  PaintBucket,
  Scale,
  Settings,
  ShieldCheck,
  Store,
  Tags,
  Umbrella,
  Users
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
  { href: "/dashboard/stores", label: " فروشگاه ها", icon: Store },
  { href: "/dashboard/locations", label: " آدرس ها", icon: MapPinHouse },
  { href: "/dashboard/countries", label: " کشورها", icon: CountryIcon },
  {
    href: "/dashboard/provinces",
    label: " استان ها",
    icon: ProvincesIcon,
  },
  { href: "/dashboard/cities", label: "شهرها", icon: CityIcon },
  { href: "/currencies", label: "ارزها", icon: BadgeDollarSignIcon },
  { href: "/settings", label: "تنظیمات", icon: Settings },
];
