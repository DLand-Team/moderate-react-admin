import type { StackProps } from "@mui/material/Stack";

import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// ----------------------------------------------------------------------

export type TableSelectedActionProps = StackProps & {
    dense?: boolean;
    rowCount: number;
    numSelected: number;
    action?: React.ReactNode;
    onSelectAllRows: (checked: boolean) => void;
    isScroll?: boolean;
};

export function TableSelectedAction({
    dense,
    action,
    rowCount,
    numSelected,
    onSelectAllRows,
    isScroll,
    sx,
    ...other
}: TableSelectedActionProps) {
    if (!numSelected) {
        return null;
    }

    return (
        <Stack
            direction="row"
            alignItems="center"
            sx={{
                pl: 1,
                pr: 2,
                top: 0,
                left: 0,
                width: 1,
                zIndex: 9,
                height: 58,
                position: "absolute",
                bgcolor: "primary.lighter",
                ...(dense && { height: 38 }),
                ...sx,
            }}
            {...other}>
            <Checkbox
                indeterminate={!!numSelected && numSelected < rowCount}
                checked={!!rowCount && numSelected === rowCount}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    onSelectAllRows(event.target.checked)
                }
            />

            <Typography
                variant="subtitle2"
                sx={{
                    ml: 2,
                    flexGrow: 1,
                    color: "primary.main",
                    ...(dense && { ml: 3 }),
                }}>
                {numSelected} selected
            </Typography>

            {action && action}
        </Stack>
    );
}
