import { z as zod } from "zod";

export const postAttributesBodyTitleMin = 2;
export const postAttributesBodyTitleMax = 50;
export const postAttributesBodyUnitMaxOne = 200;
export const postAttributesBodyIconUrlMaxOne = 200;

export const postAttributesBody = zod.object({
  title: zod.coerce
    .string()
    .min(
      postAttributesBodyTitleMin,
      `عنوان ویژگی باید حداقل ${postAttributesBodyTitleMin} کاراکتر باشد`,
    )
    .max(
      postAttributesBodyTitleMax,
      `عنوان ویژگی نمی‌تواند بیش از ${postAttributesBodyTitleMax} کاراکتر باشد`,
    ),
  type: zod
    .enum(["text", "number", "boolean", "date"])
    .refine((val) => ["text", "number", "boolean", "date"].includes(val), {
      message:
        "نوع ویژگی باید یکی از مقادیر text, number, boolean یا date باشد",
    }),
  unit: zod
    .union([
      zod.coerce
        .string()
        .max(
          postAttributesBodyUnitMaxOne,
          `واحد ویژگی نمی‌تواند بیش از ${postAttributesBodyUnitMaxOne} کاراکتر باشد`,
        ),
      zod.null(),
    ])
    .optional(),
  iconUrl: zod
    .union([
      zod.coerce
        .string()
        .max(postAttributesBodyIconUrlMaxOne, `URL آیکون طولانی است`),
      zod.null(),
    ])
    .optional(),
  categoryId: zod.uuid("شناسه دسته‌بندی معتبر نیست"),
});

export const getAttributesQueryFieldMaxOne = 200;
export const getAttributesQuerySkipMin = 0;
export const getAttributesQueryLimitMax = 20;
export const getAttributesQueryTitleMaxOne = 200;

export const getAttributesQueryParams = zod.object({
  field: zod
    .union([zod.coerce.string().max(getAttributesQueryFieldMaxOne), zod.null()])
    .optional(),
  order: zod.union([zod.enum(["asc", "desc"]), zod.null()]).optional(),
  skip: zod.coerce.number().min(getAttributesQuerySkipMin),
  limit: zod.coerce.number().min(1).max(getAttributesQueryLimitMax),
  title: zod
    .union([zod.coerce.string().max(getAttributesQueryTitleMaxOne), zod.null()])
    .optional(),
  type: zod
    .union([zod.enum(["text", "number", "boolean", "date"]), zod.null()])
    .optional(),
  categoryId: zod.union([zod.uuid(), zod.null()]).optional(),
});

export const getAttributesResponse = zod.object({
  success: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

export const getAttributesIdParams = zod.object({
  id: zod.uuid("شناسه ویژگی معتبر نیست"),
});

export const getAttributesIdResponse = zod.object({
  success: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

export const patchAttributesIdParams = zod.object({
  id: zod.uuid("شناسه ویژگی معتبر نیست"),
});

export const patchAttributesIdBodyTitleMin = 2;
export const patchAttributesIdBodyTitleMax = 50;
export const patchAttributesIdBodyUnitMaxOne = 200;
export const patchAttributesIdBodyIconUrlMaxOne = 200;

export const patchAttributesIdBody = zod.object({
  title: zod.coerce
    .string()
    .min(
      patchAttributesIdBodyTitleMin,
      `عنوان ویژگی باید حداقل ${patchAttributesIdBodyTitleMin} کاراکتر باشد`,
    )
    .max(
      patchAttributesIdBodyTitleMax,
      `عنوان ویژگی نمی‌تواند بیش از ${patchAttributesIdBodyTitleMax} کاراکتر باشد`,
    )
    .optional(),
  type: zod.enum(["text", "number", "boolean", "date"]).optional(),
  unit: zod
    .union([
      zod.coerce
        .string()
        .max(
          patchAttributesIdBodyUnitMaxOne,
          `واحد ویژگی نمی‌تواند بیش از ${patchAttributesIdBodyUnitMaxOne} کاراکتر باشد`,
        ),
      zod.null(),
    ])
    .optional(),
  iconUrl: zod
    .union([
      zod.coerce
        .string()
        .max(patchAttributesIdBodyIconUrlMaxOne, `URL آیکون طولانی است`),
      zod.null(),
    ])
    .optional(),
  categoryId: zod.uuid("شناسه دسته‌بندی معتبر نیست").optional(),
});

export const patchAttributesIdResponse = zod.object({
  success: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

export const deleteAttributesIdParams = zod.object({
  id: zod.uuid("شناسه ویژگی معتبر نیست"),
});
