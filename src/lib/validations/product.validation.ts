import { z as zod } from "zod";

export const postProductsBodyNameMin = 2;
export const postProductsBodyNameMax = 200;
export const postProductsBodyEnNameMin = 2;
export const postProductsBodyEnNameMax = 200;
export const postProductsBodyIsActiveDefault = true;

export const postProductsBody = zod.object({
  name: zod.coerce
    .string()
    .min(2, "نام محصول باید حداقل ۲ کاراکتر باشد")
    .max(200, "نام محصول نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد"),
  enName: zod.coerce
    .string()
    .min(2, "نام انگلیسی باید حداقل ۲ کاراکتر باشد")
    .max(200, "نام انگلیسی نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد"),
  categoryId: zod.uuid("شناسه دسته‌بندی معتبر نیست"),
  brandId: zod.uuid("شناسه برند معتبر نیست").optional(),
  isActive: zod.coerce.boolean().default(true),
  labels: zod
    .union([
      zod.array(
        zod.object({
          id: zod.uuid("شناسه لیبل معتبر نیست"),
        })
      ),
      zod.null(),
    ])
    .optional(),
});

export const getProductsQueryParams = zod.object({
  field: zod
    .union([
      zod
        .coerce.string()
        .max(200, "نام فیلد بیش از حد طولانی است"),
      zod.null(),
    ])
    .optional(),
  order: zod
    .union([
      zod.enum(["asc", "desc"], {
        message: "ترتیب مرتب‌سازی فقط باید asc یا desc باشد",
      }),
      zod.null(),
    ])
    .optional(),
  skip: zod.coerce
    .number()
    .min(0, "مقدار skip نمی‌تواند منفی باشد"),
  limit: zod.coerce
    .number()
    .min(1, "حداقل یک رکورد باید درخواست شود")
    .max(20, "حداکثر تعداد قابل دریافت ۲۰ رکورد است"),
  deletedAt: zod
    .union([zod.iso.datetime({ message: "فرمت تاریخ معتبر نیست" }), zod.null()])
    .optional(),
  name: zod
    .union([
      zod.coerce.string().max(200, "طول نام بیش از حد مجاز است"),
      zod.null(),
    ])
    .optional(),
  enName: zod
    .union([
      zod.coerce.string().max(200, "طول نام انگلیسی بیش از حد مجاز است"),
      zod.null(),
    ])
    .optional(),
  categoryId: zod
    .union([zod.uuid("شناسه دسته معتبر نیست"), zod.null()])
    .optional(),
  brandId: zod
    .union([zod.uuid("شناسه برند معتبر نیست"), zod.null()])
    .optional(),
  isActive: zod
    .union([zod.coerce.boolean(), zod.null()])
    .optional(),
  labels: zod
    .array(zod.uuid("شناسه لیبل معتبر نیست"))
    .optional(),
});

export const getProductsResponse = zod.object({
  success: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

export const getProductsIdParams = zod.object({
  id: zod.uuid("شناسه محصول معتبر نیست"),
});

export const getProductsIdResponse = zod.object({
  success: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

export const patchProductsIdParams = zod.object({
  id: zod.uuid("شناسه محصول معتبر نیست"),
});

export const patchProductsIdBody = zod.object({
  name: zod.coerce
    .string()
    .min(2, "نام محصول باید حداقل ۲ کاراکتر باشد")
    .max(200, "نام محصول نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد")
    .optional(),
  enName: zod.coerce
    .string()
    .min(2, "نام انگلیسی باید حداقل ۲ کاراکتر باشد")
    .max(200, "نام انگلیسی نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد")
    .optional(),
  categoryId: zod.uuid("شناسه دسته‌بندی معتبر نیست").optional(),
  brandId: zod.uuid("شناسه برند معتبر نیست").optional(),
  isActive: zod.coerce.boolean().default(true),
  labels: zod
    .union([
      zod.array(
        zod.object({
          id: zod.uuid("شناسه لیبل معتبر نیست"),
        })
      ),
      zod.null(),
    ])
    .optional(),
});

export const patchProductsIdResponse = zod.object({
  success: zod.coerce.boolean(),
  data: zod.object({
    id: zod.uuid(),
    createdAt: zod.iso.datetime({ message: "فرمت تاریخ معتبر نیست" }),
    updatedAt: zod.iso.datetime({ message: "فرمت تاریخ معتبر نیست" }),
    deletedAt: zod.union([
      zod.iso.datetime({ message: "فرمت تاریخ معتبر نیست" }),
      zod.null(),
    ]),
    name: zod
      .coerce.string()
      .min(2, "نام باید حداقل ۲ کاراکتر باشد")
      .max(200, "نام نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد"),
    enName: zod
      .coerce.string()
      .min(2, "نام انگلیسی باید حداقل ۲ کاراکتر باشد")
      .max(200, "نام انگلیسی نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد"),
    categoryId: zod.uuid(),
    brandId: zod.uuid(),
    isActive: zod.coerce.boolean(),
    averageRating: zod.union([zod.coerce.number(), zod.null()]),
    totalReviews: zod.union([zod.coerce.number(), zod.null()]),
    labels: zod.union([
      zod.array(
        zod.object({
          id: zod.uuid(),
          name: zod.coerce.string(),
        })
      ),
      zod.null(),
    ]),
    medias: zod.union([
      zod.array(
        zod.object({
          id: zod.uuid(),
          url: zod.coerce.string(),
          altText: zod.coerce.string().nullable(),
          caption: zod.coerce.string().nullable(),
        })
      ),
      zod.null(),
    ]),
    descriptions: zod.union([
      zod.array(
        zod.object({
          id: zod.uuid(),
          text: zod.coerce.string().nullable(),
          mediaSide: zod
            .union([
              zod.literal("LEFT"),
              zod.literal("CENTER"),
              zod.literal("RIGHT"),
              zod.literal(null),
            ])
            .nullable(),
          mediaId: zod.uuid().nullable(),
        })
      ),
      zod.null(),
    ]),
  }),
});

export const deleteProductsIdParams = zod.object({
  id: zod.uuid("شناسه محصول معتبر نیست"),
});
