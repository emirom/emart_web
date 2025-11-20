"use client";

import { FilterSchemaInput } from "@lib/types/file-type";
import { Control, Controller, FieldValues } from "react-hook-form";
import { cn } from "./lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type CheckboxFieldProps<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  config: FilterSchemaInput;
};

const FilterCheckboxField = <T extends FieldValues>({
  config,
  control,
}: CheckboxFieldProps<T>) => {
  return (
    <Controller
      name={config.service as any}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex items-start space-x-3">
          <div className="flex items-center h-5">
            <Input
              id={config.service}
              type="checkbox"
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              className={`h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition ${
                fieldState.error ? "border-red-500" : ""
              }`}
            />
          </div>
          <div className="text-sm">
            <Label
              className={cn("block text-xs font-medium text-tint-blue-500")}
            >
              {config.label}
            </Label>

            {fieldState.error && (
              <p className="mt-1 text-xs text-red-600">
                {fieldState.error.message}
              </p>
            )}
          </div>
        </div>
      )}
    />
  );
};

export default FilterCheckboxField;
