import { z as zod } from "zod";

export const postVariantsBodySkuMin = 2;
export const postVariantsBodySkuMax = 100;
export const postVariantsBodyPublicIdMin = 2;
export const postVariantsBodyPublicIdMax = 100;
export const postVariantsBodyBarcodeMaxOne = 50;
export const postVariantsBodyMpnMaxOne = 100;
export const postVariantsBodyTitleOverrideMaxOne = 200;
export const postVariantsBodyDescriptionOverrideMaxOne = 500;
export const postVariantsBodyIsActiveDefault = true;
export const postVariantsBodyIsApprovedDefault = false;
export const postVariantsBodySlugMaxOne = 100;
export const postVariantsBodyMetaTitleMaxOne = 200;
export const postVariantsBodyMetaDescriptionMaxOne = 500;

export const postVariantsBody = zod.object({
  productId: zod.uuid("شناسه محصول معتبر نیست"),
  colorId: zod.uuid("شناسه رنگ معتبر نیست"),
  sku: zod.coerce
    .string()
    .min(postVariantsBodySkuMin, "SKU باید حداقل ۲ کاراکتر باشد")
    .max(postVariantsBodySkuMax, "SKU نمی‌تواند بیش از ۱۰۰ کاراکتر باشد"),
  publicId: zod.coerce
    .string()
    .min(postVariantsBodyPublicIdMin, "Public ID باید حداقل ۲ کاراکتر باشد")
    .max(postVariantsBodyPublicIdMax, "Public ID نمی‌تواند بیش از ۱۰۰ کاراکتر باشد"),
  barcode: zod
    .union([
      zod.coerce.string().max(postVariantsBodyBarcodeMaxOne, "بارکد نمی‌تواند بیش از ۵۰ کاراکتر باشد"),
      zod.null(),
    ])
    .optional(),
  mpn: zod
    .union([
      zod.coerce.string().max(postVariantsBodyMpnMaxOne, "MPN نمی‌تواند بیش از ۱۰۰ کاراکتر باشد"),
      zod.null(),
    ])
    .optional(),
  titleOverride: zod
    .union([
      zod.coerce.string().max(postVariantsBodyTitleOverrideMaxOne, "عنوان نمی‌تواند بیش از ۲۰۰ کاراکتر باشد"),
      zod.null(),
    ])
    .optional(),
  descriptionOverride: zod
    .union([
      zod.coerce.string().max(postVariantsBodyDescriptionOverrideMaxOne, "توضیحات نمی‌تواند بیش از ۵۰۰ کاراکتر باشد"),
      zod.null(),
    ])
    .optional(),
  isActive: zod.coerce.boolean().default(postVariantsBodyIsActiveDefault),
  isApproved: zod.coerce.boolean().optional(),
  slug: zod
    .union([zod.coerce.string().max(postVariantsBodySlugMaxOne, "Slug نمی‌تواند بیش از ۱۰۰ کاراکتر باشد"), zod.null()])
    .optional(),
  metaTitle: zod
    .union([zod.coerce.string().max(postVariantsBodyMetaTitleMaxOne, "Meta title نمی‌تواند بیش از ۲۰۰ کاراکتر باشد"), zod.null()])
    .optional(),
  metaDescription: zod
    .union([zod.coerce.string().max(postVariantsBodyMetaDescriptionMaxOne, "Meta description نمی‌تواند بیش از ۵۰۰ کاراکتر باشد"), zod.null()])
    .optional(),
  attributeComboKey: zod.coerce.string().describe("کلید ترکیب ویژگی‌ها"),
});

export const getVariantsQueryParams = zod.object({
  field: zod
    .union([zod.coerce.string().max(200, "نام فیلد بیش از حد طولانی است"), zod.null()])
    .optional(),
  order: zod
    .union([
      zod.enum(["asc", "desc"], { message: "ترتیب مرتب‌سازی باید asc یا desc باشد" }),
      zod.null(),
    ])
    .optional(),
  skip: zod.coerce.number().min(0, "مقدار skip نمی‌تواند منفی باشد"),
  limit: zod.coerce.number().min(1, "حداقل یک رکورد باید درخواست شود").max(20, "حداکثر تعداد رکورد ۲۰ است"),
  deletedAt: zod.union([zod.iso.datetime({ message: "فرمت تاریخ معتبر نیست" }), zod.null()]).optional(),
  sku: zod.union([zod.coerce.string().max(200, "طول SKU بیش از حد مجاز است"), zod.null()]).optional(),
  barcode: zod.union([zod.coerce.string().max(200, "طول بارکد بیش از حد مجاز است"), zod.null()]).optional(),
  mpn: zod.union([zod.coerce.string().max(200, "طول MPN بیش از حد مجاز است"), zod.null()]).optional(),
  publicId: zod.union([zod.uuid("شناسه عمومی معتبر نیست"), zod.null()]).optional(),
  productId: zod.union([zod.uuid("شناسه محصول معتبر نیست"), zod.null()]).optional(),
  isActive: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
  isApproved: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

export const getVariantsResponse = zod.object({
  success: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

export const getVariantsIdParams = zod.object({
  id: zod.uuid("شناسه واریانت معتبر نیست"),
});

export const getVariantsIdResponse = zod.object({
  success: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

export const patchVariantsIdParams = zod.object({
  id: zod.uuid("شناسه واریانت معتبر نیست"),
});

export const patchVariantsIdBody = zod.object({
  productId: zod.uuid("شناسه محصول معتبر نیست").optional(),
  colorId: zod.uuid("شناسه رنگ معتبر نیست").optional(),
  sku: zod.coerce
    .string()
    .min(2, "SKU باید حداقل ۲ کاراکتر باشد")
    .max(100, "SKU نمی‌تواند بیش از ۱۰۰ کاراکتر باشد")
    .optional(),
  publicId: zod.coerce
    .string()
    .min(2, "Public ID باید حداقل ۲ کاراکتر باشد")
    .max(100, "Public ID نمی‌تواند بیش از ۱۰۰ کاراکتر باشد")
    .optional(),
  barcode: zod.union([zod.coerce.string().max(50, "بارکد نمی‌تواند بیش از ۵۰ کاراکتر باشد"), zod.null()]).optional(),
  mpn: zod.union([zod.coerce.string().max(100, "MPN نمی‌تواند بیش از ۱۰۰ کاراکتر باشد"), zod.null()]).optional(),
  titleOverride: zod.union([zod.coerce.string().max(200, "عنوان نمی‌تواند بیش از ۲۰۰ کاراکتر باشد"), zod.null()]).optional(),
  descriptionOverride: zod.union([zod.coerce.string().max(500, "توضیحات نمی‌تواند بیش از ۵۰۰ کاراکتر باشد"), zod.null()]).optional(),
  isActive: zod.coerce.boolean().default(true),
  isApproved: zod.coerce.boolean().optional(),
  slug: zod.union([zod.coerce.string().max(100, "Slug نمی‌تواند بیش از ۱۰۰ کاراکتر باشد"), zod.null()]).optional(),
  metaTitle: zod.union([zod.coerce.string().max(200, "Meta title نمی‌تواند بیش از ۲۰۰ کاراکتر باشد"), zod.null()]).optional(),
  metaDescription: zod.union([zod.coerce.string().max(500, "Meta description نمی‌تواند بیش از ۵۰۰ کاراکتر باشد"), zod.null()]).optional(),
  attributeComboKey: zod.coerce.string().optional(),
});

export const patchVariantsIdResponse = zod.object({
  success: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

export const deleteVariantsIdParams = zod.object({
  id: zod.uuid("شناسه واریانت معتبر نیست"),
});
