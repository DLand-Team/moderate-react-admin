"use client";

import Portal from "@mui/material/Portal";
import { Iconify } from "../iconify";
import { StyledToaster } from "./styles";
import { toasterClasses } from "./classes";

// ----------------------------------------------------------------------

export function Snackbar() {
    return (
        <Portal>
            <StyledToaster
                expand
                gap={12}
                closeButton
                offset={16}
                visibleToasts={4}
                position="top-right"
                className={toasterClasses.root}
                toastOptions={{
                    unstyled: true,
                    classNames: {
                        toast: toasterClasses.toast,
                        icon: toasterClasses.icon,
                        // content
                        content: toasterClasses.content,
                        title: toasterClasses.title,
                        description: toasterClasses.description,
                        // button
                        actionButton: toasterClasses.actionButton,
                        cancelButton: toasterClasses.cancelButton,
                        closeButton: toasterClasses.closeButton,
                        // state
                        default: toasterClasses.default,
                        info: toasterClasses.info,
                        error: toasterClasses.error,
                        success: toasterClasses.success,
                        warning: toasterClasses.warning,
                    },
                }}
                icons={{
                    loading: <span className={toasterClasses.loadingIcon} />,
                    info: (
                        <Iconify
                            className={toasterClasses.iconSvg}
                            icon="solar:info-circle-bold"
                        />
                    ),
                    success: (
                        <Iconify
                            className={toasterClasses.iconSvg}
                            icon="solar:check-circle-bold"
                        />
                    ),
                    warning: (
                        <Iconify
                            className={toasterClasses.iconSvg}
                            icon="solar:danger-triangle-bold"
                        />
                    ),
                    error: (
                        <Iconify
                            className={toasterClasses.iconSvg}
                            icon="solar:danger-bold"
                        />
                    ),
                }}
            />
        </Portal>
    );
}
