import { z as zod } from "zod";

export const postColorsBodyNameMax = 50;
export const postColorsBodyEnNameMaxOne = 200;
export const postColorsBodyDisplayNameMaxOne = 200;
export const postColorsBodyHexRegExp = /^#([0-9A-Fa-f]{3}){1,2}$/;

export const postColorsBody = zod.object({
  name: zod.coerce
    .string()
    .min(1, "نام رنگ نمی‌تواند خالی باشد")
    .max(postColorsBodyNameMax, `نام رنگ نمی‌تواند بیش از ${postColorsBodyNameMax} کاراکتر باشد`),
  enName: zod
    .union([
      zod.coerce.string().max(postColorsBodyEnNameMaxOne, `نام انگلیسی نمی‌تواند بیش از ${postColorsBodyEnNameMaxOne} کاراکتر باشد`),
      zod.null(),
    ])
    .optional(),
  displayName: zod
    .union([
      zod.coerce.string().max(postColorsBodyDisplayNameMaxOne, `نام نمایشی نمی‌تواند بیش از ${postColorsBodyDisplayNameMaxOne} کاراکتر باشد`),
      zod.null(),
    ])
    .optional(),
  hex: zod.coerce
    .string()
    .regex(postColorsBodyHexRegExp, "کد رنگ باید فرمت هگزادسیمال معتبر داشته باشد، مثال: #FFFFFF"),
  isActive: zod.coerce.boolean().describe("وضعیت فعال بودن رنگ"),
});

export const getColorsQueryParams = zod.object({
  field: zod
    .union([zod.coerce.string().max(200, "نام فیلد طولانی است"), zod.null()])
    .optional(),
  order: zod
    .union([zod.enum(["asc", "desc"], { message: "ترتیب مرتب‌سازی باید asc یا desc باشد" }), zod.null()])
    .optional(),
  skip: zod.coerce.number().min(0, "مقدار skip نمی‌تواند منفی باشد"),
  limit: zod.coerce.number().min(1, "حداقل یک رکورد باید درخواست شود").max(20, "حداکثر تعداد رکورد ۲۰ است"),
  deletedAt: zod.union([zod.iso.datetime({ message: "فرمت تاریخ معتبر نیست" }), zod.null()]).optional(),
  name: zod.union([zod.coerce.string().max(200, "نام رنگ طولانی است"), zod.null()]).optional(),
  enName: zod.union([zod.coerce.string().max(200, "نام انگلیسی طولانی است"), zod.null()]).optional(),
  displayName: zod.union([zod.coerce.string().max(200, "نام نمایشی طولانی است"), zod.null()]).optional(),
  hex: zod
    .union([
      zod.coerce
        .string()
        .max(7, "کد رنگ طولانی است")
        .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, "کد رنگ باید فرمت هگزادسیمال معتبر داشته باشد، مثال: #FFFFFF"),
      zod.null(),
    ])
    .optional(),
  isActive: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

export const getColorsResponse = zod.object({
  success: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

export const getColorsIdParams = zod.object({
  id: zod.uuid("شناسه رنگ معتبر نیست"),
});

export const getColorsIdResponse = zod.object({
  success: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

export const patchColorsIdParams = zod.object({
  id: zod.uuid("شناسه رنگ معتبر نیست"),
});

export const patchColorsIdBody = zod.object({
  name: zod.coerce.string().min(1, "نام رنگ نمی‌تواند خالی باشد").max(50, "نام رنگ نمی‌تواند بیش از ۵۰ کاراکتر باشد").optional(),
  enName: zod.union([zod.coerce.string().max(200, "نام انگلیسی طولانی است"), zod.null()]).optional(),
  displayName: zod.union([zod.coerce.string().max(200, "نام نمایشی طولانی است"), zod.null()]).optional(),
  hex: zod.coerce.string().regex(/^#([0-9A-Fa-f]{3}){1,2}$/, "کد رنگ باید فرمت هگزادسیمال معتبر داشته باشد، مثال: #FFFFFF").optional(),
  isActive: zod.coerce.boolean().optional(),
});

export const patchColorsIdResponse = zod.object({
  success: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

export const deleteColorsIdParams = zod.object({
  id: zod.uuid("شناسه رنگ معتبر نیست"),
});
