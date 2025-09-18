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
import dayjs from "dayjs";
import * as React from "react";
import { Skeleton } from "src/shadcn/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "src/shadcn/components/ui/table";

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

const columns: ColumnDef<MenuItemData>[] = [
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
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return <div>{dayjs(row.original.createdAt).format("YYYY-MM-DD")}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "customerEmail",
    header: "Customer email",
    cell: ({ row }) => {
      return <div>{row.original.customer?.email || ""}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "subscriptionId",
    header: "Subscription Id",
    cell: ({ row }) => {
      return <div>{row.original.subscriptionId}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => {
      return <div>{row.original.product?.name || ""}</div>;
    },
    enableHiding: false,
  },
];

function DraggableRow({ row }: { row: Row<Product> }) {
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
  const [data, setData] = React.useState<MenuItemData[]>([]);
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
    setData([
      {
        id: 1,
        name: "菜单管理",
        parentId: 0,
      },
    ]);
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
              .rows.map((row) => <DraggableRow key={row.id} row={row} />)
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
