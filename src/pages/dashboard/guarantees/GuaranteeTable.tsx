"use client";

import { CustomDataTable } from "@components/CustomDataTable";
import { Guarantee } from "@lib/schemas";
import { useGetGuarantees } from "@lib/services/guarantees/guarantees";
import { ColumnDef } from "@tanstack/react-table";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import GuaranteeAction from "./GuaranteeAction";

type Props = {
  page?: number;
  title?: string;
};

const columns: ColumnDef<Guarantee>[] = [
  {
    accessorKey: "title",
    header: "عنوان گارانتی",
    cell: ({ row }) => (
      <div className="font-medium text-gray-800">{row.original.title}</div>
    ),
  },
  {
    accessorKey: "providerName",
    header: "نام ارائه‌دهنده",
    cell: ({ row }) => (
      <div className="text-gray-700">{row.original.providerName ?? "-"}</div>
    ),
  },
  {
    accessorKey: "months",
    header: "مدت (ماه/روز)",
    cell: ({ row }) => {
      const { months, days } = row.original;
      return (
        <div className="text-gray-700">
          {months ? `${months} ماه` : ""}
          {days ? ` ${days} روز` : months ? "" : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "فعال",
    cell: ({ row }) => <>{row.original.isActive ? "✅" : "❌"}</>,
  },
  {
    accessorKey: "isInternational",
    header: "بین‌المللی",
    cell: ({ row }) => <>{row.original.isInternational ? "✅" : "❌"}</>,
  },
  {
    accessorKey: "sortOrder",
    header: "ترتیب نمایش",
    cell: ({ row }) => (
      <div className="text-gray-700 text-center">{row.original.sortOrder}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ ایجاد",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <div className="text-gray-500 text-sm">
          {date.toLocaleDateString("fa-IR")}{" "}
          <span className="text-xs text-gray-400">
            {date.toLocaleTimeString("fa-IR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "عملیات",
    cell: ({ row }) => (
      <GuaranteeAction key={row.original.id} id={row.original.id} />
    ),
  },
];

export default function GuaranteeTable({
  initialQuery,
}: {
  initialQuery: Props;
}) {
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get("page") ?? initialQuery?.page ?? 0);
  const title = searchParams?.get("search") ?? initialQuery?.title;
  const { data: guarantees } = useGetGuarantees({
    skip: page * 10,
    limit: 3,
    title,
  });
  return (
    <CustomDataTable
      data={guarantees?.data ?? []}
      columns={columns}
      filterColumnKey="title"
      customButton={
        <Link
          href="/dashboard/guarantees/add"
          className="bg-green-200 p-2 text-white rounded-lg"
          aria-label="افزودن کمیت"
        >
          افزودن گارانتی
        </Link>
      }
      emptyMessage="هیچ گارانتی‌ای یافت نشد"
      filterPlaceholder="جستجو"
      title="گارانتی‌ها"
    />
  );
}
