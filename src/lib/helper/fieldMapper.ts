import FilterCheckboxField from "@components/FilterCheckboxField";
import FilterInputField from "@components/FilterInputField";
import FilterNumberInputField from "@components/FilterNumberInputField";
import FilterRadioField from "@components/FilterRadioField";
import { FilterSchemaInput } from "@lib/types/file-type";

import { Control, FieldValues } from "react-hook-form";

export function fieldMapper<T extends FieldValues>(
  config: FilterSchemaInput,
): React.ComponentType<{ config: FilterSchemaInput; control: Control<T> }> {
  switch (config.type) {
    case "text":
      return FilterInputField as React.ComponentType<{
        config: FilterSchemaInput;
        control: Control<T>;
      }>;
    case "number":
      return FilterNumberInputField as React.ComponentType<{
        config: FilterSchemaInput;
        control: Control<T>;
      }>;
    case "checkbox":
      return FilterCheckboxField as React.ComponentType<{
        config: FilterSchemaInput;
        control: Control<T>;
      }>;
    case "radio":
      return FilterRadioField as React.ComponentType<{
        config: FilterSchemaInput;
        control: Control<T>;
      }>;
    case "select":
      return FilterRadioField as React.ComponentType<{
        config: FilterSchemaInput;
        control: Control<T>;
      }>;
    default:
      throw new Error("Unknown field type");
  }
}
