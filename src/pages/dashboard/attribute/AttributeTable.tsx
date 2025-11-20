"use client";

import { CustomDataTable } from "@components/CustomDataTable";
import { Attribute } from "@lib/schemas/attribute";
import { useGetAttributes } from "@lib/services/attributes/attributes";
import { FilterAttribute } from "@lib/types/filter-generator";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import AttributeActions from "./AttributeAction";
import CreateAttribute from "./CreateAttribute";

export default function AttributeTable({
  initialQuery,
}: {
  initialQuery?: FilterAttribute;
}) {
  const searchParams = useSearchParams();

  const columns: ColumnDef<Partial<Attribute>>[] = [
    { accessorKey: "title", header: "نام ویژگی" },
    { accessorKey: "unit", header: "واحد ویژگی" },
    { accessorKey: "type", header: "نوع ویژگی" },
    { accessorKey: "iconUrl", header: "آیکون" },

    {
      accessorKey: "action",
      header: "",
      cell: ({ row }) => (
        <AttributeActions key={row.original.id} id={row.original.id!} />
      ),
    },
  ];

  const { data: attributes } = useGetAttributes({
    skip: initialQuery?.page || 0,
    limit: 10,
    title: searchParams?.get("title") ?? initialQuery?.title,
  });

  return (
    <CustomDataTable
      data={attributes?.data ?? []}
      columns={columns}
      filterColumnKey="title"
      filterPlaceholder="جستجو"
      emptyMessage="هیچ ویژگی پیدا نشد"
      customButton={<CreateAttribute />}
      filterConfigs={attributes?.filters}
    />
  );
}
