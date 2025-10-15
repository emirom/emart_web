import { FrameIcon } from "lucide-react";

export default function MultiPromoteAttribute() {
  const attributes = [
    "16 گیگابایت",
    "128 گیگابایت",
    "256 گیگابایت",
    "512 گیگابایت",
  ];

  return (
    <ul
      className="flex flex-col gap-3"
      aria-label="ویژگی‌های محصول"
      role="list"
    >
      {attributes.map((attr, indx) => (
        <li
          key={indx}
          className="flex items-center gap-2 text-tint-blue-500 font-bold text-sm"
        >
          <span className="whitespace-nowrap text-[0.625rem] w-full">
            {attr}
          </span>
          <span
            className="bg-tint-blue-500 p-[0.1875rem] rounded-md flex items-center justify-center"
            aria-hidden="true"
          >
            <FrameIcon size={10} stroke="#fff" />
          </span>
        </li>
      ))}
    </ul>
  );
}
