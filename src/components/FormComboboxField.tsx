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
import React, { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { cn } from "./lib/utils";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface Props<
  T extends FieldValues,
  TOption extends object,
  TValue extends string | number | boolean = string,
> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  options: TOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  getOptionLabel: (option: TOption) => string;
  getOptionValue: (option: TOption) => TValue;
}

function FormComboboxField<
  T extends FieldValues,
  TOption extends object,
  TValue extends string | number | boolean = string,
>({
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
  console.log();
  return (
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
          <div className="flex flex-col gap-1">
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
                      "ml-2 h-4 w-4 opacity-50 transition-transform",
                      open ? "rotate-90" : "rotate-0",
                    )}
                  />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command className="w-full p-2">
                  <CommandInput
                    placeholder={searchPlaceholder}
                    className="h-9 w-full px-2 mb-2"
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
                            className="flex items-center justify-between w-full"
                            key={`${stringValue}_${index}`}
                            value={stringValue}
                            onSelect={handleSelect}
                          >
                            {label}
                            <Check
                              className={cn(
                                " h-4 w-4",
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
            {fieldState.error && (
              <span className="text-sm text-destructive">
                {fieldState.error.message}
              </span>
            )}
          </div>
        );
      }}
    />
  );
}

export default React.memo(FormComboboxField) as typeof FormComboboxField;
