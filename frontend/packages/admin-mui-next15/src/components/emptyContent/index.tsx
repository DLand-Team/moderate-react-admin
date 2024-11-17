import { varAlpha } from "@/common/utils";
import Box from "@mui/material/Box";
import type { StackProps } from "@mui/material/Stack";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import img_1 from "./ic-content.svg";
import Image from "next/image";

// ----------------------------------------------------------------------

export type EmptyContentProps = StackProps & {
    title?: string;
    imgUrl?: string;
    filled?: boolean;
    description?: string;
    action?: React.ReactNode;
    slotProps?: {
        img?: SxProps<Theme>;
        title?: SxProps<Theme>;
        description?: SxProps<Theme>;
    };
};

export function EmptyContent({
    sx,
    imgUrl,
    action,
    filled,
    slotProps,
    description,
    title = "No data",
    ...other
}: EmptyContentProps) {
    return (
        <Stack
            flexGrow={1}
            alignItems="center"
            justifyContent="center"
            sx={{
                px: 3,
                height: 1,
                ...(filled && {
                    borderRadius: 2,
                    bgcolor: (theme) =>
                        varAlpha(theme.vars.palette.grey["500Channel"], 0.04),
                    border: (theme) =>
                        `dashed 1px ${varAlpha(
                            theme.vars.palette.grey["500Channel"],
                            0.08
                        )}`,
                }),
                ...sx,
            }}
            {...other}>
            <Image style={{ maxWidth: 160 }} src={img_1} alt="" />

            {title && (
                <Typography
                    variant="h6"
                    component="span"
                    sx={{
                        mt: 1,
                        textAlign: "center",
                        ...slotProps?.title,
                        color: "text.disabled",
                    }}>
                    {title}
                </Typography>
            )}

            {description && (
                <Typography
                    variant="caption"
                    sx={{
                        mt: 1,
                        textAlign: "center",
                        color: "text.disabled",
                        ...slotProps?.description,
                    }}>
                    {description}
                </Typography>
            )}

            {action && action}
        </Stack>
    );
}
