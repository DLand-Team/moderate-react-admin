import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import type { SxProps, Theme } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { ColumnItem } from "./customTable";
import styles from "./style.module.scss";

// ----------------------------------------------------------------------

const visuallyHidden = {
    border: 0,
    margin: -1,
    padding: 0,
    width: "1px",
    height: "1px",
    overflow: "hidden",
    position: "absolute",
    whiteSpace: "nowrap",
    clip: "rect(0 0 0 0)",
} as const;

// ----------------------------------------------------------------------

export type TableHeadCustomProps<T> = {
    orderBy?: string;
    rowCount?: number;
    sx?: SxProps<Theme>;
    numSelected?: number;
    order?: "asc" | "desc";
    onSort?: (id: string) => void;
    columns: ColumnItem<T>[];
    onSelectAllRows?: (checked: boolean) => void;
    isScroll?: boolean;
};

export function TableHeadCustom<T>({
    sx,
    order,
    onSort,
    orderBy,
    columns,
    rowCount = 0,
    numSelected = 0,
    onSelectAllRows,
    isScroll,
}: TableHeadCustomProps<T>) {
    return (
        <TableHead sx={sx}>
            <TableRow>
                {onSelectAllRows && (
                    <TableCell
                        sx={{
                            position: "sticky",
                            left: 0,
                            zIndex: 1,
                        }}
                        padding="checkbox">
                        <Checkbox
                            indeterminate={
                                !!numSelected && numSelected < rowCount
                            }
                            checked={!!rowCount && numSelected === rowCount}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => onSelectAllRows(event.target.checked)}
                            inputProps={{
                                name: "select-all-rows",
                                "aria-label": "select all rows",
                            }}
                        />
                    </TableCell>
                )}

                {columns.map((headCell, index) => {
                    const { dataIndex, align, title, fixed, _isEdge, _offect } =
                        headCell;
                    let sxData = {};
                    if (fixed == "left") {
                        sxData = {
                            position: "sticky",
                            left: _offect,
                            zIndex: 1,
                        };
                    } else if (fixed == "right") {
                        sxData = {
                            position: "sticky",
                            right: _offect,
                            zIndex: 1,
                        };
                    }
                    return (
                        <TableCell
                            className={
                                isScroll && _isEdge
                                    ? fixed == "left"
                                        ? styles.left
                                        : styles.right
                                    : ""
                            }
                            key={(dataIndex as string) || index}
                            align={align || "left"}
                            sortDirection={
                                orderBy === dataIndex ? order : false
                            }
                            sx={{
                                width: headCell.width,
                                maxWidth: headCell.width,
                                overflow: "hidden",
                                ...(fixed ? sxData : {}),
                            }}>
                            {onSort ? (
                                <TableSortLabel
                                    hideSortIcon
                                    active={orderBy === dataIndex}
                                    direction={
                                        orderBy === dataIndex ? order : "asc"
                                    }
                                    onClick={() =>
                                        onSort((dataIndex as string) || "")
                                    }>
                                    {title}
                                    {orderBy === dataIndex ? (
                                        <Box sx={{ ...visuallyHidden }}>
                                            {order === "desc"
                                                ? "sorted descending"
                                                : "sorted ascending"}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            ) : (
                                title
                            )}
                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    );
}
