import { Box, BoxProps } from "@mui/material";
import { useCss } from "../useCss";
export interface NavLiProps extends BoxProps {
    disabled?: boolean;
}
export function NavLi({ sx, children, disabled, ...other }: NavLiProps) {
    const { classNameObj } = useCss();

    return (
        <Box
            component="li"
            className={classNameObj.li}
            sx={{
                display: "flex",
                flexDirection: "column",
                ...(disabled && { cursor: "not-allowed" }),
                ...sx,
            }}
            {...other}>
            {children}
        </Box>
    );
}
