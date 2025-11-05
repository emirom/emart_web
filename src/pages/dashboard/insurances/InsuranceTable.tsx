"use client";

import { CustomDataTable } from "@components/CustomDataTable";
import { Insurance } from "@lib/schemas";
import { useGetInsurances } from "@lib/services/insurances/insurances";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import InsuranceAction from "./InsuranceAction";

type InitialQuery = {
  page?: number;
  title?: string;
};

const columns: ColumnDef<Insurance>[] = [
  {
    accessorKey: "title",
    header: "عنوان بیمه",
    cell: ({ row }) => (
      <div className="font-medium text-gray-800">{row.original.title}</div>
    ),
  },
  {
    accessorKey: "providerName",
    header: "شرکت بیمه‌گر",
    cell: ({ row }) => (
      <div className="text-gray-700">{row.original.providerName ?? "-"}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "قیمت (ریال)",
    cell: ({ row }) => (
      <div className="text-gray-700">
        {row.original.price.toLocaleString("fa-IR")}
      </div>
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
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 text-xs rounded-full ${
          row.original.isActive
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-600"
        }`}
      >
        {row.original.isActive ? "بله" : "خیر"}
      </span>
    ),
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
    header: "",
    cell: ({ row }) => (
      <InsuranceAction key={row.original.id} id={row.original.id} />
    ),
  },
];

export default function InsuranceTable({
  initialQuery,
}: {
  initialQuery: InitialQuery;
}) {
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get("page") ?? initialQuery?.page ?? 0);
  const title = searchParams?.get("search") ?? initialQuery?.title;
  const { data: insurances } = useGetInsurances({
    skip: page * 10,
    limit: 10,
    title,
  });

  return (
    <CustomDataTable
      data={insurances?.data ?? []}
      columns={columns}
      filterColumnKey="title"
      customButton={
        <Link
          href="/dashboard/insurances/add"
          className="bg-green-200 p-2 text-white rounded-lg"
          aria-label="افزودن کمیت"
        >
          افزودن‌بیمه
        </Link>
      }
      emptyMessage="هیچ بیمه‌ای یافت نشد"
      filterPlaceholder="جستجوی بیمه..."
      title="بیمه‌ها"
    />
  );
}
