"use client";
import { CustomDataTable } from "@components/CustomDataTable";
import { localizeNumber } from "@lib/helper/localizeNumber";
import { Inventory, ListInventoryResponse } from "@lib/schemas";
import { RowNumber } from "@lib/types/row-number";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import InventoryAction from "./InventoryAction";

const columns: ColumnDef<Inventory & RowNumber>[] = [
  {
    accessorKey: "rowNumber",
    header: "#",
  },

  {
    accessorKey: "storeId",
    header: "فروشگاه",
  },
  {
    accessorKey: "locationId",
    header: "مکان",
  },
  {
    accessorKey: "variantId",
    header: "شناسه موجودی",
  },
  {
    accessorKey: "price",
    header: "قیمت پایه",
    cell: ({ row }) => localizeNumber(row.original.price),
  },
  {
    accessorKey: "discountPercent",
    header: "درصد تخفیف",
    cell: ({ row }) => `${row.original.discountPercent}%`,
  },
  {
    accessorKey: "discountPrice",
    header: "قیمت با تخفیف",
    cell: ({ row }) => localizeNumber(row.original.discountPrice),
  },
  {
    accessorKey: "inStock",
    header: "موجودی",
  },
  {
    accessorKey: "sold",
    header: "فروش رفته",
  },
  {
    accessorKey: "rate",
    header: "امتیاز",
  },
  {
    accessorKey: "lowStockThreshold",
    header: "آستانه هشدار موجودی",
  },
  {
    accessorKey: "expiryDate",
    header: "تاریخ انقضا",
    cell: ({ row }) =>
      row.original.expiryDate
        ? new Date(row.original.expiryDate).toLocaleDateString()
        : "-",
  },
  {
    accessorKey: "warehouseCode",
    header: "کد انبار",
  },
  {
    accessorKey: "shelfCode",
    header: "کد قفسه",
  },
  {
    accessorKey: "hsCode",
    header: "کد HS",
  },
  {
    accessorKey: "originCountry",
    header: "کشور مبدا",
  },
  {
    accessorKey: "packageWeight",
    header: "وزن بسته (کیلوگرم)",
  },
  {
    accessorKey: "packageDimensions",
    header: "ابعاد بسته",
    cell: ({ row }) =>
      row.original.packageDimensions
        ? `${row.original.packageDimensions.length}x${row.original.packageDimensions}`
        : "-",
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ ایجاد",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
  },
  {
    accessorKey: "updatedAt",
    header: "آخرین بروزرسانی",
    cell: ({ row }) => new Date(row.original.updatedAt).toLocaleString(),
  },

  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => <InventoryAction id={row.original.id} />,
  },
];

export default function InventoryTable({
  data,
}: {
  data?: ListInventoryResponse;
}) {
  return (
    <CustomDataTable
      response={data}
      columns={columns}
      title="موجودی کالا"
      emptyMessage="موجودی کالایی یافت نشد"
      filterColumnKey="storeId"
      filterPlaceholder="آیدی‌فروشگاه‌راواردنمایید"
      customButton={
        <Link href="/dashboard/inventory/add">افزودن موجودی کالا</Link>
      }
    />
  );
}
