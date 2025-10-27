"use client";

import { CustomDataTable } from "@components/CustomDataTable";
import { Label } from "@lib/schemas";
import { useGetLabels } from "@lib/services/labels/labels";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import CreateLabel from "./CreateLabel";
import LabelAction from "./LabelAction";

type InitialQuery = {
  page?: number;
  name?: string;
};
// TODO: Use This Style for tables
const columns: ColumnDef<Label>[] = [
  {
    accessorKey: "name",
    header: "نام برچسب",
    cell: ({ row }) => (
      <div className="font-medium text-gray-800">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "pageId",
    header: "شناسه صفحه",
    cell: ({ row }) => (
      <div className="text-gray-600">
        {row.original.pageId ? row.original.pageId : "-"}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ ایجاد",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <div className="text-gray-500 text-sm">
          {date.toLocaleDateString("fa-IR")}{" "}
          <span className="text-xs text-gray-400">
            {date.toLocaleTimeString("fa-IR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "آخرین بروزرسانی",
    cell: ({ row }) => {
      const date = new Date(row.original.updatedAt);
      return (
        <div className="text-gray-500 text-sm">
          {date.toLocaleDateString("fa-IR")}{" "}
          <span className="text-xs text-gray-400">
            {date.toLocaleTimeString("fa-IR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => <LabelAction key={row.id} id={row.original.id} />,
  },
];

export default function LabelTable({
  initialQuery,
}: {
  initialQuery?: InitialQuery;
}) {
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get("page") ?? initialQuery?.page ?? 0);
  const name = searchParams?.get("search") ?? initialQuery?.name;
  const { data: labels } = useGetLabels({ skip: page * 10, limit: 10, name });

  return (
    <CustomDataTable
      data={labels?.data ?? []}
      columns={columns}
      filterColumnKey="name"
      customButton={<CreateLabel />}
      emptyMessage="برچسبی یافت نشد"
      filterPlaceholder="جستجو"
      title="برچسب‌ها"
    />
  );
}
