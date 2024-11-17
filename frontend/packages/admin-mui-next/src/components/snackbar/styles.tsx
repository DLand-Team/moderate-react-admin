import { Toaster } from "sonner";
import { styled } from "@mui/material/styles";
import { varAlpha } from "@/common/utils";
import { toasterClasses } from "./classes";

// ----------------------------------------------------------------------

export const StyledToaster = styled(Toaster)(({ theme }) => {
    const baseStyles = {
        toastDefault: {
            padding: theme.spacing(1, 1, 1, 1.5),
            boxShadow: theme.customShadows.z8,
            color: theme.vars.palette.background.paper,
            backgroundColor: theme.vars.palette.text.primary,
        },
        toastColor: {
            padding: theme.spacing(0.5, 1, 0.5, 0.5),
            boxShadow: theme.customShadows.z8,
            color: theme.vars.palette.text.primary,
            backgroundColor: theme.vars.palette.background.paper,
        },
        toastLoader: {
            padding: theme.spacing(0.5, 1, 0.5, 0.5),
            boxShadow: theme.customShadows.z8,
            color: theme.vars.palette.text.primary,
            backgroundColor: theme.vars.palette.background.paper,
        },
    };

    const loadingStyles = {
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "none",
        transform: "none",
        overflow: "hidden",
        alignItems: "center",
        position: "relative",
        borderRadius: "inherit",
        justifyContent: "center",
        background: theme.vars.palette.background.neutral,
        [`& .${toasterClasses.loadingIcon}`]: {
            zIndex: 9,
            width: 24,
            height: 24,
            borderRadius: "50%",
            animation: "rotate 3s infinite linear",
            background: `conic-gradient(${varAlpha(
                theme.vars.palette.text.primaryChannel,
                0
            )}, ${varAlpha(theme.vars.palette.text.disabledChannel, 0.64)})`,
        },
        [toasterClasses.loaderVisible]: { display: "flex" },
    };

    return {
        width: 300,
        [`& .${toasterClasses.toast}`]: {
            gap: 12,
            width: "100%",
            minHeight: 52,
            display: "flex",
            borderRadius: 12,
            alignItems: "center",
        },
        /*
         * Content
         */
        [`& .${toasterClasses.content}`]: {
            gap: 0,
            flex: "1 1 auto",
        },
        [`& .${toasterClasses.title}`]: {
            fontSize: theme.typography.subtitle2.fontSize,
        },
        [`& .${toasterClasses.description}`]: {
            ...theme.typography.caption,
            opacity: 0.64,
        },
        /*
         * Buttons
         */
        [`& .${toasterClasses.actionButton}`]: {},
        [`& .${toasterClasses.cancelButton}`]: {},
        [`& .${toasterClasses.closeButton}`]: {
            top: 0,
            right: 0,
            left: "auto",
            color: "currentColor",
            backgroundColor: "transparent",
            transform: "translate(-6px, 6px)",
            borderColor: varAlpha(theme.vars.palette.grey["500Channel"], 0.16),
            transition: theme.transitions.create([
                "background-color",
                "border-color",
            ]),
            "&:hover": {
                borderColor: varAlpha(
                    theme.vars.palette.grey["500Channel"],
                    0.24
                ),
                backgroundColor: varAlpha(
                    theme.vars.palette.grey["500Channel"],
                    0.08
                ),
            },
        },
        /*
         * Icon
         */
        [`& .${toasterClasses.icon}`]: {
            margin: 0,
            width: 48,
            height: 48,
            alignItems: "center",
            borderRadius: "inherit",
            justifyContent: "center",
            alignSelf: "flex-start",
            [`& .${toasterClasses.iconSvg}`]: {
                width: 24,
                height: 24,
                fontSize: 0,
            },
        },

        /*
         * Default
         */
        "@keyframes rotate": { to: { transform: "rotate(1turn)" } },

        [`& .${toasterClasses.default}`]: {
            ...baseStyles.toastDefault,
            [`&:has(${toasterClasses.closeBtnVisible})`]: {
                [`& .${toasterClasses.content}`]: {
                    paddingRight: 32,
                },
            },
            [`&:has(.${toasterClasses.loader})`]: baseStyles.toastLoader,
            /*
             * With loader
             */
            [`&:has(.${toasterClasses.loader})`]: baseStyles.toastLoader,
            [`& .${toasterClasses.loader}`]: loadingStyles,
        },
        /*
         * Error
         */
        [`& .${toasterClasses.error}`]: {
            ...baseStyles.toastColor,
            [`& .${toasterClasses.icon}`]: {
                color: theme.vars.palette.error.main,
                backgroundColor: varAlpha(
                    theme.vars.palette.error.mainChannel,
                    0.08
                ),
            },
        },
        /*
         * Success
         */
        [`& .${toasterClasses.success}`]: {
            ...baseStyles.toastColor,
            [`& .${toasterClasses.icon}`]: {
                color: theme.vars.palette.success.main,
                backgroundColor: varAlpha(
                    theme.vars.palette.success.mainChannel,
                    0.08
                ),
            },
        },
        /*
         * Warning
         */
        [`& .${toasterClasses.warning}`]: {
            ...baseStyles.toastColor,
            [`& .${toasterClasses.icon}`]: {
                color: theme.vars.palette.warning.main,
                backgroundColor: varAlpha(
                    theme.vars.palette.warning.mainChannel,
                    0.08
                ),
            },
        },
        /*
         * Info
         */
        [`& .${toasterClasses.info}`]: {
            ...baseStyles.toastColor,
            [`& .${toasterClasses.icon}`]: {
                color: theme.vars.palette.info.main,
                backgroundColor: varAlpha(
                    theme.vars.palette.info.mainChannel,
                    0.08
                ),
            },
        },
    };
});
