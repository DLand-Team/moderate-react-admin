import { varAlpha } from "@/common/utils";
import { useTheme } from "@mui/material";

export const useCss = () => {
    const { palette, shape, spacing } = useTheme();
    const cssVars = {
        "--nav-item-color": palette.text.secondary,
        "--nav-item-hover-bg": palette.action.hover,
        "--nav-item-caption-color": palette.text.disabled,
        // root
        "--nav-item-root-active-color": palette.primary.main,
        "--nav-item-root-active-color-on-dark": palette.primary.light,
        "--nav-item-root-active-bg": varAlpha(
            palette.primary.mainChannel,
            0.08
        ),
        "--nav-item-root-active-hover-bg": varAlpha(
            palette.primary.mainChannel,
            0.16
        ),
        "--nav-item-root-open-color": palette.text.primary,
        "--nav-item-root-open-bg": palette.action.hover,
        // sub
        "--nav-item-sub-active-color": palette.text.primary,
        "--nav-item-sub-open-color": palette.text.primary,
        "--nav-item-sub-open-bg": palette.action.hover,
        "--nav-item-sub-active-bg": palette.action.hover,
        "--nav-subheader-color": palette.text.disabled,
        "--nav-subheader-hover-color": palette.text.primary,
        "--nav-item-gap": spacing(0.5),
        "--nav-item-radius": `${shape.borderRadius}px`,
        "--nav-item-pt": spacing(0.5),
        "--nav-item-pr": spacing(1),
        "--nav-item-pb": spacing(0.5),
        "--nav-item-pl": spacing(1.5),
        // root
        "--nav-item-root-height": "44px",
        // sub
        "--nav-item-sub-height": "36px",
        // icon
        "--nav-icon-size": "24px",
        "--nav-icon-margin": spacing(0, 1.5, 0, 0),
        // bullet
        "--nav-bullet-size": "12px",
        "--nav-bullet-light-color": "#EDEFF2",
        "--nav-bullet-dark-color": "#282F37",
    };
    const classNameObj = {
        vertical: {
            root: "nav__section__vertical",
        },
        item: {
            root: "class__nav__item",
            icon: "class__nav__item__icon",
            info: "class__nav__item__info",
            texts: "class__nav__item__texts",
            title: "class__nav__item__title",
            arrow: "class__nav__item__arrow",
            caption: "class__nav__item__caption",
        },
        li: "class__nav__li",
        ul: "class__nav__ul",
        paper: "class__nav__paper",
        subheader: "class__nav__subheader",
        state: {
            open: "state--open",
            active: "state--active",
            disabled: "state--disabled",
        },
    };
    return {
        cssVars,
        classNameObj,
    };
};
