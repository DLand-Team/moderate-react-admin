"use client";
import { _orders, ORDER_STATUS_OPTIONS } from "@/_mock";
import { useBoolean, useFields } from "@/common/hooks";
import { useSetState } from "@/common/hooks/useSetState";
import {
    getComparator,
    judeIsAfter,
    judeIsBetween,
    rowInPage,
    varAlpha,
} from "@/common/utils";
import { ConfirmDialog } from "@/components";
import { Label } from "@/components/label";
import { toast } from "@/components/snackbar";
import { TablePaginationCustom, useTable } from "@/components/table";
import { ColumnItem, CustomTable } from "@/components/table/customTable";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { OrderTableFiltersResult } from "../components/order-table-filters-result";
import { OrderTableToolbar } from "../components/order-table-toolbar";
import { IOrderItem, IOrderTableFilters } from "../types";

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
    { value: "all", label: "All" },
    ...ORDER_STATUS_OPTIONS,
];

const columns: ColumnItem<DataType>[] = [
    { dataIndex: "address", title: "address", width: 188, fixed: "left" },
    { dataIndex: "age", title: "age", width: 240, fixed: "left" },
    { dataIndex: "id", title: "id", width: 100 },
    { dataIndex: "city", title: "city", width: 100 },
    {
        dataIndex: "name",
        title: "name",
        width: 300,
        fixed: "right",
    },
    {
        width: 88,
        title: "Action",
        fixed: "right",
        renderEdit({ api }) {
            return (
                <Button
                    onClick={() => {
                        api.setEditKey("");
                    }}>
                    ok
                </Button>
            );
        },
        render({ record, api }) {
            return (
                <Button
                    onClick={() => {
                        api.setEditKey(record.id);
                    }}>
                    Edit
                </Button>
            );
        },
    },
];

// ----------------------------------------------------------------------
interface DataType {
    id: string;
    key: React.Key;
    name: string;
    age: number;
    address: string;
    city: string;
}

export function ListView() {
    const table = useTable({ defaultOrderBy: "orderNumber" });

    const router = useRouter();

    const confirm = useBoolean();

    const [tableData, setTableData] = useState<IOrderItem[]>([]);

    const filters = useSetState<IOrderTableFilters>({
        name: "",
        status: "all",
        startDate: null,
        endDate: null,
    });

    const dateError = judeIsAfter(
        filters.state.startDate,
        filters.state.endDate
    );

    const dataFiltered = applyFilter({
        inputData: tableData,
        comparator: getComparator(table.order, table.orderBy),
        filters: filters.state,
        dateError,
    });

    const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

    const canReset =
        !!filters.state.name ||
        filters.state.status !== "all" ||
        (!!filters.state.startDate && !!filters.state.endDate);

    const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

    const handleDeleteRow = useCallback(
        (id: string) => {
            const deleteRow = tableData.filter((row) => row.id !== id);

            toast.success("Delete success!");

            setTableData(deleteRow);

            table.onUpdatePageDeleteRow(dataInPage.length);
        },
        [dataInPage.length, table, tableData]
    );

    const handleDeleteRows = useCallback(() => {
        const deleteRows = tableData.filter(
            (row) => !table.selected.includes(row.id)
        );

        toast.success("Delete success!");

        setTableData(deleteRows);

        table.onUpdatePageDeleteRows({
            totalRowsInPage: dataInPage.length,
            totalRowsFiltered: dataFiltered.length,
        });
    }, [dataFiltered.length, dataInPage.length, table, tableData]);

    const handleViewRow = useCallback((id: string) => {}, [router]);

    const handleFilterStatus = useCallback(
        (event: React.SyntheticEvent, newValue: string) => {
            table.onResetPage();
            filters.setState({ status: newValue });
        },
        [filters, table]
    );

    return (
        <>
            <Card
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                <Tabs
                    value={filters.state.status}
                    onChange={handleFilterStatus}
                    sx={{
                        px: 2.5,
                        boxShadow: (theme) =>
                            `inset 0 -2px 0 0 ${varAlpha(
                                theme.vars.palette.grey["500Channel"],
                                0.08
                            )}`,
                    }}>
                    {STATUS_OPTIONS.map((tab) => (
                        <Tab
                            key={tab.value}
                            iconPosition="end"
                            value={tab.value}
                            label={tab.label}
                            icon={
                                <Label
                                    variant={
                                        ((tab.value === "all" ||
                                            tab.value ===
                                                filters.state.status) &&
                                            "filled") ||
                                        "soft"
                                    }
                                    color={
                                        (tab.value === "completed" &&
                                            "success") ||
                                        (tab.value === "pending" &&
                                            "warning") ||
                                        (tab.value === "cancelled" &&
                                            "error") ||
                                        "default"
                                    }>
                                    {[
                                        "completed",
                                        "pending",
                                        "cancelled",
                                        "refunded",
                                    ].includes(tab.value)
                                        ? tableData.filter(
                                              (user) =>
                                                  user.status === tab.value
                                          ).length
                                        : tableData.length}
                                </Label>
                            }
                        />
                    ))}
                </Tabs>

                <OrderTableToolbar
                    filters={filters}
                    onResetPage={table.onResetPage}
                    dateError={dateError}
                />

                {canReset && (
                    <OrderTableFiltersResult
                        filters={filters}
                        totalResults={dataFiltered.length}
                        onResetPage={table.onResetPage}
                        sx={{ p: 2.5, pt: 0 }}
                    />
                )}

                <CustomTable<DataType>
                    columns={columns}
                    dataSource={Array.from(new Array(116)).map((_, index) => {
                        return {
                            city: "123123123",
                            id: index.toString(),
                            key: index,
                            name: "string123123123123123123123string123123123123123123123string123123123123123123123string123123123123123123123string123123123123123123123",
                            age: 1,
                            address:
                                "string123123123123123123123string123123123123123123123string123123123123123123123string123123123123123123123string123123123123123123123",
                        };
                    })}
                    scroll={{
                        width: 5000,
                    }}
                    variant="edit_row"
                />

                <TablePaginationCustom
                    page={table.page}
                    dense={table.dense}
                    count={dataFiltered.length}
                    rowsPerPage={table.rowsPerPage}
                    onPageChange={table.onChangePage}
                    onChangeDense={table.onChangeDense}
                    onRowsPerPageChange={table.onChangeRowsPerPage}
                />
            </Card>
            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title="Delete"
                content={
                    <>
                        Are you sure want to delete{" "}
                        <strong> {table.selected.length} </strong> items?
                    </>
                }
                action={
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            handleDeleteRows();
                            confirm.onFalse();
                        }}>
                        Delete
                    </Button>
                }
            />
        </>
    );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
    dateError: boolean;
    inputData: IOrderItem[];
    filters: IOrderTableFilters;
    comparator: (a: any, b: any) => number;
};

function applyFilter({
    inputData,
    comparator,
    filters,
    dateError,
}: ApplyFilterProps) {
    const { status, name, startDate, endDate } = filters;

    const stabilizedThis = inputData.map((el, index) => [el, index] as const);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    inputData = stabilizedThis.map((el) => el[0]);

    if (name) {
        inputData = inputData.filter(
            (order) =>
                order.orderNumber.toLowerCase().indexOf(name.toLowerCase()) !==
                    -1 ||
                order.customer.name
                    .toLowerCase()
                    .indexOf(name.toLowerCase()) !== -1 ||
                order.customer.email
                    .toLowerCase()
                    .indexOf(name.toLowerCase()) !== -1
        );
    }

    if (status !== "all") {
        inputData = inputData.filter((order) => order.status === status);
    }

    if (!dateError) {
        if (startDate && endDate) {
            inputData = inputData.filter((order) =>
                judeIsBetween(order.createdAt, startDate, endDate)
            );
        }
    }

    return inputData;
}
