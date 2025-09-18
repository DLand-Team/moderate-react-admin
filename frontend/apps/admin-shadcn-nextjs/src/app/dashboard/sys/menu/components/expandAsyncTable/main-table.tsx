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
  ColumnFiltersState,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
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
import { DataTable2 } from "./sub-table";

const columns: ColumnDef<Subscription>[] = [
  {
    id: "expand",
    header: ({ table }) => (
      <div className="flex items-center justify-center"></div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Iconify
          onClick={row.getToggleExpandedHandler()}
          icon={
            row.getIsExpanded()
              ? "ic:round-keyboard-arrow-down"
              : "ic:round-keyboard-arrow-right"
          }
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header(props) {
      return <div>Id</div>;
    },
    cell: ({ row }) => {
      return <div>{row.original.id}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "customerName",
    header: "Customer name",
    cell: ({ row }) => {
      return <div>{row.original.customer?.firstName || ""}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "totalDealValue",
    header: "Total deal value",
    cell: ({ row }) => {
      return <div>{row.original.totalDealValue}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "totalRevenueInCents",
    header: "Total amount received",
    cell: ({ row }) => {
      return <div>{row.original.totalRevenue}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "productName",
    header: "Product name",
    cell: ({ row }) => {
      return <div>{row.original.product?.name || ""}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "productId",
    header: "Payments remains",
    cell: ({ row }) => {
      const value = Number(
        row.original.totalDealValueInCents - row.original.totalRevenueInCents,
      );
      return <div>{Number.isNaN(value) ? 0 : value}</div>;
    },
    enableHiding: false,
  },
];

function DraggableRow({ row }: { row: Row<Subscription> }) {
  return (
    <>
      <TableRow
        data-state={row.getIsSelected() && "selected"}
        className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      >
        {row.getVisibleCells().map((cell) => (
          <>
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          </>
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
                className="bg-muted"
                style={{
                  width: "80px",
                }}
              ></div>
              <DataTable2 subscriptionId={row.original.id} />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export function MainTable({ customSubHeader, async }) {
  const [totalCount, setTotalCount] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 20,
  });

  React.useEffect(() => {
    // currentCustomerId &&
    //   emit("subscriptionStore")
    //     .querySubscriptionComplexAct({
    //       customerReferenceId: currentCustomerId,
    //       pageSize: pagination.pageSize,
    //       page: pagination.pageIndex + 1,
    //     })
    //     .then(({ payload }) => {
    //       setData(payload.data);
    //       setTotalCount(payload.pagination.total);
    //     });
    setData([
      {
        id: 1,
        customerName: "测试用户",
        totalDealValue: 1000,
        totalRevenue: 200,
        productName: "测试产品",
        productId: 123,
      },
    ]);
    // setTotalCount(payload.pagination.total);
  }, [pagination]);

  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
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
                  <DraggableRow key={row.id} row={row} />
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
