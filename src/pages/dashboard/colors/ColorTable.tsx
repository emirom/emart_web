"use client";

import { CustomDataTable } from "@components/CustomDataTable";
import { Color } from "@lib/schemas";
import { useGetColors } from "@lib/services/colors/colors";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import ColorsAction from "./ColorAction";
import CreateColor from "./CreateColor";

type InitialQuery = {
  page?: number;
  name?: string;
};

export default function ColorTable({
  initialQuery,
}: {
  initialQuery?: InitialQuery;
}) {
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get("page") ?? initialQuery?.page ?? 0);
  const name = searchParams?.get("search") ?? initialQuery?.name ?? "";

  const { data: colors } = useGetColors({
    skip: page * 4,
    limit: 4,
    name,
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
    />
  );
}
