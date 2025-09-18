"use client";

import { Iconify } from "@/src/components/iconify";
import { Button } from "@/src/shadcn/components/ui/button";
import { Label } from "@/src/shadcn/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shadcn/components/ui/select";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";
import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "src/shadcn/components/ui/table";
import { Checkbox } from "../../app/dashboard/sys/menu/components/checkBox";

export function IndeterminateCheckbox3({
  indeterminate,
  className = "",
  ...rest
}: {
  indeterminate?: boolean;
  halfChecked?: boolean;
} & React.HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <Checkbox
      ref={ref as any}
      checked={rest.checked}
      onClick={rest.onChange as any}
      halfChecked={rest.halfChecked}
    />
  );
}
export function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: {
  indeterminate?: boolean;
  halfChecked?: boolean;
} & React.HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <Checkbox
      ref={ref as any}
      checked={rest.checked}
      onClick={rest.onChange as any}
      halfChecked={rest.halfChecked}
    />
  );
}

function RowItem<T>({ row }: { row: Row<T> }) {
  return (
    <>
      <TableRow
        data-state={row.getIsSelected() && "selected"}
        className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
      {row.getIsExpanded() && (
        <tr>
          <td colSpan={row.getAllCells().length}>
            <div
              style={{
                display: "flex",
              }}
            >
              <div
                style={{
                  width: "80px",
                }}
              ></div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export function TableEazy<T extends { children: T[] }>({
  columns,
  data,
  isShowSelection,
  isShowExpand,
}: {
  columns: ColumnDef<T>[];
  data?: T[];
  isShowSelection?: boolean;
  isShowExpand?: boolean;
}) {
  if (isShowSelection || isShowExpand) {
    columns.unshift({
      id: "expand",
      header: ({ table }) => (
        <div className="flex items-center gap-2">
          {isShowSelection && (
            <IndeterminateCheckbox
              {...{
                checked:
                  table.getIsAllRowsSelected() || table.getIsSomeRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
                halfChecked: table.getIsSomeRowsSelected(),
              }}
            />
          )}
          {isShowExpand && (
            <Iconify
              onClick={table.getToggleAllRowsExpandedHandler()}
              icon={
                table.getIsAllRowsExpanded()
                  ? "ic:baseline-minus"
                  : "ic:baseline-plus"
              }
            />
          )}
        </div>
      ),
      cell: ({ row, getValue }) => (
        <div
          style={{
            paddingLeft: `${row.depth * 2}rem`,
          }}
        >
          <div className="flex items-center gap-2">
            <IndeterminateCheckbox
              {...{
                checked:
                  row.getIsSelected() ||
                  row.getIsAllSubRowsSelected() ||
                  row.getIsSomeSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
                halfChecked: row.getIsSomeSelected(),
              }}
            />
            {row.getCanExpand() ? (
              <Iconify
                onClick={row.getToggleExpandedHandler()}
                icon={
                  row.getIsExpanded()
                    ? "ic:round-keyboard-arrow-down"
                    : "ic:round-keyboard-arrow-right"
                }
              />
            ) : (
              ""
            )}
            {getValue<boolean>()}
          </div>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    });
  }
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const table = useReactTable<T>({
    data: data || [],
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.children,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    paginateExpandedRows: false,
    debugTable: true,
  });

  return (
    <div
      style={{
        width: "100%",
        overflow: "auto",
      }}
    >
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="**:data-[slot=table-cell]:first:w-8">
            {data?.length !== 0 ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <RowItem<T> key={row.id} row={row} />
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div
        className="flex items-center justify-between px-4"
        style={{
          marginTop: "10px",
        }}
      >
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex"></div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <IconChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <IconChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <IconChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <IconChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
