import { Box, BoxProps } from "@mui/material";
import { useCss } from "../useCss";

export function NavUl({ children, sx, ...other }: BoxProps) {
    const { classNameObj } = useCss();

    return (
        <Box
            component="ul"
            className={classNameObj.ul}
            sx={{
                display: "flex",
                flexDirection: "column",
                ...sx,
            }}
            {...other}>
            {children}
        </Box>
    );
}
