import type { Theme, SxProps } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { EmptyContent } from "../emptyContent";

// ----------------------------------------------------------------------

export type TableNoDataProps = {
    notFound: boolean;
    sx?: SxProps<Theme>;
};

export function TableNoData({ notFound, sx }: TableNoDataProps) {
    return (
        <TableRow>
            {notFound ? (
                <TableCell colSpan={12}>
                    <EmptyContent filled sx={{ py: 10, ...sx }} />
                </TableCell>
            ) : (
                <TableCell colSpan={12} sx={{ p: 0 }} />
            )}
        </TableRow>
    );
}
