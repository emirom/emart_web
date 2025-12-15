"use client";
import { CustomDataTable } from "@components/CustomDataTable";
import { ListStoreLocationsResponse, StoreLocation } from "@lib/schemas";
import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<StoreLocation>[] = [
  {
    accessorKey: "storeId",
    header: "شناسه فروشگاه",
  },
  {
    accessorKey: "locationId",
    header: "شناسه آدرس",
  },
  {
    accessorKey: "assignedAt",
    header: "تاریخ تخصیص",
    cell: ({ row }) =>
      `📌 ${new Date(row.original.assignedAt).toLocaleDateString("fa-IR")}`,
  },
  {
    accessorKey: "assignedById",
    header: "تخصیص توسط",
    cell: ({ row }) => row.original.assignedById ?? "-",
  },
  {
    accessorKey: "isActive",
    header: "فعال",
    cell: ({ row }) => (row.original.isActive ? "✅" : "❌"),
  },
  {
    accessorKey: "type",
    header: "نوع آدرس",
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ ایجاد",
    cell: ({ row }) =>
      `📅 ${new Date(row.original.createdAt).toLocaleDateString("fa-IR")}`,
  },
  {
    accessorKey: "updatedAt",
    header: "آخرین بروزرسانی",
    cell: ({ row }) =>
      `📅 ${new Date(row.original.updatedAt).toLocaleDateString("fa-IR")}`,
  },
];

export default function StoreLocationTable({
  data,
}: {
  data: ListStoreLocationsResponse;
}) {
  return (
    <CustomDataTable
      title="تخصیص آدرس فروشگاه‌ها"
      response={data}
      columns={columns}
      emptyMessage="هیچ تخصیصی یافت نشد"
      customButton={<div>Add Location</div>}
      filterColumnKey="nam"
    />
  );
}
