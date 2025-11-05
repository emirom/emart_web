import { cn } from "@components/lib/utils";

type Props = {
  value: string;
  label: string;
  className?: string;
};

export default function SquareBadge({ value, label, className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-13 h-13 p-2 text-center text-white bg-tint-blue-500 rounded-lg",
        className,
      )}
      role="group"
      aria-label={`${value} ${label}`}
    >
      <span className="text-base font-bold">{value}</span>
      <span className="text-xs font-bold">{label}</span>
    </div>
  );
}
