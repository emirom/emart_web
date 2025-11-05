"use client";

import { CustomDataTable } from "@components/CustomDataTable";
import { Unit } from "@lib/schemas";
import { useGetUnits } from "@lib/services/units/units";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import CreateUnit from "./CreateUnit";
import UnitsActions from "./UnitsActions";

type InitialQuery = {
  page?: number;
  title?: string;
};

export default function UnitsTable({
  initialQuery,
}: {
  initialQuery?: InitialQuery;
}) {
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get("page") ? initialQuery?.page : 0);
  const title = searchParams?.get("search") ?? initialQuery?.title;

  const columns: ColumnDef<Unit>[] = [
    { accessorKey: "title", header: "نام‌کمیت" },
    {
      accessorKey: "action",
      header: "",
      cell: ({ row }) => <UnitsActions key={row.id} id={row.original.id} />,
    },
  ];

  const { data: units } = useGetUnits({ skip: page * 10, limit: 10, title });

  return (
    <CustomDataTable
      data={units?.data ?? []}
      columns={columns}
      filterColumnKey="title"
      filterPlaceholder="جستجو"
      emptyMessage="هیچ واحدی پیدا نشد"
      customButton={<CreateUnit />}
    />
  );
}
