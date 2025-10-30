import { v4 as uuidV4 } from "uuid";

interface FooterItems {
  subTitle: string;
  h$ref: string;
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
        h$ref: "/",
        subTitle: "بلاگ",
        id: uuidV4(),
      },
      {
        h$ref: "/",
        subTitle: "خرید گوشی",
        id: uuidV4(),
      },
      {
        h$ref: "/",
        subTitle: "گوشی آیفون",
        id: uuidV4(),
      },
      {
        h$ref: "/",
        subTitle: "گوشی شیائومی",
        id: uuidV4(),
      },
      {
        h$ref: "/",
        subTitle: "مقایسه گوشی",
        id: uuidV4(),
      },
      {
        h$ref: "/",
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
        h$ref: "/",
        id: uuidV4(),
        subTitle: "گوشی آیفون 13 پرومکس",
      },
      {
        h$ref: "/",
        id: uuidV4(),
        subTitle: "گوشی سامسونگ اس 24 اولترا",
      },
      {
        h$ref: "/",
        id: uuidV4(),
        subTitle: "گوشی شیائومی رد می نوت 14",
      },
      {
        h$ref: "/",
        id: uuidV4(),
        subTitle: "گوشی سامسونگ اس 25",
      },
      {
        h$ref: "/",
        id: uuidV4(),
        subTitle: "گوشی اقتصادی",
      },
    ],
  },
  {
    title: "درباره ما",
    id: uuidV4(),
    footerItems: [
      { h$ref: "/", id: uuidV4(), subTitle: "ماهور همراه در یک نگاه" },
      { h$ref: "/", id: uuidV4(), subTitle: "تیم ماهور همراه" },
      { h$ref: "/", id: uuidV4(), subTitle: "سوالات متداول" },
      { h$ref: "/", id: uuidV4(), subTitle: "فروش حضوری" },
      { h$ref: "/", id: uuidV4(), subTitle: "تماس با ما" },
    ],
  },
  {
    id: uuidV4(),
    title: "پیش از خرید",
    footerItems: [
      { h$ref: "/", id: uuidV4(), subTitle: "راهنمای خرید اقساطی" },
      { h$ref: "/", id: uuidV4(), subTitle: "خرید سازمانی" },
      { h$ref: "/", id: uuidV4(), subTitle: "گوشی آیفون" },
      { h$ref: "/", id: uuidV4(), subTitle: "راهنمای خرید از ماهور همراه" },
      { h$ref: "/", id: uuidV4(), subTitle: "روش های خرید از ماهور همراه" },
      { h$ref: "/", id: uuidV4(), subTitle: "ضمانت ها و گارانتی محصولات" },
      { h$ref: "/", id: uuidV4(), subTitle: "شیوه ها و هزینه ارسال" },
      { h$ref: "/", id: uuidV4(), subTitle: "قوانین ثبت نظر و دیدگاه" },
    ],
  },
  {
    id: uuidV4(),
    title: "پس از خرید",
    footerItems: [
      { h$ref: "/", id: uuidV4(), subTitle: "تضمین تحویل به موقع کالا" },
      { h$ref: "/", id: uuidV4(), subTitle: "روش های مرجوع کردن کالا" },
      { h$ref: "/", id: uuidV4(), subTitle: "تضمین رجیستری کالا" },
      { h$ref: "/", id: uuidV4(), subTitle: "سوالات متداول رجیستری" },
      { h$ref: "/", id: uuidV4(), subTitle: "رهگیری سفارش ها" },
      { h$ref: "/", id: uuidV4(), subTitle: "بهترین زمان ارسال" },
    ],
  },
  {
    id: uuidV4(),
    title: "قوانین و مقررات",
    footerItems: [
      { h$ref: "/", id: uuidV4(), subTitle: "قوانین و مقررات" },
      { h$ref: "/", id: uuidV4(), subTitle: "حریم خصوصی کاربران" },
      { h$ref: "/", id: uuidV4(), subTitle: "همکاری با ما" },
      { h$ref: "/", id: uuidV4(), subTitle: "چرا ماهور همراه؟" },
    ],
  },
];
