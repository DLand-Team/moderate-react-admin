import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import { MouseEventHandler } from "react";
import { stylesMode } from "src/common/utils";
import { Iconify } from "../../iconify";
import { useCss } from "../useCss";
import { useNavItem } from "../useCtr";
import { MenuItem } from "./navMenuVertical";

// ----------------------------------------------------------------------
export interface NavMenuItemProps {
    data: MenuItem;
    depth: number;
    hasChild: boolean;
    active: boolean;
    open?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}
export const NavMenuItem = ({
    data,
    depth,
    hasChild,
    active,
    open,
    onClick,
}: NavMenuItemProps) => {
    const { classNameObj } = useCss();
    const { path, info, title, icon } = data;
    const navItem = useNavItem({
        path,
        info,
        depth,
        hasChild,
    });

    return (
        <StyledNavItem
            onClick={onClick}
            aria-label={title}
            depth={depth}
            active={active}
            open={open}
            {...navItem.baseProps}>
            {icon && icon}

            {title && (
                <Box component="span" className={classNameObj.item.texts}>
                    <Box component="span" className={classNameObj.item.title}>
                        {title}
                    </Box>
                </Box>
            )}

            {title && (
                <Box component="span" className={classNameObj.item.info}>
                    {navItem.renderInfo}
                </Box>
            )}
            {hasChild && (
                <Iconify
                    icon={
                        open
                            ? "eva:arrow-ios-downward-fill"
                            : "eva:arrow-ios-forward-fill"
                    }
                    className={classNameObj.item.arrow}
                />
            )}
        </StyledNavItem>
    );
};

// ----------------------------------------------------------------------

const StyledNavItem = styled(ButtonBase, {
    shouldForwardProp: (prop) =>
        prop !== "active" &&
        prop !== "open" &&
        prop !== "disabled" &&
        prop !== "depth",
})<any>(({ active, open, depth, theme }) => {
    const { classNameObj } = useCss();
    const rootItem = depth === 1;

    const subItem = !rootItem;

    const baseStyles = {
        item: {
            width: "100%",
            paddingTop: "var(--nav-item-pt)",
            paddingLeft: "var(--nav-item-pl)",
            paddingRight: "var(--nav-item-pr)",
            paddingBottom: "var(--nav-item-pb)",
            borderRadius: "var(--nav-item-radius)",
            color: "var(--nav-item-color)",
            "&:hover": {
                backgroundColor: "var(--nav-item-hover-bg)",
            },
        },
        texts: { minWidth: 0, flex: "1 1 auto" },
        title: {
            ...theme.typography.body2,
            fontWeight: active
                ? theme.typography.fontWeightSemiBold
                : theme.typography.fontWeightMedium,
        },
        caption: {
            ...theme.typography.caption,
            color: "var(--nav-item-caption-color)",
        },
        icon: {
            width: "var(--nav-icon-size)",
            height: "var(--nav-icon-size)",
            margin: "var(--nav-icon-margin)",
        },
        arrow: {
            width: 16,
            height: 16,
            flexShrink: 0,
            marginLeft: "6px",
            display: "inline-flex",
        },
        info: {
            fontSize: 12,
            flexShrink: 0,
            fontWeight: 600,
            marginLeft: "6px",
            lineHeight: 18 / 12,
            display: "inline-flex",
        },
    } as const;

    return {
        /**
         * Root item
         */
        ...(rootItem && {
            ...baseStyles.item,
            minHeight: "var(--nav-item-root-height)",
            [`& .${classNameObj.item.icon}`]: { ...baseStyles.icon },
            [`& .${classNameObj.item.texts}`]: { ...baseStyles.texts },
            [`& .${classNameObj.item.title}`]: { ...baseStyles.title },
            [`& .${classNameObj.item.caption}`]: { ...baseStyles.caption },
            [`& .${classNameObj.item.arrow}`]: { ...baseStyles.arrow },
            [`& .${classNameObj.item.info}`]: { ...baseStyles.info },
            // State
            ...(active && {
                color: "var(--nav-item-root-active-color)",
                backgroundColor: "var(--nav-item-root-active-bg)",
                "&:hover": {
                    backgroundColor: "var(--nav-item-root-active-hover-bg)",
                },
                [stylesMode.dark]: {
                    color: "var(--nav-item-root-active-color-on-dark)",
                },
            }),
            ...(open && {
                color: "var(--nav-item-root-open-color)",
                backgroundColor: "var(--nav-item-root-open-bg)",
            }),
        }),
        /**
         * Sub item
         */
        ...(subItem && {
            ...baseStyles.item,
            minHeight: "var(--nav-item-sub-height)",
            [`& .${classNameObj.item.icon}`]: { ...baseStyles.icon },
            [`& .${classNameObj.item.texts}`]: { ...baseStyles.texts },
            [`& .${classNameObj.item.title}`]: { ...baseStyles.title },
            [`& .${classNameObj.item.caption}`]: { ...baseStyles.caption },
            [`& .${classNameObj.item.arrow}`]: { ...baseStyles.arrow },
            [`& .${classNameObj.item.info}`]: { ...baseStyles.info },
            // Shape
            "&::before": {
                left: 0,
                content: '""',
                position: "absolute",
                width: "var(--nav-bullet-size)",
                height: "var(--nav-bullet-size)",
                transform:
                    "translate(calc(var(--nav-bullet-size) * -1), calc(var(--nav-bullet-size) * -0.4))",
                backgroundColor: "var(--nav-bullet-light-color)",
                mask: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' viewBox='0 0 14 14'%3E%3Cpath d='M1 1v4a8 8 0 0 0 8 8h4' stroke='%23efefef' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat 50% 50%/100% auto`,
                WebkitMask: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' viewBox='0 0 14 14'%3E%3Cpath d='M1 1v4a8 8 0 0 0 8 8h4' stroke='%23efefef' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat 50% 50%/100% auto`,
                [stylesMode.dark]: {
                    backgroundColor: "var(--nav-bullet-dark-color)",
                },
            },
            // State
            ...(active && {
                color: "var(--nav-item-sub-active-color)",
                backgroundColor: "var(--nav-item-sub-active-bg)",
            }),
            ...(open && {
                color: "var(--nav-item-sub-open-color)",
                backgroundColor: "var(--nav-item-sub-open-bg)",
            }),
        }),
    };
});
