"use client";

import { CustomDataTable } from "@components/CustomDataTable";
import { Color } from "@lib/schemas";
import { useGetColors } from "@lib/services/colors/colors";
import { ColorFilter } from "@lib/types/filter-generator";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import ColorsAction from "./ColorAction";
import CreateColor from "./CreateColor";

export default function ColorTable({
  initialQuery,
}: {
  initialQuery?: ColorFilter;
}) {
  const searchParams = useSearchParams();

  const { data: colors } = useGetColors({
    skip: initialQuery?.page ?? 0,
    limit: 10,
    name: searchParams?.get("name") ?? initialQuery?.name,
    enName: searchParams?.get("enName") ?? initialQuery?.enName,
    displayName: searchParams?.get("displayName") ?? initialQuery?.displayName,
    hex: searchParams?.get("hex") ?? initialQuery?.hex,
  });

  const columns: ColumnDef<Color>[] = [
    {
      accessorKey: "name",
      header: "نام رنگ",
      cell: ({ getValue }) => String(getValue() ?? ""),
    },
    {
      accessorKey: "enName",
      header: "نام انگلیسی",
      cell: ({ getValue }) => String(getValue() ?? "-"),
    },
    {
      accessorKey: "displayName",
      header: "نام نمایش",
      cell: ({ getValue }) => String(getValue() ?? "-"),
    },
    {
      accessorKey: "hex",
      header: "رنگ",
      cell: ({ getValue }) => (
        <div
          title={String(getValue())}
          className="w-[1.125rem] mx-auto h-[1.125rem] rounded-xs border border-gray-300"
          style={{ background: String(getValue()) }}
        />
      ),
    },
    { id: "hexCode", accessorKey: "hex", header: "کد رنگ" },
    {
      accessorKey: "isActive",
      header: "فعال",
      cell: ({ getValue }) => (getValue() ? "فعال" : "غیرفعال"),
    },
    {
      accessorKey: "createdAt",
      header: "تاریخ ایجاد",
      cell: ({ getValue }) =>
        new Date(String(getValue())).toLocaleString("fa-IR"),
    },
    {
      id: "action",
      accessorKey: "id",
      header: "",
      cell: ({ row }) => (
        <ColorsAction key={row.original.id} id={row.original.id} />
      ),
    },
  ];

  return (
    <CustomDataTable
      title="رنگ‌ها"
      data={colors?.data ?? []}
      columns={columns}
      emptyMessage="رنگ مورد نظر یافت نشد"
      filterColumnKey="name"
      filterPlaceholder="جستجو رنگ"
      customButton={<CreateColor />}
      filterConfigs={colors?.filters}
    />
  );
}
