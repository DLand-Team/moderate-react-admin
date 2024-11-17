import { useTheme } from "@mui/material";

export const useCss = () => {
    const theme = useTheme();
    const cssVars = {
        "--layout-transition-easing": "linear",
        "--layout-transition-duration": "120ms",
        "--layout-nav-mini-width": "88px",
        "--layout-nav-vertical-width": "300px",
        "--layout-nav-horizontal-height": "64px",
        "--layout-dashboard-content-pt": theme.spacing(1),
        "--layout-dashboard-content-pb": theme.spacing(8),
        "--layout-dashboard-content-px": theme.spacing(5),
        "--layout-nav-zIndex": 1101,
        "--layout-nav-mobile-width": "320px",
        "--layout-header-blur": "8px",
        "--layout-header-zIndex": 1100,
        "--layout-header-mobile-height": "64px",
        "--layout-header-desktop-height": "72px",
    };
    const classNameObj = {};
    return {
        cssVars,
        classNameObj,
    };
};
