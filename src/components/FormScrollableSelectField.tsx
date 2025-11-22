"use client";

import { useMemo } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { cn } from "./lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Props<T extends FieldValues = FieldValues, TOption = unknown> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  options: TOption[];
  placeholder?: string;
  getOptionLabel: (option: TOption) => string;
  getOptionValue: (option: TOption) => string | boolean | number;
}

export function FormScrollableSelectField<
  T extends FieldValues = FieldValues,
  TOption = unknown,
>({
  name,
  control,
  options,
  placeholder,
  getOptionLabel,
  getOptionValue,
  label,
}: Props<T, TOption>) {
  const mappedOptions = useMemo(() => {
    return options.map((option) => {
      const value = getOptionValue(option);
      const stringValue = String(value);
      const labelText = getOptionLabel(option);
      return { key: stringValue, stringValue, rawValue: value, labelText };
    });
  }, [options, getOptionLabel, getOptionValue]);

  return (
    <div className="w-full flex flex-col gap-1">
      <label className={cn("block text-xs font-medium text-tint-blue-500")}>
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          const currentValue = String(field.value ?? "");
          const selectedOption = mappedOptions.find(
            (o) => o.stringValue === currentValue,
          );
          const selectedLabel = selectedOption ? selectedOption.labelText : "";

          return (
            <>
              <Select
                value={currentValue}
                onValueChange={(val: string) => {
                  const matched = mappedOptions.find(
                    (opt) => opt.stringValue === val,
                  );
                  if (matched) {
                    field.onChange(matched.rawValue);
                  } else {
                    field.onChange(val);
                  }
                }}
              >
                <SelectTrigger
                  className={cn(
                    "w-full  flex items-center justify-between flex-row-reverse",
                    fieldState.error?.message && "border-destructive",
                  )}
                  id={String(name)}
                >
                  <SelectValue
                    placeholder={
                      field.value ? undefined : placeholder || "انتخاب کنید"
                    }
                  >
                    {selectedLabel}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {mappedOptions.map((opt) => (
                      <SelectItem
                        className="flex justify-between w-full flex-row-reverse"
                        key={opt.key}
                        value={opt.stringValue}
                      >
                        {opt.labelText}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState?.error && (
                <p className="text-destructive text-[0.625rem] font-medium mt-[0.125rem]">
                  {fieldState.error.message}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );
}
