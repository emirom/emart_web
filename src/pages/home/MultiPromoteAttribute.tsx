import { FrameIcon } from "lucide-react";

export default function MultiPromoteAttribute() {
  return (
    <ul
      className="flex flex-col gap-3"
      aria-label="ویژگی‌های محصول"
      role="list"
    >
      {Array.from({ length: 4 }, (_, indx) => (
        <li
          key={indx}
          className="flex items-center gap-2 text-tint-blue-500 font-bold text-sm"
        >
          <span className="text-nowrap text-[0.625rem]">16 گیگابایت</span>
          <span
            className="bg-tint-blue-500 p-[0.1875rem] rounded-md"
            aria-hidden="true"
          >
            <FrameIcon size={10} stroke="#fff" />
          </span>
        </li>
      ))}
    </ul>
  );
}
