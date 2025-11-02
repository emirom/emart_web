import { cn } from "@components/lib/utils";
import { Check } from "lucide-react";

interface StepItemProps {
  stepNumber: number;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

export default function StepItem({
  stepNumber,
  label,
  isActive,
  isCompleted,
  onClick,
}: StepItemProps) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "relative flex flex-col items-center text-sm font-medium focus:outline-none transition-colors duration-200",
          isActive
            ? "text-blue-600"
            : isCompleted
              ? "text-green-600"
              : "text-gray-500 hover:text-blue-500",
        )}
        aria-current={isActive ? "step" : undefined}
      >
        <div
          className={cn(
            "flex items-center justify-center w-9 h-9 rounded-full border-2 mb-2 transition-all duration-200",
            isCompleted
              ? "border-green-600 bg-green-50 "
              : isActive
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 bg-white",
          )}
        >
          {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
        </div>
        <span className="text-xs">{label}</span>
      </button>
    </li>
  );
}
