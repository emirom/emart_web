"use client";

import { FilterSchemaInput } from "@lib/types/file-type";
import { Control, Controller, FieldValues } from "react-hook-form";

type SelectFieldProps<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  config: FilterSchemaInput;
};

const FilterSelectedField = <T extends FieldValues>({
  config,
  control,
}: SelectFieldProps<T>) => {
  const options: { label: string; value: string }[] = Array.isArray(
    config.enumOptions
  )
    ? config.enumOptions.map((opt: string) => ({ label: opt, value: opt }))
    : [];

  return (
    <Controller
      name={config.service as any}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col space-y-1">
          {config.label && (
            <label
              htmlFor={config.service}
              className="text-sm font-medium text-white"
            >
              {config.label}
            </label>
          )}
          <select
            {...field}
            id={config.service}
            className={`border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-150 ${
              fieldState.error ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
          >
            <option value="">انتخاب کنید</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {fieldState.error && (
            <p className="text-xs text-red-600">{fieldState.error?.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default FilterSelectedField;
