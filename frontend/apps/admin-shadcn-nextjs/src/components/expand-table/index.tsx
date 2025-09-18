"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
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

import { Skeleton } from "@/src/shadcn/components/ui/skeleton";
import dayjs from "dayjs";

export function SkeletonDemo() {
  return (
    <div
      className="flex items-center w-[100%] space-x-4"
      style={{
        margin: "20px 0px",
      }}
    >
      <div className="space-y-2 w-[100%]">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>
    </div>
  );
}

const columns: ColumnDef<Product>[] = [
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
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      return <div>{row.original.amount}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "currentPeriodStartedAt",
    header: "Current Period Started At",
    cell: ({ row }) => {
      return (
        <div>{dayjs(row.original.startedAt).format("YYYY-MM-DD HH:mm:ss")}</div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "currentPeriodEndsAt",
    header: "Current Period Ends At",
    cell: ({ row }) => {
      return (
        <div>{dayjs(row.original.endedAt).format("YYYY-MM-DD HH:mm:ss")}</div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "invoiceId",
    header: "Maxios invoiceId",
    cell: ({ row }) => {
      return <div>{row.original.invoiceId}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "timestamp",
    header: "Paid at",
    cell: ({ row }) => {
      return (
        <div>{dayjs(row.original.paiedAt).format("YYYY-MM-DD HH:mm:ss")}</div>
      );
    },
    enableHiding: false,
  },
];

function RowItem({ row }: { row: Row<Product> }) {
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
    </>
  );
}

export function DataTable2({ subscriptionId }: { subscriptionId: any }) {
  const [isLoding, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<Payment[]>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  React.useEffect(() => {
    setIsLoading(true);
    setData([]);
    setIsLoading(false);
  }, [subscriptionId]);

  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
      expanded,
    },
    // getSubRows: (row) => row.subRows,
    onExpandedChange: setExpanded,
    manualPagination: true,
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  return (
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
        <>
          {isLoding ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <SkeletonDemo />
                <SkeletonDemo />
                <SkeletonDemo />
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows.length ? (
            table
              .getRowModel()
              .rows.map((row) => <RowItem key={row.id} row={row} />)
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </>
      </TableBody>
    </Table>
  );
}
