"use client";
import { cn } from "@components/lib/utils";
import { X } from "lucide-react";

type Label = { id: string; name: string };
type Props = {
  selectedLabels: Label[];
  handleRemoveLabel: (id: string) => void;
};

export default function LabelList({
  selectedLabels,
  handleRemoveLabel,
}: Props) {
  return (
    <div className="mt-5 col-span-1 sm:col-span-2 lg:col-span-3">
      <label
        className={cn(
          "block text-xs text-nowrap text-tint-blue-500 font-medium mb-2",
        )}
      >
        لیست برچسب‌های انتخاب شده
      </label>
      <div className="flex items-center gap-2 flex-wrap border border-gray-100 p-2 rounded-lg">
        {!!selectedLabels.length ? (
          selectedLabels.map((label) => (
            <div
              key={label.id}
              className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
            >
              {label.name}
              <button
                type="button"
                onClick={() => handleRemoveLabel(label.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                <X size={14} />
              </button>
            </div>
          ))
        ) : (
          <span className="text-gray-400 text-xs text-center w-full">
            هیچ برچسبی انتخاب نشده است
          </span>
        )}
      </div>
    </div>
  );
}
