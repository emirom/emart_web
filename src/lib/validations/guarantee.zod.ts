import { z as zod } from "zod";

/**
 * ایجاد یک گارانتی جدید
 */
export const postGuaranteesBodyTitleMin = 2;
export const postGuaranteesBodyTitleMax = 200;
export const postGuaranteesBodyLogoMaxOne = 1000;
export const postGuaranteesBodyProviderNameMaxOne = 200;
export const postGuaranteesBodyProviderAddressMaxOne = 200;
export const postGuaranteesBodyProviderPhoneMaxOne = 200;
export const postGuaranteesBodyProviderCodeMaxOne = 200;
export const postGuaranteesBodyTermsUrlMaxOne = 1000;
export const postGuaranteesBodyIsInternationalDefault = false;
export const postGuaranteesBodyClaimProcessMaxOne = 200;
export const postGuaranteesBodyIsActiveDefault = true;
export const postGuaranteesBodySortOrderDefault = 0;
export const postGuaranteesBodySepidarGuaranteeIdMaxOne = 200;
export const postGuaranteesBodyIsRegisteredWithTaxDefault = false;

export const postGuaranteesBody = zod
  .object({
    title: zod.coerce
      .string()
      .min(
        postGuaranteesBodyTitleMin,
        `عنوان گارانتی نمی‌تواند کمتر از ${postGuaranteesBodyTitleMin} کاراکتر باشد`,
      )
      .max(
        postGuaranteesBodyTitleMax,
        `عنوان گارانتی نمی‌تواند بیشتر از ${postGuaranteesBodyTitleMax} کاراکتر باشد`,
      )
      .describe("عنوان گارانتی الزامی است"),
    start: zod
      .union([
        zod.iso.datetime({ message: "فرمت تاریخ معتبر نیست" }),
        zod.null(),
      ])
      .optional()
      .describe("تاریخ شروع اعتبار گارانتی (اختیاری)"),
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
            postGuaranteesBodyLogoMaxOne,
            `حداکثر طول لوگو ${postGuaranteesBodyLogoMaxOne} کاراکتر است`,
          ),
        zod.null(),
      ])
      .optional()
      .describe("آدرس لوگو ارائه‌دهنده (اختیاری)"),
    providerName: zod
      .union([
        zod.coerce
          .string()
          .max(
            postGuaranteesBodyProviderNameMaxOne,
            `نام ارائه‌دهنده نمی‌تواند بیش از ${postGuaranteesBodyProviderNameMaxOne} کاراکتر باشد`,
          ),
        zod.null(),
      ])
      .optional()
      .describe("نام ارائه‌دهنده (اختیاری)"),
    providerAddress: zod
      .union([
        zod.coerce
          .string()
          .max(
            postGuaranteesBodyProviderAddressMaxOne,
            `آدرس ارائه‌دهنده نمی‌تواند بیش از ${postGuaranteesBodyProviderAddressMaxOne} کاراکتر باشد`,
          ),
        zod.null(),
      ])
      .optional()
      .describe("آدرس فیزیکی ارائه‌دهنده (اختیاری)"),
    providerPhone: zod
      .union([
        zod.coerce
          .string()
          .max(
            postGuaranteesBodyProviderPhoneMaxOne,
            `شماره تماس ارائه‌دهنده نمی‌تواند بیش از ${postGuaranteesBodyProviderPhoneMaxOne} کاراکتر باشد`,
          ),
        zod.null(),
      ])
      .optional()
      .describe("شماره تماس ارائه‌دهنده (اختیاری)"),
    providerCode: zod
      .union([
        zod.coerce
          .string()
          .max(
            postGuaranteesBodyProviderCodeMaxOne,
            `کد ارائه‌دهنده نمی‌تواند بیش از ${postGuaranteesBodyProviderCodeMaxOne} کاراکتر باشد`,
          ),
        zod.null(),
      ])
      .optional()
      .describe("کد داخلی ارائه‌دهنده (اختیاری)"),
    termsUrl: zod
      .union([
        zod
          .url({ message: "آدرس معتبر نیست" })
          .max(
            postGuaranteesBodyTermsUrlMaxOne,
            `حداکثر طول آدرس ${postGuaranteesBodyTermsUrlMaxOne} کاراکتر است`,
          ),
        zod.null(),
      ])
      .optional()
      .describe("آدرس صفحه شرایط و ضوابط (اختیاری)"),
    isInternational: zod.coerce
      .boolean()
      .optional()
      .describe("آیا گارانتی بین‌المللی است؟ (اختیاری)"),
    claimProcess: zod
      .union([
        zod.coerce
          .string()
          .max(
            postGuaranteesBodyClaimProcessMaxOne,
            `حداکثر طول ${postGuaranteesBodyClaimProcessMaxOne} کاراکتر است`,
          ),
        zod.null(),
      ])
      .optional()
      .describe("نحوه استفاده از گارانتی (اختیاری)"),
    responseTime: zod
      .union([
        zod.coerce.number({ message: "عدد معتبر وارد کنید" }),
        zod.null(),
      ])
      .optional()
      .describe("حداکثر روز پاسخگویی (اختیاری)"),
    isActive: zod.coerce
      .boolean()
      .default(postGuaranteesBodyIsActiveDefault)
      .describe("وضعیت فعال بودن گارانتی"),
    sortOrder: zod.coerce
      .number()
      .optional()
      .describe("اولویت نمایش (اختیاری)"),
    sepidarGuaranteeId: zod
      .union([
        zod.coerce
          .string()
          .max(
            postGuaranteesBodySepidarGuaranteeIdMaxOne,
            `حداکثر طول ${postGuaranteesBodySepidarGuaranteeIdMaxOne} کاراکتر است`,
          ),
        zod.null(),
      ])
      .optional()
      .describe("شناسه سیستم سپیدار (اختیاری)"),
    isRegisteredWithTax: zod.coerce
      .boolean()
      .optional()
      .describe("ثبت در سازمان مالیاتی (اختیاری)"),
  })
  .describe("موجودیت گارانتی/ضمانت محصول");

/**
 * پارامترهای query برای دریافت گارانتی‌ها
 */
export const getGuaranteesQueryParams = zod.object({
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
  providerCode: zod
    .union([
      zod.coerce.string().max(200, "کد ارائه‌دهنده طولانی است"),
      zod.null(),
    ])
    .optional(),
  isActive: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
  isInternational: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

/**
 * پاسخ دریافت گارانتی‌ها
 */
export const getGuaranteesResponse = zod.object({
  success: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

export const getGuaranteesIdParams = zod.object({
  id: zod.uuid("شناسه گارانتی معتبر نیست"),
});

export const getGuaranteesIdResponse = zod.object({
  success: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

export const patchGuaranteesIdParams = zod.object({
  id: zod.uuid("شناسه گارانتی معتبر نیست"),
});

export const patchGuaranteesIdBody = zod.object({
  title: zod.coerce
    .string()
    .min(2, "عنوان گارانتی نمی‌تواند کمتر از ۲ کاراکتر باشد")
    .max(200, "عنوان گارانتی نمی‌تواند بیش از ۲۰۰ کاراکتر باشد")
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
  providerName: zod
    .union([
      zod.coerce.string().max(200, "نام ارائه‌دهنده طولانی است"),
      zod.null(),
    ])
    .optional(),
  providerAddress: zod
    .union([zod.coerce.string().max(200, "آدرس طولانی است"), zod.null()])
    .optional(),
  providerPhone: zod
    .union([zod.coerce.string().max(200, "شماره تماس طولانی است"), zod.null()])
    .optional(),
  providerCode: zod
    .union([
      zod.coerce.string().max(200, "کد ارائه‌دهنده طولانی است"),
      zod.null(),
    ])
    .optional(),
  termsUrl: zod
    .union([
      zod
        .url({ message: "آدرس معتبر نیست" })
        .max(1000, "حداکثر طول آدرس ۱۰۰۰ کاراکتر است"),
      zod.null(),
    ])
    .optional(),
  isInternational: zod.coerce.boolean().optional(),
  claimProcess: zod
    .union([
      zod.coerce.string().max(200, "حداکثر طول ۲۰۰ کاراکتر است"),
      zod.null(),
    ])
    .optional(),
  responseTime: zod
    .union([zod.coerce.number({ message: "عدد معتبر وارد کنید" }), zod.null()])
    .optional(),
  isActive: zod.coerce.boolean().optional(),
  sortOrder: zod.coerce.number().optional(),
  sepidarGuaranteeId: zod
    .union([
      zod.coerce.string().max(200, "حداکثر طول ۲۰۰ کاراکتر است"),
      zod.null(),
    ])
    .optional(),
  isRegisteredWithTax: zod.coerce.boolean().optional(),
});

export const patchGuaranteesIdResponse = zod.object({
  success: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

export const deleteGuaranteesIdParams = zod.object({
  id: zod.uuid("شناسه گارانتی معتبر نیست"),
});
