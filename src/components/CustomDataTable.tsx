"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import FilterGenerator from "./FilterGenerator";
import { cn } from "./lib/utils";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import { FilterSchemaInput } from "@lib/types/file-type";

type FilterConfig =
  | FilterSchemaInput[]
  | {
      service: string;
      label?: string | null;
      open: boolean;
      type: string;
      model?: string | null;
      field?: string | null;
      advanced?: boolean | null;
      enumOptions?: string | null;
    }[]
  | null;

interface CustomDataTableProps<TData> {
  title?: string;
  data?: TData[];
  columns: ColumnDef<TData>[];
  filterColumnKey?: string;
  filterPlaceholder?: string;
  emptyMessage?: string;
  customButton?: React.ReactNode;
  filterConfigs?: FilterConfig;
}

export function CustomDataTable<TData>({
  title,
  data,
  columns,
  filterColumnKey,
  filterPlaceholder = "Filter...",
  emptyMessage = "No results found.",
  customButton,
  filterConfigs,
}: CustomDataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<
    Record<string, boolean>
  >({});

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const table = useReactTable({
    data: data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const filterColumn = filterColumnKey
    ? table.getColumn(filterColumnKey)
    : null;

  return (
    <div className="w-full border border-gray-300 rounded-lg p-2">
      {title && (
        <h2 className="text-xs text-tint-blue-500 font-semibold my-1">
          {title}
        </h2>
      )}

      <div className="flex items-center justify-between gap-2 mb-2 rounded-lg p-2">
        <div className="flex items-stretch gap-2">
          {filterColumn && (
            <Input
              placeholder={filterPlaceholder}
              value={(filterColumn.getFilterValue() as string) ?? ""}
              onChange={(event) => {
                const value = event.target.value;
                filterColumn.setFilterValue(value);

                const params = new URLSearchParams(
                  searchParams ? Array.from(searchParams.entries()) : [],
                );

                if (value) params.set("search", value);
                else params.delete("search");

                router.replace(`${pathname}?${params.toString()}`);
              }}
              className="max-w-xs text-[0.75rem] font-medium placeholder:text-xs placeholder:font-medium border border-gray-300 rounded-lg"
            />
          )}

          {filterConfigs && (
            <FilterGenerator
              configs={filterConfigs as FilterSchemaInput[] | null | undefined}
            />
          )}
        </div>

        {customButton}
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-start">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {Array.isArray(data) && data.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="text-xs" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-12 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div
        id="pagination"
        className={cn("flex items-center justify-center my-2")}
      />
    </div>
  );
}
