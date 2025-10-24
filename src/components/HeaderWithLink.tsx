"use client";
import Link from "next/link";

type Props = {
  title: string;
  linkTitle?: string;
  linkHref?: string;
};

export function HeaderWithLink({ title, linkTitle, linkHref }: Props) {
  return (
    <div className="flex items-center justify-between border border-tint-blue-300 p-1  rounded-lg mb-2">
      <h2 className="text-xs mx-1 font-bold text-tint-blue-600">{title}</h2>
      {linkTitle && linkHref && (
        <Link
          className="bg-sky-500 p-2  rounded-lg text-white  "
          href={linkHref}
        >
          {linkTitle}
        </Link>
      )}
    </div>
  );
}
