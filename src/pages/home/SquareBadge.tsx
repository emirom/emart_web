type Props = {
  value: string;
  label: string;
};

export default function SquareBadge({ value, label }: Props) {
  return (
    <div
      className="flex flex-col items-center justify-center w-12 h-12 p-2 text-center text-white bg-tint-blue-500 rounded-lg"
      role="group"
      aria-label={`${value} ${label}`}
    >
      <span className="text-base font-bold">{value}</span>
      <span className="text-xs">{label}</span>
    </div>
  );
}
