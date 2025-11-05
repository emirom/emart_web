import { v4 as uuidV4 } from "uuid";

interface FooterItems {
  subTitle: string;
  href: string;
  id: string;
}

export interface Footer {
  title: string;
  id: string;
  footerItems: FooterItems[];
}

export const FOOTER_ITEMS: Footer[] = [
  {
    title: "دسترسی سریع",
    id: uuidV4(),
    footerItems: [
      {
        href: "/",
        subTitle: "بلاگ",
        id: uuidV4(),
      },
      {
        href: "/",
        subTitle: "خرید گوشی",
        id: uuidV4(),
      },
      {
        href: "/",
        subTitle: "گوشی آیفون",
        id: uuidV4(),
      },
      {
        href: "/",
        subTitle: "گوشی شیائومی",
        id: uuidV4(),
      },
      {
        href: "/",
        subTitle: "مقایسه گوشی",
        id: uuidV4(),
      },
      {
        href: "/",
        subTitle: "مقایسه پیشنهادی",
        id: uuidV4(),
      },
    ],
  },
  {
    title: "پرفروش ترین محصولات",
    id: uuidV4(),
    footerItems: [
      {
        href: "/",
        id: uuidV4(),
        subTitle: "گوشی آیفون 13 پرومکس",
      },
      {
        href: "/",
        id: uuidV4(),
        subTitle: "گوشی سامسونگ اس 24 اولترا",
      },
      {
        href: "/",
        id: uuidV4(),
        subTitle: "گوشی شیائومی رد می نوت 14",
      },
      {
        href: "/",
        id: uuidV4(),
        subTitle: "گوشی سامسونگ اس 25",
      },
      {
        href: "/",
        id: uuidV4(),
        subTitle: "گوشی اقتصادی",
      },
    ],
  },
  {
    title: "درباره ما",
    id: uuidV4(),
    footerItems: [
      { href: "/", id: uuidV4(), subTitle: "ماهور همراه در یک نگاه" },
      { href: "/", id: uuidV4(), subTitle: "تیم ماهور همراه" },
      { href: "/", id: uuidV4(), subTitle: "سوالات متداول" },
      { href: "/", id: uuidV4(), subTitle: "فروش حضوری" },
      { href: "/", id: uuidV4(), subTitle: "تماس با ما" },
    ],
  },
  {
    id: uuidV4(),
    title: "پیش از خرید",
    footerItems: [
      { href: "/", id: uuidV4(), subTitle: "راهنمای خرید اقساطی" },
      { href: "/", id: uuidV4(), subTitle: "خرید سازمانی" },
      { href: "/", id: uuidV4(), subTitle: "گوشی آیفون" },
      { href: "/", id: uuidV4(), subTitle: "راهنمای خرید از ماهور همراه" },
      { href: "/", id: uuidV4(), subTitle: "روش های خرید از ماهور همراه" },
      { href: "/", id: uuidV4(), subTitle: "ضمانت ها و گارانتی محصولات" },
      { href: "/", id: uuidV4(), subTitle: "شیوه ها و هزینه ارسال" },
      { href: "/", id: uuidV4(), subTitle: "قوانین ثبت نظر و دیدگاه" },
    ],
  },
  {
    id: uuidV4(),
    title: "پس از خرید",
    footerItems: [
      { href: "/", id: uuidV4(), subTitle: "تضمین تحویل به موقع کالا" },
      { href: "/", id: uuidV4(), subTitle: "روش های مرجوع کردن کالا" },
      { href: "/", id: uuidV4(), subTitle: "تضمین رجیستری کالا" },
      { href: "/", id: uuidV4(), subTitle: "سوالات متداول رجیستری" },
      { href: "/", id: uuidV4(), subTitle: "رهگیری سفارش ها" },
      { href: "/", id: uuidV4(), subTitle: "بهترین زمان ارسال" },
    ],
  },
  {
    id: uuidV4(),
    title: "قوانین و مقررات",
    footerItems: [
      { href: "/", id: uuidV4(), subTitle: "قوانین و مقررات" },
      { href: "/", id: uuidV4(), subTitle: "حریم خصوصی کاربران" },
      { href: "/", id: uuidV4(), subTitle: "همکاری با ما" },
      { href: "/", id: uuidV4(), subTitle: "چرا ماهور همراه؟" },
    ],
  },
];
