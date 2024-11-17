import { cloneElement } from "react";
import { RouterLink } from "@/routes/components";
import type { NavItemProps } from "./types";
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

export type UseNavItemReturn = {
    subItem: boolean;
    rootItem: boolean;
    subDeepItem: boolean;
    baseProps: Record<string, any>;
    renderIcon: React.ReactNode;
    renderInfo: React.ReactNode;
};

export type UseNavItemProps = {
    path: NavItemProps["path"];
    icon?: NavItemProps["icon"];
    info?: NavItemProps["info"];
    depth?: NavItemProps["depth"];
    render?: NavItemProps["render"];
    hasChild?: NavItemProps["hasChild"];
    externalLink?: NavItemProps["externalLink"];
    enabledRootRedirect?: NavItemProps["enabledRootRedirect"];
};

export function useNavItem({
    path,
    icon,
    info,
    depth,
    render,
    hasChild,
    externalLink,
    enabledRootRedirect,
}: UseNavItemProps): UseNavItemReturn {
    const rootItem = depth === 1;

    const subItem = !rootItem;

    const subDeepItem = Number(depth) > 2;

    const linkProps = externalLink
        ? { href: path, target: "_blank", rel: "noopener" }
        : { component: Box, href: "/" };

    const baseProps =
        hasChild && !enabledRootRedirect ? { component: "div" } : linkProps;

    /**
     * Render @icon
     */
    let renderIcon = null;

    if (icon && render?.navIcon && typeof icon === "string") {
        renderIcon = render?.navIcon[icon];
    } else {
        renderIcon = icon;
    }

    /**
     * Render @info
     */
    let renderInfo = null;

    if (info && render?.navInfo && Array.isArray(info)) {
        const [key, value] = info;
        const element = render.navInfo(value)[key];

        renderInfo = element ? cloneElement(element) : null;
    } else {
        renderInfo = info;
    }

    return {
        subItem,
        rootItem,
        subDeepItem,
        baseProps,
        renderIcon,
        renderInfo,
    };
}
