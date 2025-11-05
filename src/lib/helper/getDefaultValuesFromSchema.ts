"use client";

import {
  ZodArray,
  ZodBoolean,
  ZodDate,
  ZodNumber,
  ZodObject,
  ZodString,
  ZodTypeAny,
} from "zod";

export type DefaultValue<T extends ZodTypeAny> = T extends ZodString
  ? string
  : T extends ZodNumber
    ? number
    : T extends ZodBoolean
      ? boolean
      : T extends ZodDate
        ? Date
        : T extends ZodArray<infer U>
          ? U extends ZodTypeAny
            ? DefaultValue<U>[]
            : never
          : T extends ZodObject<infer S>
            ? S extends Record<string, ZodTypeAny>
              ? DefaultValues<S>
              : never
            : never;

export type DefaultValues<T extends Record<string, ZodTypeAny>> = {
  [K in keyof T]: DefaultValue<T[K]>;
};

export type CustomDefaults<T extends Record<string, ZodTypeAny>> = Partial<{
  [K in keyof T]: DefaultValue<T[K]>;
}>;

export function getDefaultValuesFromSchemaWithCustom<
  T extends Record<string, ZodTypeAny>,
>(schema: ZodObject<T>, customDefaults?: CustomDefaults<T>): DefaultValues<T> {
  const defaults = {} as DefaultValues<T>;

  for (const key of Object.keys(schema.shape) as Array<keyof T>) {
    const field = schema.shape[key];

    if (customDefaults && key in customDefaults) {
      defaults[key] = customDefaults[key] as DefaultValue<T[typeof key]>;
      continue;
    }

    if (field instanceof ZodString) {
      defaults[key] = "" as DefaultValue<typeof field>;
      continue;
    }

    if (field instanceof ZodNumber) {
      defaults[key] = 0 as DefaultValue<typeof field>;
      continue;
    }

    if (field instanceof ZodBoolean) {
      defaults[key] = false as DefaultValue<typeof field>;
      continue;
    }

    if (field instanceof ZodDate) {
      defaults[key] = new Date() as DefaultValue<typeof field>; // مقدار پیش‌فرض تاریخ
      continue;
    }

    if (field instanceof ZodArray) {
      defaults[key] = [] as DefaultValue<typeof field>;
      continue;
    }

    if (field instanceof ZodObject) {
      const inner = field as ZodObject<Record<string, ZodTypeAny>>;
      defaults[key] = getDefaultValuesFromSchemaWithCustom(
        inner,
        undefined,
      ) as DefaultValue<typeof field>;
      continue;
    }

    throw new Error(`Unsupported Zod type for key "${String(key)}"`);
  }

  return defaults;
}
