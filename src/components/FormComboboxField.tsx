"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "cmdk";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormErrorMessage } from "./FormErrorMessage";
import { FormLabel } from "./FormLabel";
import { cn } from "./lib/utils";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface Props<
  T extends FieldValues = FieldValues,
  TOption = unknown,
  TValue extends string | number | boolean = string,
> {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  options: TOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  getOptionLabel: (option: TOption) => string;
  getOptionValue: (option: TOption) => TValue;
}

export function FormComboboxField<
  T extends FieldValues = FieldValues,
  TOption = unknown,
  TValue extends string | number | boolean = string,
>({
  label,
  name,
  control,
  options,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  getOptionLabel,
  getOptionValue,
}: Props<T, TOption, TValue>) {
  const [open, setOpen] = useState(false);

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
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const selectedOption = options.find(
            (opt) => String(getOptionValue(opt)) === String(field.value),
          );

          const handleSelect = (currentValue: string) => {
            const matchedOption = options.find(
              (opt) => String(getOptionValue(opt)) === currentValue,
            );
            if (!matchedOption) return;
            field.onChange(getOptionValue(matchedOption) as unknown as TValue);
            setOpen(false);
          };

          return (
            <>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                      "w-full justify-between",
                      fieldState.error ? "border-destructive" : "",
                    )}
                  >
                    {selectedOption
                      ? getOptionLabel(selectedOption)
                      : placeholder}
                    <ChevronDown
                      className={cn(
                        "ml-2 h-4 w-4 opacity-50",
                        open ? "rotate-90" : "rotate-0",
                      )}
                    />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                  <Command className="w-full p-2">
                    <CommandInput
                      placeholder={searchPlaceholder}
                      className="h-9 w-full px-2"
                    />
                    <CommandList>
                      <CommandEmpty className="w-full text-center">
                        {emptyMessage}
                      </CommandEmpty>

                      <CommandGroup>
                        {options.map((option, index) => {
                          const value = getOptionValue(option);
                          const label = getOptionLabel(option);
                          const stringValue = String(value);
                          return (
                            <CommandItem
                              key={`${stringValue}_${label}_${index}`}
                              value={stringValue}
                              onSelect={handleSelect}
                            >
                              {label}
                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  String(field.value) === stringValue
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormErrorMessage message={fieldState.error?.message} />
            </>
          );
        }}
      />
    </div>
  );
}
