// ----------------------------------------------------------------------

export type TableProps = {
    editKey: string;
    dense: boolean;
    page: number;
    rowsPerPage: number;
    order: "asc" | "desc";
    orderBy: string;
    //
    selected: string[];
    onSelectRow: (id: string) => void;
    onSelectAllRows: (checked: boolean, newSelecteds: string[]) => void;
    //
    onResetPage: () => void;
    onSort: (id: string) => void;
    onChangePage: (event: unknown, newPage: number) => void;
    onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeDense: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onUpdatePageDeleteRow: (totalRowsInPage: number) => void;
    onUpdatePageDeleteRows: ({
        totalRowsInPage,
        totalRowsFiltered,
    }: {
        totalRowsInPage: number;
        totalRowsFiltered: number;
    }) => void;
    //
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setDense: React.Dispatch<React.SetStateAction<boolean>>;
    setOrder: React.Dispatch<React.SetStateAction<"desc" | "asc">>;
    setOrderBy: React.Dispatch<React.SetStateAction<string>>;
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
    setEditKey: React.Dispatch<React.SetStateAction<string>>;
};
