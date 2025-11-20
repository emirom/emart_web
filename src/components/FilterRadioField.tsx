"use client";

import { FilterSchemaInput } from "@lib/types/file-type";
import { Control, Controller, FieldValues } from "react-hook-form";

type RadioFieldProps<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  config: FilterSchemaInput;
};

const FilterRadioField = <T extends FieldValues>({
  config,
  control,
}: RadioFieldProps<T>) => {
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
        <div className="flex flex-col space-y-2">
          {config.label && (
            <span className="text-sm font-medium text-white">
              {config.label}
            </span>
          )}

          <div className="flex flex-col space-y-1">
            {options.map((option) => (
              <label
                key={option.value}
                className="flex items-center space-x-2 cursor-pointer select-none"
              >
                <input
                  type="radio"
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={() => field.onChange(option.value)}
                  className={`h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 transition ${
                    fieldState.error ? "border-red-500" : ""
                  }`}
                />
                <span className="text-sm text-gray-200">{option.label}</span>
              </label>
            ))}
          </div>

          {fieldState.error && (
            <p className="text-xs text-red-600">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default FilterRadioField;
