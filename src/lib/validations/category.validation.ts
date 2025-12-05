import { z as zod } from "zod";

/**
 * Create a new category
 */

export const postCategoriesBodyNameMin = 2;
export const postCategoriesBodyNameMax = 50;
export const postCategoriesBodyEnNameMin = 2;
export const postCategoriesBodyEnNameMax = 50;
export const postCategoriesBodyIconUrlMaxOne = 200;
export const postCategoriesBodyDescMaxOne = 1000;

export const postCategoriesBody = zod
  .object({
    name: zod.coerce
      .string()
      .min(postCategoriesBodyNameMin, "حداقل طول نام باید ۲ کاراکتر باشد")
      .max(postCategoriesBodyNameMax, "حداکثر طول نام باید ۵۰ کاراکتر باشد")
      .describe("Category name in native language"),

    enName: zod.coerce
      .string()
      .min(
        postCategoriesBodyEnNameMin,
        "حداقل طول نام انگلیسی باید ۲ کاراکتر باشد",
      )
      .max(
        postCategoriesBodyEnNameMax,
        "حداکثر طول نام انگلیسی باید ۵۰ کاراکتر باشد",
      )
      .describe("English name for internationalization"),

    parentId: zod
      .union([zod.uuid("شناسه والد معتبر نیست"), zod.null()])
      .optional()
      .describe("Parent category ID if exists"),

    level: zod.coerce.number().describe("the level of category in hierarchy"),

    unitId: zod.uuid("شناسه واحد معتبر نیست").describe("Unit ID"),

    promotionId: zod
      .union([zod.uuid("شناسه پروموشن معتبر نیست"), zod.null()])
      .optional()
      .describe("Filter by promotion ID"),

    iconUrl: zod
      .union([
        zod.coerce
          .string()
          .max(
            postCategoriesBodyIconUrlMaxOne,
            "حداکثر طول آدرس آیکون باید ۲۰۰ کاراکتر باشد",
          ),
        zod.null(),
      ])
      .optional()
      .describe("Icon URL"),

    desc: zod
      .union([
        zod.coerce
          .string()
          .max(
            postCategoriesBodyDescMaxOne,
            "حداکثر طول توضیحات باید ۱۰۰۰ کاراکتر باشد",
          ),
        zod.null(),
      ])
      .optional()
      .describe("Category description in native language"),

    isActive: zod.union([zod.coerce.boolean(), zod.null()]).optional(),

    showInMenu: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
  })
  .describe("Category creation payload");

/**
 * Get all categories with pagination and filters
 */

export const getCategoriesQueryFieldMaxOne = 200;
export const getCategoriesQuerySkipMin = 0;
export const getCategoriesQueryLimitMax = 20;
export const getCategoriesQueryNameMaxOne = 200;
export const getCategoriesQueryEnNameMaxOne = 200;
export const getCategoriesQueryIconUrlMaxOne = 200;
export const getCategoriesQueryDescMaxOne = 200;

export const getCategoriesQueryParams = zod.object({
  field: zod
    .union([
      zod.coerce
        .string()
        .max(
          getCategoriesQueryFieldMaxOne,
          "حداکثر طول فیلد مرتب‌سازی ۲۰۰ کاراکتر است",
        ),
      zod.null(),
    ])
    .optional(),

  order: zod
    .union([
      zod.enum(["asc", "desc"], {
        message: "مقدار مرتب‌سازی باید asc یا desc باشد",
      }),
      zod.null(),
    ])
    .optional(),

  skip: zod.coerce
    .number()
    .min(getCategoriesQuerySkipMin, "حداقل مقدار skip باید ۰ باشد"),

  limit: zod.coerce
    .number()
    .min(1, "حداقل مقدار limit باید ۱ باشد")
    .max(getCategoriesQueryLimitMax, "حداکثر مقدار limit باید ۲۰ باشد"),

  deletedAt: zod
    .union([
      zod.iso.datetime({}).refine(() => true, "تاریخ وارد شده معتبر نیست"),
      zod.null(),
    ])
    .optional(),

  name: zod
    .union([
      zod.coerce
        .string()
        .max(getCategoriesQueryNameMaxOne, "حداکثر طول نام ۲۰۰ کاراکتر است"),
      zod.null(),
    ])
    .optional(),

  enName: zod
    .union([
      zod.coerce
        .string()
        .max(
          getCategoriesQueryEnNameMaxOne,
          "حداکثر طول نام انگلیسی ۲۰۰ کاراکتر است",
        ),
      zod.null(),
    ])
    .optional(),

  parentId: zod
    .union([zod.uuid("شناسه والد معتبر نیست"), zod.null()])
    .optional(),

  unitId: zod.union([zod.uuid("شناسه واحد معتبر نیست"), zod.null()]).optional(),

  promotionId: zod
    .union([zod.uuid("شناسه پروموشن معتبر نیست"), zod.null()])
    .optional(),

  iconUrl: zod
    .union([
      zod.coerce
        .string()
        .max(
          getCategoriesQueryIconUrlMaxOne,
          "حداکثر طول آدرس آیکون ۲۰۰ کاراکتر است",
        ),
      zod.null(),
    ])
    .optional(),

  isActive: zod.union([zod.coerce.boolean(), zod.null()]).optional(),

  desc: zod
    .union([
      zod.coerce
        .string()
        .max(
          getCategoriesQueryDescMaxOne,
          "حداکثر طول توضیحات ۲۰۰ کاراکتر است",
        ),
      zod.null(),
    ])
    .optional(),

  showInMenu: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

export const getCategoriesResponse = zod.object({
  success: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

/**
 * Get a single category by ID
 */

export const getCategoriesIdParams = zod.object({
  id: zod.uuid("شناسه دسته‌بندی معتبر نیست"),
});

export const getCategoriesIdResponse = zod.object({
  success: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

/**
 * Update a category
 */

export const patchCategoriesIdBodyNameMin = 2;
export const patchCategoriesIdBodyNameMax = 50;
export const patchCategoriesIdBodyEnNameMin = 2;
export const patchCategoriesIdBodyEnNameMax = 50;
export const patchCategoriesIdBodyIconUrlMaxOne = 200;
export const patchCategoriesIdBodyDescMaxOne = 1000;

export const patchCategoriesIdBody = zod.object({
  name: zod.coerce
    .string()
    .min(patchCategoriesIdBodyNameMin, "حداقل طول نام باید ۲ کاراکتر باشد")
    .max(patchCategoriesIdBodyNameMax, "حداکثر طول نام باید ۵۰ کاراکتر باشد")
    .optional(),

  enName: zod.coerce
    .string()
    .min(
      patchCategoriesIdBodyEnNameMin,
      "حداقل طول نام انگلیسی باید ۲ کاراکتر باشد",
    )
    .max(
      patchCategoriesIdBodyEnNameMax,
      "حداکثر طول نام انگلیسی باید ۵۰ کاراکتر باشد",
    )
    .optional(),

  parentId: zod
    .union([zod.uuid("شناسه والد معتبر نیست"), zod.null()])
    .optional(),

  level: zod.coerce.number().optional(),

  unitId: zod.uuid("شناسه واحد معتبر نیست").optional(),

  promotionId: zod
    .union([zod.uuid("شناسه پروموشن معتبر نیست"), zod.null()])
    .optional(),

  iconUrl: zod
    .union([
      zod.coerce
        .string()
        .max(
          patchCategoriesIdBodyIconUrlMaxOne,
          "حداکثر طول آدرس آیکون ۲۰۰ کاراکتر است",
        ),
      zod.null(),
    ])
    .optional(),

  desc: zod
    .union([
      zod.coerce
        .string()
        .max(
          patchCategoriesIdBodyDescMaxOne,
          "حداکثر طول توضیحات ۱۰۰۰ کاراکتر است",
        ),
      zod.null(),
    ])
    .optional(),

  isActive: zod.union([zod.coerce.boolean(), zod.null()]).optional(),

  showInMenu: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

export const patchCategoriesIdResponse = zod.object({
  success: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

/**
 * Delete a category
 */

export const deleteCategoriesIdParams = zod.object({
  id: zod.uuid("شناسه دسته‌بندی معتبر نیست"),
});
