import { z as zod } from "zod";

export const postLabelsBodyNameMin = 2;
export const postLabelsBodyNameMax = 50;

export const postLabelsBody = zod.object({
  name: zod.coerce
    .string()
    .min(
      postLabelsBodyNameMin,
      `نام برچسب باید حداقل ${postLabelsBodyNameMin} کاراکتر باشد`,
    )
    .max(
      postLabelsBodyNameMax,
      `نام برچسب نمی‌تواند بیش از ${postLabelsBodyNameMax} کاراکتر باشد`,
    ),
  pageId: zod.union([zod.uuid("شناسه صفحه معتبر نیست"), zod.null()]).optional(),
});

export const getLabelsQueryFieldMaxOne = 200;
export const getLabelsQuerySkipMin = 0;
export const getLabelsQueryLimitMax = 20;
export const getLabelsQueryNameMaxOne = 200;

export const getLabelsQueryParams = zod.object({
  field: zod
    .union([zod.coerce.string().max(getLabelsQueryFieldMaxOne), zod.null()])
    .optional(),
  order: zod.union([zod.enum(["asc", "desc"]), zod.null()]).optional(),
  skip: zod.coerce.number().min(getLabelsQuerySkipMin),
  limit: zod.coerce.number().min(1).max(getLabelsQueryLimitMax),
  name: zod
    .union([zod.coerce.string().max(getLabelsQueryNameMaxOne), zod.null()])
    .optional(),
});

export const getLabelsResponse = zod.object({
  success: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

export const getLabelsIdParams = zod.object({
  id: zod.uuid("شناسه برچسب معتبر نیست"),
});

export const getLabelsIdResponse = zod.object({
  success: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

export const patchLabelsIdParams = zod.object({
  id: zod.uuid("شناسه برچسب معتبر نیست"),
});

export const patchLabelsIdBodyNameMin = 2;
export const patchLabelsIdBodyNameMax = 50;

export const patchLabelsIdBody = zod.object({
  name: zod.coerce
    .string()
    .min(
      patchLabelsIdBodyNameMin,
      `نام برچسب باید حداقل ${patchLabelsIdBodyNameMin} کاراکتر باشد`,
    )
    .max(
      patchLabelsIdBodyNameMax,
      `نام برچسب نمی‌تواند بیش از ${patchLabelsIdBodyNameMax} کاراکتر باشد`,
    )
    .optional(),
  pageId: zod.union([zod.uuid("شناسه صفحه معتبر نیست"), zod.null()]).optional(),
});

export const patchLabelsIdResponse = zod.object({
  success: zod.union([zod.coerce.boolean(), zod.null()]).optional(),
});

export const deleteLabelsIdParams = zod.object({
  id: zod.uuid("شناسه برچسب معتبر نیست"),
});
