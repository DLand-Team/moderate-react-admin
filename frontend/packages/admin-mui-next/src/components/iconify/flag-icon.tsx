import type { Theme, SxProps } from "@mui/material/styles";

import { forwardRef } from "react";

import Box from "@mui/material/Box";
import NoSsr from "@mui/material/NoSsr";

import { CONFIG } from "@/static/config";

// ----------------------------------------------------------------------

export type FlagIconProps = {
    code?: string;
    sx?: SxProps<Theme>;
};

export const FlagIcon = forwardRef<HTMLSpanElement, FlagIconProps>(
    ({ code, sx, ...other }, ref) => {
        const baseStyles = {
            width: 26,
            height: 20,
            flexShrink: 0,
            overflow: "hidden",
            borderRadius: "5px",
            display: "inline-flex",
            bgcolor: "background.neutral",
        };

        const renderFallback = (
            <Box component="span" sx={{ ...baseStyles, ...sx }} />
        );

        if (!code) {
            return null;
        }

        return (
            <NoSsr fallback={renderFallback}>
                <Box
                    ref={ref}
                    component="span"
                    sx={{ ...baseStyles, ...sx }}
                    {...other}>
                    <Box
                        component="img"
                        alt={code}
                        src={`${
                            CONFIG.site.basePath
                        }/assets/icons/flagpack/${code?.toLowerCase()}.webp`}
                        sx={{ width: 1, height: 1, objectFit: "cover" }}
                    />
                </Box>
            </NoSsr>
        );
    }
);
