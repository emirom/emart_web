"use client";

import { CustomDataTable } from "@components/CustomDataTable";
import { Unit } from "@lib/schemas";
import { useGetUnits } from "@lib/services/units/units";
import { UnitFilter } from "@lib/types/filter-generator";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import CreateUnit from "./CreateUnitForm";
import UnitsActions from "./UnitsActions";

export default function UnitsTable({
  initialQuery,
}: {
  initialQuery?: UnitFilter;
}) {
  const searchParams = useSearchParams();

  const columns: ColumnDef<Unit>[] = [
    { accessorKey: "title", header: "نام‌کمیت" },
    {
      accessorKey: "action",
      header: "",
      cell: ({ row }) => <UnitsActions key={row.id} id={row.original.id} />,
    },
  ];

  const { data: units } = useGetUnits({
    skip: initialQuery?.page ?? 0,
    limit: 10,
    title: searchParams?.get("title") ?? initialQuery?.title,
  });

  return (
    <CustomDataTable
      data={units?.data ?? []}
      columns={columns}
      filterColumnKey="title"
      filterPlaceholder="جستجو"
      emptyMessage="هیچ واحدی پیدا نشد"
      customButton={<CreateUnit />}
      filterConfigs={units?.filters}
    />
  );
}
