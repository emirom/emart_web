"use client";
import { CustomDataTable } from "@components/CustomDataTable";
import { Currency, CurrencyListResponse } from "@lib/schemas";
import { RowNumber } from "@lib/types/row-number";
import { ColumnDef } from "@tanstack/react-table";
import CreateCurrency from "./CreateCurrency";
import CurrencyAction from "./CurrencyAction";

const columns: ColumnDef<Currency & RowNumber>[] = [
  {
    accessorKey: "rowNumber",
    header: "",
  },
  {
    accessorKey: "name",
    header: "نام ارز",
  },
  {
    accessorKey: "symbol",
    header: "نماد",
  },
  {
    accessorKey: "isDefault",
    header: "ارز پیش‌فرض",
    cell: ({ row }) => (row.original.isDefault ? "✅" : "❌"),
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
    accessorKey: "deletedAt",
    header: "تاریخ حذف",
    cell: ({ row }) =>
      row.original.deletedAt
        ? new Date(row.original.deletedAt).toLocaleString()
        : "-",
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => <CurrencyAction id={row.original.id} />,
  },
];

export default function CurrenciesTable({
  data,
}: {
  data: CurrencyListResponse;
}) {
  return (
    <CustomDataTable
      columns={columns}
      response={data}
      title="ارزها"
      emptyMessage="ارزی یافت نشد"
      customButton={<CreateCurrency />}
      filterColumnKey="name"
      filterPlaceholder="جستجو ارز"
    />
  );
}
