"use client";

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormErrorMessage } from "./FormErrorMessage";
import { FormLabel } from "./FormLabel";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface Props<
  T extends FieldValues,
  TOption extends Record<string, unknown>,
> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  options: TOption[];
  getOptionValue: (option: TOption) => string;
  getOptionLabel: (option: TOption) => string;
  direction?: "col" | "row";
}

export function FormCheckboxField<
  T extends FieldValues,
  TOption extends Record<string, unknown>,
>({
  control,
  name,
  label,
  options,
  getOptionValue,
  getOptionLabel,
  direction = "col",
}: Props<T, TOption>) {
  const containerClass =
    direction === "col"
      ? "flex flex-col gap-2 mt-2"
      : "flex flex-row gap-4 mt-2";

  return (
    <div>
      <FormLabel label={label} htmlFor={name as string} />
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          const valueArray: string[] = Array.isArray(field.value)
            ? field.value
            : [];

          return (
            <div className={containerClass}>
              {options.map((option, index) => {
                const optionValue = getOptionValue(option);
                const optionLabel = getOptionLabel(option);
                const checked = valueArray.includes(optionValue);

                return (
                  <div
                    key={`${optionValue}_${index}`}
                    className="flex items-center gap-2"
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(isChecked) => {
                        const newValue = isChecked
                          ? [...valueArray, optionValue]
                          : valueArray.filter((v) => v !== optionValue);
                        field.onChange(newValue);
                      }}
                      id={`${name}-${index}`}
                    />
                    <Label htmlFor={`${name}-${index}`}>{optionLabel}</Label>
                  </div>
                );
              })}

              <FormErrorMessage message={fieldState.error?.message} />
            </div>
          );
        }}
      />
    </div>
  );
}

export default FormCheckboxField;
