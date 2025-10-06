"use client";

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormErrorMessage } from "./FormErrorMessage";
import { FormLabel } from "./FormLabel";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface Props<
  T extends FieldValues,
  TOption extends Record<string, unknown>,
  TValue extends string | number | boolean = string,
> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  options: TOption[];
  getOptionLabel: (option: TOption) => string;
  getOptionValue: (option: TOption) => TValue;
}

export function FormRadioGroupField<
  T extends FieldValues,
  TOption extends Record<string, unknown>,
  TValue extends string | number | boolean = string,
>({
  control,
  name,
  label,
  options,
  getOptionLabel,
  getOptionValue,
}: Props<T, TOption, TValue>) {
  return (
    <>
      <FormLabel label={label} htmlFor={name as string} />
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          const handleValueChange = (val: string) => {
            const matchedOption = options.find(
              (opt) => String(getOptionValue(opt)) === val,
            );
            if (!matchedOption) return;
            field.onChange(getOptionValue(matchedOption));
          };

          return (
            <div className="mt-2">
              <RadioGroup
                value={
                  field.value !== undefined
                    ? String(field.value)
                    : String(getOptionValue(options[0]))
                }
                onValueChange={handleValueChange}
                className="w-fit flex mt-2"
              >
                {options.map((option, index) => {
                  const value = getOptionValue(option);
                  const optionLabel = getOptionLabel(option);

                  return (
                    <div
                      key={`${String(value)}_${index}`}
                      className="w-fit flex items-center gap-2"
                    >
                      <Label
                        htmlFor={`${name}-${index}`}
                        className="inline-block"
                      >
                        {optionLabel}
                      </Label>
                      <RadioGroupItem
                        value={String(value)}
                        id={`${name}-${index}`}
                      />
                    </div>
                  );
                })}
              </RadioGroup>
              <FormErrorMessage message={fieldState.error?.message} />
            </div>
          );
        }}
      />
    </>
  );
}
