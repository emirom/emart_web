"use client";

import { useAutocomplete } from "@lib/hooks/useAutocomplete";
import clsx from "clsx";
import React, { InputHTMLAttributes, useEffect, useRef } from "react";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { cn } from "./lib/utils";
import { Input } from "./ui/input";

export interface AutocompleteProps<
  TOption extends object,
  TFieldValues extends FieldValues = FieldValues,
> {
  options: TOption[];
  label: string;
  name: FieldPath<TFieldValues>;
  getOptionLabel: (option: TOption) => string;
  getOptionValue: (option: TOption) => string | null;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
  onSelect?: (option: TOption | null) => void;
}

function FormAutocomplete<
  TOption extends object,
  TFieldValues extends FieldValues = FieldValues,
>({
  options = [],
  onSelect,
  label,
  name,
  getOptionLabel,
  getOptionValue,
  inputProps,
  control,
  rules,
}: AutocompleteProps<TOption, TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState }) => {
        return (
          <InternalAutocompleteField
            options={options}
            onSelect={onSelect}
            label={label}
            name={name}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            inputProps={inputProps}
            value={value}
            onChange={onChange}
            fieldState={fieldState}
          />
        );
      }}
    />
  );
}

interface InternalAutocompleteFieldProps<
  TOption extends object,
  TFieldValues extends FieldValues = FieldValues,
> {
  options: TOption[];
  label: string;
  name: FieldPath<TFieldValues>;
  getOptionLabel: (option: TOption) => string;
  getOptionValue: (option: TOption) => string | null;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  onSelect?: (option: TOption | null) => void;
  value: string | null;
  onChange: (value: string | null) => void;
  fieldState: {
    invalid?: boolean;
    isDirty?: boolean;
    isTouched?: boolean;
    error?: {
      message?: string;
    };
  };
}

const InternalAutocompleteField = <
  TOption extends object,
  TFieldValues extends FieldValues = FieldValues,
>({
  options = [],
  onSelect,
  label,
  name,
  getOptionLabel,
  getOptionValue,
  inputProps,
  value,
  onChange,
  fieldState,
}: InternalAutocompleteFieldProps<TOption, TFieldValues>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { inputValue, setInputValue, isOpen, open, close, filteredOptions } =
    useAutocomplete<TOption>(options, getOptionLabel);

  useEffect(() => {
    if (value && options.length > 0) {
      const selectedOption = options.find(
        (option) => getOptionValue(option) === value,
      );
      setInputValue(selectedOption ? getOptionLabel(selectedOption) : "");
    } else {
      setInputValue("");
    }
  }, [value, options, getOptionLabel, getOptionValue, setInputValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);

  const onOptionClick = (option: TOption | null) => {
    if (option) {
      const val = getOptionValue(option);
      onChange(val ?? null);
      setInputValue(getOptionLabel(option));
      onSelect?.(option);
    } else {
      onChange(null as unknown as string);
      setInputValue("");
      onSelect?.(null);
    }
    close();
  };

  return (
    <div ref={containerRef} className="flex flex-col gap-1 grow">
      <label
        htmlFor={name}
        className={cn("block text-xs text-tint-blue-500 font-medium")}
      >
        {label}
      </label>

      <div className="relative ">
        <Input
          type="text"
          id={name}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onClick={open}
          {...inputProps}
        />
        {isOpen && (
          <ul
            className={clsx(
              "text-sm text-[#0F4275] rounded-[7px] absolute w-full top-12 left-0 right-0 bg-white border border-gray-300 max-h-[400px] overflow-y-auto z-[100]",
            )}
          >
            <li
              key="empty-option"
              className="hover:bg-[#D4F1F4] p-2 cursor-pointer text-gray-500"
              onClick={() => onOptionClick(null)}
            >
              انتخاب کنید
            </li>
            {filteredOptions.length === 0 ? (
              <li className="hover:bg-[#D4F1F4] text-gray-400 text-center p-2 cursor-pointer">
                موردی وجود ندارد
              </li>
            ) : (
              filteredOptions.map((item, index) => (
                <li
                  key={`${getOptionValue(item)}-${index}`}
                  className="hover:bg-[#D4F1F4] p-2 cursor-pointer"
                  onClick={() => onOptionClick(item)}
                >
                  {getOptionLabel(item)}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      {fieldState?.error && (
        <p className="text-destructive text-[0.625rem] font-medium mt-[0.125rem]">
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
};

export default React.memo(FormAutocomplete) as typeof FormAutocomplete;
