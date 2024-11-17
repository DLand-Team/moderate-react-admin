import type { Theme, SxProps } from "@mui/material/styles";
import type { TablePaginationProps } from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import TablePagination from "@mui/material/TablePagination";
import FormControlLabel from "@mui/material/FormControlLabel";

// ----------------------------------------------------------------------

export type TablePaginationCustomProps = TablePaginationProps & {
    dense?: boolean;
    sx?: SxProps<Theme>;
    onChangeDense?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function TablePaginationCustom({
    sx,
    dense,
    onChangeDense,
    rowsPerPageOptions = [5, 10, 25],
    ...other
}: TablePaginationCustomProps) {
    return (
        <Box sx={{ position: "relative", ...sx }}>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                {...other}
                sx={{ borderTopColor: "transparent" }}
            />
        </Box>
    );
}
