"use client";

import { forwardRef } from "react";
import { Icon, disableCache } from "@iconify/react";
import Box from "@mui/material/Box";
import NoSsr from "@mui/material/NoSsr";
import { iconifyClasses } from "./classes";
import type { IconifyProps } from "./types";

// ----------------------------------------------------------------------

export const Iconify = forwardRef<SVGElement, IconifyProps>(
    ({ className, width = 20, sx, ...other }, ref) => {
        const baseStyles = {
            width,
            height: width,
            flexShrink: 0,
            display: "inline-flex",
        };

        const renderFallback = (
            <Box
                component="span"
                className={iconifyClasses.root.concat(
                    className ? ` ${className}` : ""
                )}
                sx={{ ...baseStyles, ...sx }}
            />
        );

        return (
            <NoSsr fallback={renderFallback}>
                <Box
                    ref={ref}
                    component={Icon}
                    className={iconifyClasses.root.concat(
                        className ? ` ${className}` : ""
                    )}
                    sx={{ ...baseStyles, ...sx }}
                    {...other}
                />
            </NoSsr>
        );
    }
);

// https://iconify.design/docs/iconify-icon/disable-cache.html
disableCache("local");
