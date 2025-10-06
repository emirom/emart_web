"use client";

import { useMemo } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormErrorMessage } from "./FormErrorMessage";
import { FormLabel } from "./FormLabel";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Props<
  T extends FieldValues,
  TOption extends Record<string, unknown>,
> {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  options: TOption[];
  placeholder?: string;
  getOptionLabel: (option: TOption) => string;
  getOptionValue: (option: TOption) => string;
}

export function FormScrollableSelectField<
  T extends FieldValues,
  TOption extends Record<string, unknown>,
>({
  label,
  name,
  control,
  options,
  placeholder,
  getOptionLabel,
  getOptionValue,
}: Props<T, TOption>) {
  const mappedOptions = useMemo(
    () =>
      options.map((option, index) => {
        const value = getOptionValue(option);
        const labelText = getOptionLabel(option);
        return { key: `${value}-${index}`, value, labelText };
      }),
    [options, getOptionLabel, getOptionValue],
  );
  return (
    <div>
      <FormLabel label={label} htmlFor={name as string} />
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          const selectedOption = options.find(
            (o) => getOptionValue(o) === field.value,
          );
          const selectedLabel = selectedOption
            ? getOptionLabel(selectedOption)
            : "";

          return (
            <>
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <SelectTrigger
                  className="w-full border-destructive mt-2"
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
