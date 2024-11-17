import type { ChipProps } from "@mui/material/Chip";
import type { Theme, SxProps } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

export const chipProps: ChipProps = {
    size: "small",
    variant: "outlined",
};

type FiltersResultProps = {
    totalResults: number;
    onReset: () => void;
    sx?: SxProps<Theme>;
    children: React.ReactNode;
};

export function FiltersResult({
    totalResults,
    onReset,
    sx,
    children,
}: FiltersResultProps) {
    return (
        <Box sx={sx}>
            <Box sx={{ mb: 1.5, typography: "body2" }}>
                <strong>{totalResults}</strong>
                <Box
                    component="span"
                    sx={{ color: "text.secondary", ml: 0.25 }}>
                    results found
                </Box>
            </Box>

            <Box
                flexGrow={1}
                gap={1}
                display="flex"
                flexWrap="wrap"
                alignItems="center">
                {children}

                <Button
                    color="error"
                    onClick={onReset}
                    startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}>
                    Clear
                </Button>
            </Box>
        </Box>
    );
}
