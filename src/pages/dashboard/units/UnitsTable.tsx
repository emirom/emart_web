"use client";
import { CustomDataTable } from "@components/CustomDataTable";
import { TablePagination } from "@components/TablePagination";
import { Button } from "@components/ui/button";
import { Unit } from "@lib/schemas";
import { useGetUnits } from "@lib/services/units/units";
import { useAppStore } from "@lib/stores/store";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

const columns: ColumnDef<Unit>[] = [
  { accessorKey: "id", header: "#" },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        style={{ paddingInline: 0 }}
        className=" m-0 p-0"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        عنوان واحد
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <>{row.getValue("title")}</>,
  },
];

export default function UnitsTable() {
  const { data: units } = useGetUnits({ skip: 0, limit: 10 });
  const { currentPage, previewPage, nextPage } = useAppStore();

  return (
    <>
      <CustomDataTable
        title="لیست واحدها"
        data={units?.data ?? []}
        columns={columns}
        filterColumnKey="title"
        filterPlaceholder="جستجو"
        emptyMessage="هیچ واحدی ای پیدا نشد"
      />
      <TablePagination
        currentPage={currentPage}
        previousPage={previewPage}
        nextPage={nextPage}
      />
    </>
  );
}
