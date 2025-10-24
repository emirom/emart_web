"use client";

import { useMemo } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormErrorMessage } from "./FormErrorMessage";
import { FormLabel } from "./FormLabel";
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
  label?: string;
  name: Path<T>;
  control: Control<T>;
  options: TOption[];
  placeholder?: string;
  getOptionLabel: (option: TOption) => string;
  getOptionValue: (option: TOption) => string;
}

export function FormScrollableSelectField<
  T extends FieldValues = FieldValues,
  TOption = unknown,
>({
  label,
  name,
  control,
  options,
  placeholder,
  getOptionLabel,
  getOptionValue,
}: Props<T, TOption>) {
  const mappedOptions = useMemo(() => {
    return options.map((option) => {
      const baseValue = getOptionValue(option);
      const value = `${baseValue}`;
      const labelText = getOptionLabel(option);
      return { key: value, value, labelText };
    });
  }, [options, getOptionLabel, getOptionValue]);

  return (
    <div>
      {label && (
        <FormLabel
          label={label}
          htmlFor={name as string}
          className="text-xs mb-1 text-sky-500"
        />
      )}
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          const currentValue = String(field.value ?? "");
          const selectedOption = mappedOptions.find(
            (o) => o.value === currentValue,
          );
          const selectedLabel = selectedOption ? selectedOption.labelText : "";

          return (
            <>
              <Select
                value={currentValue}
                onValueChange={(val: string) => field.onChange(val)}
              >
                <SelectTrigger
                  className={cn(
                    "w-full mt-2",
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
                      <SelectItem key={opt.key} value={opt.value}>
                        {opt.labelText}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormErrorMessage message={fieldState.error?.message} />
            </>
          );
        }}
      />
    </div>
  );
}
