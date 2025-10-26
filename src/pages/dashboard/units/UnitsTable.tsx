"use client";

import { CustomDataTable } from "@components/CustomDataTable";
import { Unit } from "@lib/schemas";
import { useGetUnits } from "@lib/services/units/units";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";

const columns: ColumnDef<Unit>[] = [
  { accessorKey: "id", header: "#" },
  { accessorKey: "title", header: "نام‌کمیت" },
];

export default function UnitsTable({
  serverPage = 0,
  serverSearch,
}: {
  serverPage?: number;
  serverSearch?: string;
}) {
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get("page") ?? serverPage);
  const title = searchParams?.get("search") ?? serverSearch;

  const { data: units } = useGetUnits({ skip: page * 10, limit: 10, title });

  return (
    <CustomDataTable
      title="لیست واحدها"
      data={units?.data ?? []}
      columns={columns}
      filterColumnKey="title"
      filterPlaceholder="جستجو"
      emptyMessage="هیچ واحدی پیدا نشد"
    />
  );
}
