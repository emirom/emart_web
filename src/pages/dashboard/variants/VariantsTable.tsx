"use client";

import { CustomDataTable } from "@components/CustomDataTable";
import { Variant } from "@lib/schemas";
import { useGetVariants } from "@lib/services/variants/variants";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type InitialQuery = {
  page?: number;
};

const columns: ColumnDef<Variant>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "sku",
    header: "کد SKU",
  },
  {
    accessorKey: "publicId",
    header: "کد عمومی (Public ID)",
  },
  {
    accessorKey: "barcode",
    header: "بارکد",
  },
  {
    accessorKey: "mpn",
    header: "کد تولیدکننده (MPN)",
  },
  {
    accessorKey: "titleOverride",
    header: "عنوان سفارشی",
    cell: ({ row }) => row.original.titleOverride || "-",
  },
  {
    accessorKey: "descriptionOverride",
    header: "توضیحات سفارشی",
    cell: ({ row }) =>
      row.original.descriptionOverride
        ? row.original.descriptionOverride.slice(0, 60) + "..."
        : "-",
  },
  {
    accessorKey: "isActive",
    header: "فعال",
    cell: ({ row }) => (row.original.isActive ? "✅" : "❌"),
  },
  {
    accessorKey: "isApproved",
    header: "تأیید شده",
    cell: ({ row }) => (row.original.isApproved ? "🟢" : "🔴"),
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => row.original.slug || "-",
  },
  {
    accessorKey: "attributeComboKey",
    header: "کلید ویژگی‌ها (Attribute Key)",
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ ایجاد",
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString("fa-IR"),
  },
  {
    accessorKey: "updatedAt",
    header: "آخرین بروزرسانی",
    cell: ({ row }) =>
      new Date(row.original.updatedAt).toLocaleDateString("fa-IR"),
  },
  {
    accessorKey: "deletedAt",
    header: "تاریخ حذف",
    cell: ({ row }) =>
      row.original.deletedAt
        ? new Date(row.original.deletedAt).toLocaleDateString("fa-IR")
        : "-",
  },
];

export default function VariantsTable({
  initialQuery,
}: {
  initialQuery?: InitialQuery;
}) {
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get("page") ?? initialQuery?.page ?? 0);

  const { data: variants } = useGetVariants({
    limit: 10,
    skip: page * 10,
  });

  return (
    <CustomDataTable
      columns={columns}
      data={variants?.data ?? []}
      customButton={
        <Link
          href="/dashboard/variants/add"
          className="bg-green-200 p-2 text-white rounded-lg"
          aria-label="افزودن کمیت"
        >
          افزودن تنوع محصول
        </Link>
      }
      emptyMessage="تنوعی یافت نشد"
      title="لیست تنوع محصولات"
      filterPlaceholder="جستجو‌تنوع‌محصول"
      filterColumnKey="sku"
    />
  );
}
