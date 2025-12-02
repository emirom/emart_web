import { z as zod } from "zod";

export const postInventoriesBodyDiscountPercentMin = 0;
export const postInventoriesBodyDiscountPercentMax = 100;
export const postInventoriesBodyInStockMin = 0;
export const postInventoriesBodyLowStockThresholdMin = 0;
export const postInventoriesBodyWarehouseCodeMaxOne = 200;
export const postInventoriesBodyShelfCodeMaxOne = 200;
export const postInventoriesBodyHsCodeMaxOne = 200;
export const postInventoriesBodyOriginCountryMaxOne = 200;
export const postInventoriesBodyPackageDimensionsMaxOne = 200;

export const postInventoriesBody = zod.object({
  storeId: zod.uuid({ message: "شناسه فروشگاه معتبر نیست." }),
  currencyId: zod
    .union([zod.uuid({ message: "شناسه ارز معتبر نیست." }), zod.null()])
    .optional(),
  locationId: zod.uuid({ message: "شناسه موقعیت معتبر نیست." }),
  variantId: zod.uuid({ message: "شناسه تنوع محصول معتبر نیست." }),
  guaranteeId: zod
    .union([zod.uuid({ message: "شناسه گارانتی معتبر نیست." }), zod.null()])
    .optional(),
  insuranceId: zod
    .union([zod.uuid({ message: "شناسه بیمه معتبر نیست." }), zod.null()])
    .optional(),
  leasingId: zod
    .union([zod.uuid({ message: "شناسه لیزینگ معتبر نیست." }), zod.null()])
    .optional(),
  chequeId: zod
    .union([zod.uuid({ message: "شناسه چک معتبر نیست." }), zod.null()])
    .optional(),
  cost: zod
    .union([
      zod.coerce.number({ message: "قیمت تمام‌شده معتبر نیست." }),
      zod.null(),
    ])
    .optional(),
  price: zod.coerce.number({ message: "قیمت محصول معتبر نیست." }),
  discountPercent: zod.coerce
    .number({
      message: "درصد تخفیف معتبر نیست.",
    })
    .min(postInventoriesBodyDiscountPercentMin, {
      message: "درصد تخفیف نمی‌تواند کمتر از ۰ باشد.",
    })
    .max(postInventoriesBodyDiscountPercentMax, {
      message: "درصد تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد.",
    }),
  discountPrice: zod.coerce.number({
    message: "قیمت بعد از تخفیف معتبر نیست.",
  }),
  inStock: zod.coerce
    .number({ message: "موجودی باید عدد باشد." })
    .min(postInventoriesBodyInStockMin, {
      message: "موجودی نمی‌تواند منفی باشد.",
    }),
  lowStockThreshold: zod.coerce
    .number({ message: "حد هشدار موجودی معتبر نیست." })
    .min(postInventoriesBodyLowStockThresholdMin, {
      message: "حد هشدار موجودی نمی‌تواند کمتر از ۰ باشد.",
    }),
  expiryDate: zod
    .union([
      zod.string().datetime({ message: "تاریخ انقضا معتبر نیست." }),
      zod.null(),
    ])
    .optional(),
  warehouseCode: zod
    .union([
      zod.coerce.string().max(postInventoriesBodyWarehouseCodeMaxOne, {
        message: "کد انبار نباید بیشتر از ۲۰۰ کاراکتر باشد.",
      }),
      zod.null(),
    ])
    .optional(),
  shelfCode: zod
    .union([
      zod.coerce.string().max(postInventoriesBodyShelfCodeMaxOne, {
        message: "کد قفسه نباید بیشتر از ۲۰۰ کاراکتر باشد.",
      }),
      zod.null(),
    ])
    .optional(),
  hsCode: zod
    .union([
      zod.coerce.string().max(postInventoriesBodyHsCodeMaxOne, {
        message: "کد گمرکی معتبر نیست یا طول آن زیاد است.",
      }),
      zod.null(),
    ])
    .optional(),
  originCountry: zod
    .union([
      zod.coerce.string().max(postInventoriesBodyOriginCountryMaxOne, {
        message: "نام کشور نباید بیشتر از ۲۰۰ کاراکتر باشد.",
      }),
      zod.null(),
    ])
    .optional(),
  packageWeight: zod
    .union([
      zod.coerce.number({
        message: "وزن بسته‌بندی معتبر نیست.",
      }),
      zod.null(),
    ])
    .optional(),
  packageDimensions: zod
    .union([
      zod.coerce.string().max(postInventoriesBodyPackageDimensionsMaxOne, {
        message: "ابعاد بسته‌بندی نباید بیشتر از ۲۰۰ کاراکتر باشد.",
      }),
      zod.null(),
    ])
    .optional(),
});

export const getInventoriesQueryFieldMaxOne = 200;
export const getInventoriesQuerySkipMin = 0;
export const getInventoriesQueryLimitMax = 20;
export const getInventoriesQueryWarehouseCodeMaxOne = 200;

export const getInventoriesQueryParams = zod.object({
  field: zod
    .union([
      zod.coerce.string().max(getInventoriesQueryFieldMaxOne, {
        message: "نام فیلد معتبر نیست.",
      }),
      zod.null(),
    ])
    .optional(),
  order: zod
    .union([
      zod.enum(["asc", "desc"], { message: "مرتب‌سازی معتبر نیست." }),
      zod.null(),
    ])
    .optional(),
  skip: zod.coerce.number().min(getInventoriesQuerySkipMin, {
    message: "مقدار skip نمی‌تواند منفی باشد.",
  }),
  limit: zod.coerce
    .number()
    .min(1, { message: "حداقل تعداد آیتم‌ها ۱ است." })
    .max(getInventoriesQueryLimitMax, {
      message: `حداکثر تعداد آیتم‌ها ${getInventoriesQueryLimitMax} است.`,
    }),
  storeId: zod
    .union([zod.uuid({ message: "شناسه فروشگاه معتبر نیست." }), zod.null()])
    .optional(),
  locationId: zod
    .union([zod.uuid({ message: "شناسه موقعیت معتبر نیست." }), zod.null()])
    .optional(),
  variantId: zod
    .union([zod.uuid({ message: "شناسه تنوع معتبر نیست." }), zod.null()])
    .optional(),
  warehouseCode: zod
    .union([
      zod.coerce.string().max(getInventoriesQueryWarehouseCodeMaxOne, {
        message: "کد انبار معتبر نیست.",
      }),
      zod.null(),
    ])
    .optional(),
  minPrice: zod
    .union([
      zod.coerce.number({ message: "حداقل قیمت معتبر نیست." }),
      zod.null(),
    ])
    .optional(),
  maxPrice: zod
    .union([
      zod.coerce.number({ message: "حداکثر قیمت معتبر نیست." }),
      zod.null(),
    ])
    .optional(),
  minCost: zod
    .union([
      zod.coerce.number({ message: "حداقل قیمت تمام‌شده معتبر نیست." }),
      zod.null(),
    ])
    .optional(),
  maxCost: zod
    .union([
      zod.coerce.number({ message: "حداکثر قیمت تمام‌شده معتبر نیست." }),
      zod.null(),
    ])
    .optional(),
  minInStock: zod
    .union([
      zod.coerce.number({ message: "حداقل موجودی معتبر نیست." }),
      zod.null(),
    ])
    .optional(),
  maxInStock: zod
    .union([
      zod.coerce.number({ message: "حداکثر موجودی معتبر نیست." }),
      zod.null(),
    ])
    .optional(),
  isLowStock: zod
    .union([
      zod.coerce.boolean({ message: "مقدار وضعیت موجودی معتبر نیست." }),
      zod.null(),
    ])
    .optional(),
});

export const getInventoriesResponse = zod.object({
  success: zod
    .union([
      zod.coerce.boolean({ message: "وضعیت عملیات معتبر نیست." }),
      zod.null(),
    ])
    .optional(),
});

export const getInventoriesIdParams = zod.object({
  id: zod.uuid({ message: "شناسه موجودی معتبر نیست." }),
});

export const getInventoriesIdResponse = zod.object({
  success: zod
    .union([
      zod.coerce.boolean({ message: "وضعیت عملیات معتبر نیست." }),
      zod.null(),
    ])
    .optional(),
});

export const patchInventoriesIdParams = zod.object({
  id: zod.uuid({ message: "شناسه موجودی معتبر نیست." }),
});

export const patchInventoriesIdBody = zod.object({
  storeId: zod.uuid({ message: "شناسه فروشگاه معتبر نیست." }).optional(),
  currencyId: zod
    .union([zod.uuid({ message: "شناسه ارز معتبر نیست." }), zod.null()])
    .optional(),
  locationId: zod.uuid({ message: "شناسه موقعیت معتبر نیست." }).optional(),
  variantId: zod.uuid({ message: "شناسه تنوع معتبر نیست." }).optional(),
  guaranteeId: zod
    .union([zod.uuid({ message: "شناسه گارانتی معتبر نیست." }), zod.null()])
    .optional(),
  insuranceId: zod
    .union([zod.uuid({ message: "شناسه بیمه معتبر نیست." }), zod.null()])
    .optional(),
  leasingId: zod
    .union([zod.uuid({ message: "شناسه لیزینگ معتبر نیست." }), zod.null()])
    .optional(),
  chequeId: zod
    .union([zod.uuid({ message: "شناسه چک معتبر نیست." }), zod.null()])
    .optional(),
  cost: zod
    .union([
      zod.coerce.number({ message: "قیمت تمام‌شده معتبر نیست." }),
      zod.null(),
    ])
    .optional(),
  price: zod.coerce.number({ message: "قیمت محصول معتبر نیست." }).optional(),
  discountPercent: zod.coerce
    .number({ message: "درصد تخفیف معتبر نیست." })
    .min(0, { message: "درصد تخفیف نمی‌تواند کمتر از ۰ باشد." })
    .max(100, { message: "درصد تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد." })
    .optional(),
  discountPrice: zod.coerce
    .number({
      message: "قیمت بعد از تخفیف معتبر نیست.",
    })
    .optional(),
  inStock: zod.coerce
    .number({ message: "موجودی باید عدد باشد." })
    .min(0, { message: "موجودی نمی‌تواند منفی باشد." })
    .optional(),
  lowStockThreshold: zod.coerce
    .number({ message: "حد هشدار موجودی معتبر نیست." })
    .min(0, { message: "حد هشدار موجودی نمی‌تواند کمتر از ۰ باشد." })
    .optional(),
  expiryDate: zod
    .union([
      zod.string().datetime({ message: "تاریخ انقضا معتبر نیست." }),
      zod.null(),
    ])
    .optional(),
  warehouseCode: zod
    .union([
      zod.coerce
        .string()
        .max(200, { message: "کد انبار نباید بیشتر از ۲۰۰ کاراکتر باشد." }),
      zod.null(),
    ])
    .optional(),
  shelfCode: zod
    .union([
      zod.coerce
        .string()
        .max(200, { message: "کد قفسه نباید بیشتر از ۲۰۰ کاراکتر باشد." }),
      zod.null(),
    ])
    .optional(),
  hsCode: zod
    .union([
      zod.coerce
        .string()
        .max(200, { message: "کد گمرکی معتبر نیست یا طول آن زیاد است." }),
      zod.null(),
    ])
    .optional(),
  originCountry: zod
    .union([
      zod.coerce
        .string()
        .max(200, { message: "نام کشور نباید بیشتر از ۲۰۰ کاراکتر باشد." }),
      zod.null(),
    ])
    .optional(),
  packageWeight: zod
    .union([
      zod.coerce.number({ message: "وزن بسته‌بندی معتبر نیست." }),
      zod.null(),
    ])
    .optional(),
  packageDimensions: zod
    .union([
      zod.coerce.string().max(200, {
        message: "ابعاد بسته‌بندی نباید بیشتر از ۲۰۰ کاراکتر باشد.",
      }),
      zod.null(),
    ])
    .optional(),
});

export const patchInventoriesIdResponse = zod.object({
  success: zod
    .union([
      zod.coerce.boolean({ message: "وضعیت عملیات معتبر نیست." }),
      zod.null(),
    ])
    .optional(),
});

export const deleteInventoriesIdParams = zod.object({
  id: zod.uuid({ message: "شناسه موجودی معتبر نیست." }),
});
