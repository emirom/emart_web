import {
  BatteryIcon,
  BoxIcon,
  CpuIcon,
  HeadphonesIcon,
  SmartphoneIcon,
  TabletIcon,
  UsbIcon,
  WatchIcon,
} from "lucide-react";

export const mainCategories = [
  { label: "موبایل", icon: <SmartphoneIcon /> },
  { label: "قطعات موبایل", icon: <CpuIcon /> },
  { label: "تبلت", icon: <TabletIcon /> },
  { label: "شارژر موبایل", icon: <BatteryIcon /> },
  { label: "کیف و قاب", icon: <BoxIcon /> },
  { label: "هدفون و هندزفری", icon: <HeadphonesIcon /> },
  { label: "ساعت و مچ‌بند", icon: <WatchIcon /> },
  { label: "کابل و تبدیل", icon: <UsbIcon /> },
];

export const subMenuData = {
  موبایل: [
    {
      title: "برندهای گوشی",
      items: [
        { text: "سامسونگ", href: "/products/mobile/brands/samsung" },
        { text: "آیفون", href: "/products/mobile/brands/apple" },
        { text: "شیائومی", href: "/products/mobile/brands/xiaomi" },
        { text: "هواوی", href: "/products/mobile/brands/huawei" },
      ],
    },
    {
      title: "گوشی براساس قیمت",
      items: [
        { text: "کمتر از ۵ میلیون", href: "/products/mobile/price/under-5" },
        { text: "۵ تا ۱۰ میلیون", href: "/products/mobile/price/5-10" },
        { text: "۱۰ تا ۲۰ میلیون", href: "/products/mobile/price/10-20" },
        { text: "بیشتر از ۲۰ میلیون", href: "/products/mobile/price/above-20" },
      ],
    },
    {
      title: "لوازم جانبی موبایل",
      items: [
        { text: "هندزفری", href: "/products/mobile/accessories/headphones" },
        { text: "کابل و شارژر", href: "/products/mobile/accessories/charger" },
        { text: "پاوربانک", href: "/products/mobile/accessories/powerbank" },
        { text: "گلس و قاب", href: "/products/mobile/accessories/case" },
      ],
    },
    {
      title: "بیشترین بازدیدها",
      items: [
        {
          text: "سامسونگ Galaxy S23",
          href: "/products/mobile/popular/samsung-s23",
        },
        { text: "iPhone 15", href: "/products/mobile/popular/iphone-15" },
        { text: "شیائومی 13", href: "/products/mobile/popular/xiaomi-13" },
      ],
    },
  ],
  تبلت: [
    {
      title: "برندهای تبلت",
      items: [
        { text: "اپل iPad", href: "/products/tablet/brands/apple" },
        { text: "سامسونگ Galaxy Tab", href: "/products/tablet/brands/samsung" },
        { text: "لنوو", href: "/products/tablet/brands/lenovo" },
      ],
    },
    {
      title: "بیشترین بازدیدها",
      items: [
        { text: "iPad Pro", href: "/products/tablet/popular/ipad-pro" },
        {
          text: "Galaxy Tab S8",
          href: "/products/tablet/popular/galaxy-tab-s8",
        },
      ],
    },
  ],
  "هدفون و هندزفری": [
    {
      title: "برندها",
      items: [
        { text: "AirPods", href: "/products/headphones/brands/airpods" },
        {
          text: "Galaxy Buds",
          href: "/products/headphones/brands/galaxy-buds",
        },
        { text: "Sony", href: "/products/headphones/brands/sony" },
      ],
    },
    {
      title: "پرفروش‌ها",
      items: [
        {
          text: "AirPods Pro",
          href: "/products/headphones/popular/airpods-pro",
        },
        {
          text: "Galaxy Buds 2",
          href: "/products/headphones/popular/galaxy-buds-2",
        },
      ],
    },
  ],
};
