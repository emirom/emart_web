import { z as zod } from "zod";

/**
 * ایجاد یک بیمه‌نامه جدید
 */
export const postInsurancesBodyTitleMin = 2;
export const postInsurancesBodyTitleMax = 200;
export const postInsurancesBodyLogoMaxOne = 1000;
export const postInsurancesBodyPriceMin = 0;
export const postInsurancesBodyProviderNameMaxOne = 200;
export const postInsurancesBodyCoverageMaxOne = 200;
export const postInsurancesBodyExclusionsMaxOne = 200;
export const postInsurancesBodyClaimProcessMaxOne = 200;
export const postInsurancesBodyIsActiveDefault = true;
export const postInsurancesBodySortOrderDefault = 0;

export const postInsurancesBody = zod
  .object({
    title: zod.coerce
      .string()
      .min(
        postInsurancesBodyTitleMin,
        `عنوان بیمه‌نامه نمی‌تواند کمتر از ${postInsurancesBodyTitleMin} کاراکتر باشد`,
      )
      .max(
        postInsurancesBodyTitleMax,
        `عنوان بیمه‌نامه نمی‌تواند بیشتر از ${postInsurancesBodyTitleMax} کاراکتر باشد`,
      )
      .describe("عنوان بیمه‌نامه الزامی است"),
    start: zod
      .union([
        zod.iso.datetime({ message: "فرمت تاریخ معتبر نیست" }),
        zod.null(),
      ])
      .optional()
      .describe("تاریخ شروع پوشش بیمه (اختیاری)"),
    months: zod
      .union([
        zod.coerce.number({ message: "عدد معتبر وارد کنید" }),
        zod.null(),
      ])
      .optional()
      .describe("مدت زمان به ماه (اختیاری)"),
    days: zod
      .union([
        zod.coerce.number({ message: "عدد معتبر وارد کنید" }),
        zod.null(),
      ])
      .optional()
      .describe("مدت زمان به روز (اختیاری)"),
    logo: zod
      .union([
        zod
          .url({ message: "آدرس لوگو معتبر نیست" })
          .max(
            postInsurancesBodyLogoMaxOne,
            `حداکثر طول لوگو ${postInsurancesBodyLogoMaxOne} کاراکتر است`,
          ),
        zod.null(),
      ])
      .optional()
      .describe("آدرس لوگو ارائه‌دهنده (اختیاری)"),
    price: zod.coerce
      .number({ message: "عدد معتبر وارد کنید" })
      .min(
        postInsurancesBodyPriceMin,
        `قیمت نمی‌تواند کمتر از ${postInsurancesBodyPriceMin} باشد`,
      )
      .describe("هزینه برای خریدار (اختیاری)"),
    providerName: zod
      .union([
        zod.coerce
          .string()
          .max(
            postInsurancesBodyProviderNameMaxOne,
            `نام ارائه‌دهنده نمی‌تواند بیش از ${postInsurancesBodyProviderNameMaxOne} کاراکتر باشد`,
          ),
        zod.null(),
      ])
      .optional()
      .describe("نام ارائه‌دهنده بیمه (اختیاری)"),
    coverage: zod
      .union([
        zod.coerce
          .string()
          .max(
            postInsurancesBodyCoverageMaxOne,
            `حداکثر طول پوشش ${postInsurancesBodyCoverageMaxOne} کاراکتر است`,
          ),
        zod.null(),
      ])
      .optional()
      .describe("موارد تحت پوشش (اختیاری)"),
    exclusions: zod
      .union([
        zod.coerce
          .string()
          .max(
            postInsurancesBodyExclusionsMaxOne,
            `حداکثر طول موارد استثناء ${postInsurancesBodyExclusionsMaxOne} کاراکتر است`,
          ),
        zod.null(),
      ])
      .optional()
      .describe("موارد غیرمستثنی (اختیاری)"),
    claimLimit: zod
      .union([
        zod.coerce.number({ message: "عدد معتبر وارد کنید" }),
        zod.null(),
      ])
      .optional()
      .describe("حداکثر مبلغ قابل دریافت به ازای هر حادثه (اختیاری)"),
    deductible: zod
      .union([
        zod.coerce.number({ message: "عدد معتبر وارد کنید" }),
        zod.null(),
      ])
      .optional()
      .describe("مبلغی که خریدار ابتدا پرداخت می‌کند (اختیاری)"),
    claimProcess: zod
      .union([
        zod.coerce
          .string()
          .max(
            postInsurancesBodyClaimProcessMaxOne,
            `حداکثر طول ${postInsurancesBodyClaimProcessMaxOne} کاراکتر است`,
          ),
        zod.null(),
      ])
      .optional()
      .describe("نحوه درخواست بیمه (اختیاری)"),
    isActive: zod.coerce
      .boolean()
      .default(postInsurancesBodyIsActiveDefault)
      .describe("وضعیت فعال بودن بیمه‌نامه"),
    minOrderValue: zod
      .union([
        zod.coerce.number({ message: "عدد معتبر وارد کنید" }),
        zod.null(),
      ])
      .optional()
      .describe("حداقل مبلغ سفارش برای استفاده (اختیاری)"),
    maxOrderValue: zod
      .union([
        zod.coerce.number({ message: "عدد معتبر وارد کنید" }),
        zod.null(),
      ])
      .optional()
      .describe("حداکثر مبلغ سفارش قابل قبول (اختیاری)"),
    sortOrder: zod.coerce
      .number()
      .optional()
      .describe("اولویت نمایش (اختیاری)"),
  })
  .describe("موجودیت بیمه‌نامه محصول");

/**
 * پارامترهای query برای دریافت بیمه‌نامه‌ها
 */
export const getInsurancesQueryParams = zod.object({
  field: zod
    .union([zod.coerce.string().max(200, "نام فیلد طولانی است"), zod.null()])
    .optional(),
  order: zod
    .union([
      zod.enum(["asc", "desc"], {
        message: "ترتیب مرتب‌سازی باید asc یا desc باشد",
      }),
      zod.null(),
    ])
    .optional(),
  skip: zod.coerce.number().min(0, "مقدار skip نمی‌تواند منفی باشد"),
  limit: zod.coerce
    .number()
    .min(1, "حداقل یک رکورد باید درخواست شود")
    .max(20, "حداکثر تعداد رکورد ۲۰ است"),
  deletedAt: zod
    .union([zod.iso.datetime({ message: "فرمت تاریخ معتبر نیست" }), zod.null()])
    .optional(),
  title: zod
    .union([zod.coerce.string().max(200, "عنوان طولانی است"), zod.null()])
    .optional(),
  providerName: zod
    .union([
      zod.coerce.string().max(200, "نام ارائه‌دهنده طولانی است"),
      zod.null(),
    ])
    .optional(),
  isActive: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
  minPrice: zod
    .union([zod.coerce.number({ message: "عدد معتبر وارد کنید" }), zod.null()])
    .optional(),
  maxPrice: zod
    .union([zod.coerce.number({ message: "عدد معتبر وارد کنید" }), zod.null()])
    .optional(),
});

/**
 * پاسخ دریافت بیمه‌نامه‌ها
 */
export const getInsurancesResponse = zod.object({
  success: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

export const getInsurancesIdParams = zod.object({
  id: zod.uuid("شناسه بیمه‌نامه معتبر نیست"),
});

export const getInsurancesIdResponse = zod.object({
  success: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

export const patchInsurancesIdParams = zod.object({
  id: zod.uuid("شناسه بیمه‌نامه معتبر نیست"),
});

export const patchInsurancesIdBody = zod.object({
  title: zod.coerce
    .string()
    .min(2, "عنوان بیمه‌نامه نمی‌تواند کمتر از ۲ کاراکتر باشد")
    .max(200, "عنوان بیمه‌نامه نمی‌تواند بیش از ۲۰۰ کاراکتر باشد")
    .optional(),
  start: zod
    .union([zod.iso.datetime({ message: "فرمت تاریخ معتبر نیست" }), zod.null()])
    .optional(),
  months: zod
    .union([zod.coerce.number({ message: "عدد معتبر وارد کنید" }), zod.null()])
    .optional(),
  days: zod
    .union([zod.coerce.number({ message: "عدد معتبر وارد کنید" }), zod.null()])
    .optional(),
  logo: zod
    .union([
      zod
        .url({ message: "آدرس لوگو معتبر نیست" })
        .max(1000, "حداکثر طول لوگو ۱۰۰۰ کاراکتر است"),
      zod.null(),
    ])
    .optional(),
  price: zod.coerce
    .number({ message: "عدد معتبر وارد کنید" })
    .min(0, "قیمت نمی‌تواند کمتر از ۰ باشد")
    .optional(),
  providerName: zod
    .union([
      zod.coerce.string().max(200, "نام ارائه‌دهنده طولانی است"),
      zod.null(),
    ])
    .optional(),
  coverage: zod
    .union([
      zod.coerce.string().max(200, "حداکثر طول پوشش ۲۰۰ کاراکتر است"),
      zod.null(),
    ])
    .optional(),
  exclusions: zod
    .union([
      zod.coerce.string().max(200, "حداکثر طول موارد استثناء ۲۰۰ کاراکتر است"),
      zod.null(),
    ])
    .optional(),
  claimLimit: zod
    .union([zod.coerce.number({ message: "عدد معتبر وارد کنید" }), zod.null()])
    .optional(),
  deductible: zod
    .union([zod.coerce.number({ message: "عدد معتبر وارد کنید" }), zod.null()])
    .optional(),
  claimProcess: zod
    .union([
      zod.coerce.string().max(200, "حداکثر طول ۲۰۰ کاراکتر است"),
      zod.null(),
    ])
    .optional(),
  isActive: zod.coerce.boolean().optional(),
  minOrderValue: zod
    .union([zod.coerce.number({ message: "عدد معتبر وارد کنید" }), zod.null()])
    .optional(),
  maxOrderValue: zod
    .union([zod.coerce.number({ message: "عدد معتبر وارد کنید" }), zod.null()])
    .optional(),
  sortOrder: zod.coerce.number().optional(),
});

export const patchInsurancesIdResponse = zod.object({
  success: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

export const deleteInsurancesIdParams = zod.object({
  id: zod.uuid("شناسه بیمه‌نامه معتبر نیست"),
});
