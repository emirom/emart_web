"use client";

import { CustomDataTable } from "@components/CustomDataTable";
import { Attribute } from "@lib/schemas/attribute";
import { useGetAttributes } from "@lib/services/attributes/attributes";
import { AttributeFilter } from "@lib/types/filter-generator";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { queryClient } from "@lib/apis/queryClient";
import AttributeActions from "./AttributeAction";
import CreateAttribute from "./CreateAttribute";

export default function AttributeTable({
  initialQuery,
}: {
  initialQuery?: AttributeFilter;
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

  const { data: attributes, refetch } = useGetAttributes({
    skip: initialQuery?.page || 0,
    limit: 10,
    title: searchParams?.get("title") ?? initialQuery?.title,
  });

  // Refetch data after component mounts to ensure fresh data after potential mutations
  useEffect(() => {
    const timer = setTimeout(() => {
      refetch();
    }, 100); // Small delay to allow hydration to complete

    return () => clearTimeout(timer);
  }, [refetch]);

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
