import { customerNavbar } from "@lib/constants/customer-navbar";
import Link from "next/link";

export default function CustomerNavbar() {
  return (
    <ul className="flex flex-col gap-2">
      {customerNavbar.map((item) => (
        <li
          className="py-2 px-4 border border-gray-700 rounded-sm "
          key={item.id}
        >
          <Link
            href={item.href}
            className="flex items-center justify-between gap-1 cursor-pointer text-tint-blue-500"
          >
            {item.icon}
            <span className="text-sm font-medium block  w-full text-center">
              {item.title}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
