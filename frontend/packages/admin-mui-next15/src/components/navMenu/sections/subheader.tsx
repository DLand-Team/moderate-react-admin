import { ListSubheader, ListSubheaderProps } from "@mui/material";
import { useCss } from "../useCss";
import { Iconify, iconifyClasses } from "@/components/iconify";

export function Subheader({
    sx,
    open,
    children,
    ...other
}: ListSubheaderProps & {
    open?: boolean;
}) {
    const { classNameObj } = useCss();
    return (
        <ListSubheader
            disableSticky
            component="div"
            className={classNameObj.subheader}
            sx={{
                gap: 1,
                cursor: "pointer",
                alignItems: "center",
                position: "relative",
                typography: "overline",
                display: "inline-flex",
                alignSelf: "flex-start",
                color: "var(--nav-subheader-color)",
                padding: (theme) => theme.spacing(2, 1, 1, 1.5),
                fontSize: (theme) => theme.typography.pxToRem(11),
                transition: (theme) =>
                    theme.transitions.create(["color", "padding-left"], {
                        duration: theme.transitions.duration.standard,
                    }),
                "&:hover": {
                    pl: 2,
                    color: "var(--nav-subheader-hover-color)",
                    [`& .${iconifyClasses.root}`]: { opacity: 1 },
                },
                ...sx,
            }}
            {...other}>
            <Iconify
                width={16}
                icon={
                    open
                        ? "eva:arrow-ios-downward-fill"
                        : "eva:arrow-ios-forward-fill"
                }
                sx={{
                    left: -4,
                    opacity: 0,
                    position: "absolute",
                    transition: (theme) =>
                        theme.transitions.create(["opacity"], {
                            duration: theme.transitions.duration.standard,
                        }),
                }}
            />
            {children}
        </ListSubheader>
    );
}
