"use client";
import { CustomDataTable } from "@components/CustomDataTable";
import { ListLocationsResponse, Location } from "@lib/schemas";
import { ColumnDef } from "@tanstack/react-table";
import CreateLocation from "./CreateLocation";
import LocationAction from "./LocationAction";

const columns: ColumnDef<Location>[] = [
  {
    accessorKey: "street",
    header: "خیابان",
  },
  {
    accessorKey: "streetNumber",
    header: "پلاک",
    cell: ({ row }) => row.original.streetNumber ?? "-",
  },
  {
    accessorKey: "postalCode",
    header: "کد پستی",
  },
  {
    accessorKey: "provinceId",
    header: "شناسه استان",
  },
  {
    accessorKey: "cityId",
    header: "شناسه شهر",
  },
  {
    accessorKey: "isActive",
    header: "فعال",
    cell: ({ row }) => (row.original.isActive ? "✅" : "❌"),
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
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => <LocationAction id={row.original.id} />,
  },
];

export default function LocationTable({
  data,
}: {
  data: ListLocationsResponse;
}) {
  return (
    <CustomDataTable
      title="آدرس فروشنده ها"
      columns={columns}
      response={data}
      filterColumnKey="street"
      filterPlaceholder="جستجو براساس نام خیابان"
      emptyMessage="آدرسی یافت نشد"
      customButton={<CreateLocation />}
    />
  );
}
