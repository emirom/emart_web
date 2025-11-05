"use client";

import { cn } from "@components/lib/utils";
import { Button } from "@components/ui/button";
import { DeliveryOption } from "@lib/constants/delivery-options";

interface DeliveryOptionCardProps {
  option: DeliveryOption;
  isActive: boolean;
  onSelect: (id: string) => void;
}

export default function DeliveryOptionCard({
  option,
  isActive,
  onSelect,
}: DeliveryOptionCardProps) {
  return (
    <label
      key={option.id}
      htmlFor={option.id}
      className={cn(
        "relative cursor-pointer flex flex-col justify-between border rounded-2xl py-2 p-5 transition-all shadow-sm",
        isActive
          ? "border-green-500 bg-green-50 shadow-md"
          : "border-gray-200 bg-white hover:shadow-md",
      )}
    >
      <div className="absolute left-6 top-6 opacity-25">{option.icon}</div>

      <div className="flex flex-col gap-2">
        <h3
          className={cn(
            "text-lg font-semibold text-right",
            isActive ? "text-green-400" : "text-[#0F4275]",
          )}
        >
          {option.title}
        </h3>

        <ul className="text-xs text-right leading-relaxed">
          {option.description.map((desc, i) => (
            <li
              key={i}
              className="flex items-center grow justify-start gap-1 text-gray-700"
            >
              <span
                className={cn(
                  "mt-1 w-1.5 h-1.5 rounded-full",
                  isActive ? "bg-green-400" : "bg-[#0F4275]",
                )}
              />
              <span>{desc}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-end justify-between mt-4">
        <Button
          type="button"
          onClick={() => onSelect(option.id)}
          variant={isActive ? "default" : "outline"}
          className={cn(
            "px-6 py-2 rounded-lg font-semibold transition-colors",
            isActive
              ? "bg-green-400 hover:bg-green-600 text-white"
              : "border-[#0F4275] text-[#0F4275] hover:bg-[#0F4275]/10",
          )}
        >
          انتخاب
        </Button>
        <p
          className={cn(
            "text-base font-medium",
            isActive ? "text-green-500" : "text-[#0F4275]",
          )}
        >
          {option.price}
        </p>
        <input
          type="radio"
          id={option.id}
          name="delivery"
          value={option.id}
          checked={isActive}
          onChange={() => onSelect(option.id)}
          className="hidden"
        />
      </div>
    </label>
  );
}
