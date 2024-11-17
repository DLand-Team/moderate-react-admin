import { useState, useCallback } from "react";

import type { TableProps } from "./types";

// ----------------------------------------------------------------------

type UseTableReturn = TableProps;

export type UseTableProps = {
    defaultDense?: boolean;
    defaultOrder?: "asc" | "desc";
    defaultOrderBy?: string;
    defaultSelected?: string[];
    defaultRowsPerPage?: number;
    defaultCurrentPage?: number;
};

export function useTable(props?: UseTableProps): UseTableReturn {
    const [dense, setDense] = useState(!!props?.defaultDense);

    const [page, setPage] = useState(props?.defaultCurrentPage || 0);

    const [orderBy, setOrderBy] = useState(props?.defaultOrderBy || "name");

    const [rowsPerPage, setRowsPerPage] = useState(
        props?.defaultRowsPerPage || 5
    );

    const [order, setOrder] = useState<"asc" | "desc">(
        props?.defaultOrder || "asc"
    );

    const [selected, setSelected] = useState<string[]>(
        props?.defaultSelected || []
    );

    const [editKey, setEditKey] = useState<string>("");

    const onSort = useCallback(
        (id: string) => {
            const isAsc = orderBy === id && order === "asc";
            if (id !== "") {
                setOrder(isAsc ? "desc" : "asc");
                setOrderBy(id);
            }
        },
        [order, orderBy]
    );

    const onSelectRow = useCallback(
        (inputValue: string) => {
            const newSelected = selected.includes(inputValue)
                ? selected.filter((value) => value !== inputValue)
                : [...selected, inputValue];

            setSelected(newSelected);
        },
        [selected]
    );

    const onChangeRowsPerPage = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setPage(0);
            setRowsPerPage(parseInt(event.target.value, 10));
        },
        []
    );

    const onChangeDense = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setDense(event.target.checked);
        },
        []
    );

    const onSelectAllRows = useCallback(
        (checked: boolean, inputValue: string[]) => {
            if (checked) {
                setSelected(inputValue);
                return;
            }
            setSelected([]);
        },
        []
    );

    const onChangePage = useCallback((event: unknown, newPage: number) => {
        setPage(newPage);
    }, []);

    const onResetPage = useCallback(() => {
        setPage(0);
    }, []);

    const onUpdatePageDeleteRow = useCallback(
        (totalRowsInPage: number) => {
            setSelected([]);
            if (page) {
                if (totalRowsInPage < 2) {
                    setPage(page - 1);
                }
            }
        },
        [page]
    );

    const onUpdatePageDeleteRows = useCallback(
        ({
            totalRowsInPage,
            totalRowsFiltered,
        }: {
            totalRowsInPage: number;
            totalRowsFiltered: number;
        }) => {
            const totalSelected = selected.length;

            setSelected([]);

            if (page) {
                if (totalSelected === totalRowsInPage) {
                    setPage(page - 1);
                } else if (totalSelected === totalRowsFiltered) {
                    setPage(0);
                } else if (totalSelected > totalRowsInPage) {
                    const newPage =
                        Math.ceil(
                            (totalRowsFiltered - totalSelected) / rowsPerPage
                        ) - 1;

                    setPage(newPage);
                }
            }
        },
        [page, rowsPerPage, selected.length]
    );

    return {
        editKey,
        dense,
        order,
        page,
        orderBy,
        rowsPerPage,
        //
        selected,
        onSelectRow,
        onSelectAllRows,
        //
        onSort,
        onChangePage,
        onChangeDense,
        onResetPage,
        onChangeRowsPerPage,
        onUpdatePageDeleteRow,
        onUpdatePageDeleteRows,
        //
        setPage,
        setDense,
        setOrder,
        setOrderBy,
        setSelected,
        setRowsPerPage,
        setEditKey,
    };
}
