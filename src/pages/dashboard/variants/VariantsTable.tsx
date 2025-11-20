"use client";

import { CustomDataTable } from "@components/CustomDataTable";
import { Variant } from "@lib/schemas";
import { useGetVariants } from "@lib/services/variants/variants";
import { VariantFilter } from "@lib/types/filter-generator";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import VariantAction from "./VariantAction";

const columns: ColumnDef<Variant>[] = [
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
    accessorKey: "action",
    header: "",
    cell: ({ row }) => <VariantAction key={row.id} id={row.original.id} />,
  },
];

export default function VariantsTable({
  initialQuery,
}: {
  initialQuery?: VariantFilter;
}) {
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get("page") ?? initialQuery?.page ?? 0);

  const { data: variants } = useGetVariants({
    limit: 10,
    skip: page * 10,
    sku: searchParams?.get("sku") ?? initialQuery?.sku,
    barcode: searchParams?.get("barcode") ?? initialQuery?.barcode,
    mpn: searchParams?.get("mpn") ?? initialQuery?.mpn,
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
      filterColumnKey="attributeComboKey"
      filterConfigs={variants?.filters}
    />
  );
}
