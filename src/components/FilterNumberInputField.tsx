"use client";

import { FilterSchemaInput } from "@lib/types/file-type";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { cn } from "./lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type NumberInputFieldProps<T extends FieldValues> = {
  control: Control<T>;
  config: FilterSchemaInput;
};

const FilterNumberInputField = <T extends FieldValues>({
  config,
  control,
}: NumberInputFieldProps<T>) => {
  return (
    <Controller
      name={config.service as Path<T>}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col space-y-1">
          {config.label && (
            <Label
              className={cn("block text-xs font-medium text-tint-blue-500")}
            >
              {config.label}
            </Label>
          )}
          <Input
            type="number"
            {...field}
            id={config.service}
            value={field.value ?? ""}
            placeholder={config.label ?? ""}
            className={`border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-150 ${
              fieldState.error ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
          />
          {fieldState.error && (
            <p className="text-xs text-red-600">{fieldState.error?.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default FilterNumberInputField;
