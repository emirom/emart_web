"use client";

import { CustomDataTable } from "@components/CustomDataTable";
import { Attribute } from "@lib/schemas/attribute";
import { useGetAttributes } from "@lib/services/attributes/attributes";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import AttributeActions from "./AttributeAction";
import CreateAttribute from "./CreateAttribute";

type InitialQuery = {
  page?: number;
  title?: string;
};

export default function AttributeTable({
  initialQuery,
}: {
  initialQuery?: InitialQuery;
}) {
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get("page") ? initialQuery?.page : 0);
  const title = searchParams?.get("search") ?? initialQuery?.title;

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
    skip: page * 10,
    limit: 10,
    title,
  });

  return (
    <CustomDataTable
      data={attributes?.data ?? []}
      columns={columns}
      filterColumnKey="title"
      filterPlaceholder="جستجو"
      emptyMessage="هیچ ویژگی پیدا نشد"
      customButton={<CreateAttribute />}
    />
  );
}
