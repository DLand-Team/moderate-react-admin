import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { Theme, Components } from "@mui/material/styles";
import SvgIcon from "@mui/material/SvgIcon";
import { buttonClasses } from "@mui/material/Button";
import { dialogActionsClasses } from "@mui/material/DialogActions";

import { stylesMode } from "src/common/utils";

// ----------------------------------------------------------------------

/**
 * Icons
 */
/* https://icon-sets.iconify.design/eva/chevron-down-fill */
export const PickerSwitchIcon = (props: SvgIconProps) => (
    <SvgIcon {...props}>
        <path
            fill="currentColor"
            d="M12 15.5a1 1 0 0 1-.71-.29l-4-4a1 1 0 1 1 1.42-1.42L12 13.1l3.3-3.18a1 1 0 1 1 1.38 1.44l-4 3.86a1 1 0 0 1-.68.28"
        />
    </SvgIcon>
);

/* https://icon-sets.iconify.design/eva/arrow-ios-back-fill */
export const PickerLeftIcon = (props: SvgIconProps) => (
    <SvgIcon {...props}>
        <path
            fill="currentColor"
            d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64"
        />
    </SvgIcon>
);

/* https://icon-sets.iconify.design/eva/arrow-ios-forward-fill */
export const PickerRightIcon = (props: SvgIconProps) => (
    <SvgIcon {...props}>
        <path
            fill="currentColor"
            d="M10 19a1 1 0 0 1-.64-.23a1 1 0 0 1-.13-1.41L13.71 12L9.39 6.63a1 1 0 0 1 .15-1.41a1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19"
        />
    </SvgIcon>
);

/* https://icon-sets.iconify.design/solar/calendar-mark-bold-duotone */
export const PickerCalendarIcon = (props: SvgIconProps) => (
    <SvgIcon {...props}>
        <path
            fill="currentColor"
            d="M6.96 2c.418 0 .756.31.756.692V4.09c.67-.012 1.422-.012 2.268-.012h4.032c.846 0 1.597 0 2.268.012V2.692c0-.382.338-.692.756-.692s.756.31.756.692V4.15c1.45.106 2.403.368 3.103 1.008c.7.641.985 1.513 1.101 2.842v1H2V8c.116-1.329.401-2.2 1.101-2.842c.7-.64 1.652-.902 3.103-1.008V2.692c0-.382.339-.692.756-.692"
        />
        <path
            fill="currentColor"
            d="M22 14v-2c0-.839-.013-2.335-.026-3H2.006c-.013.665 0 2.161 0 3v2c0 3.771 0 5.657 1.17 6.828C4.349 22 6.234 22 10.004 22h4c3.77 0 5.654 0 6.826-1.172C22 19.657 22 17.771 22 14"
            opacity="0.5"
        />
        <path
            fill="currentColor"
            d="M18 16.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"
        />
    </SvgIcon>
);

/* https://icon-sets.iconify.design/solar/clock-circle-outline */
export const PickerClockIcon = (props: SvgIconProps) => (
    <SvgIcon {...props}>
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M12 2.75a9.25 9.25 0 1 0 0 18.5a9.25 9.25 0 0 0 0-18.5M1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12S17.937 22.75 12 22.75S1.25 17.937 1.25 12M12 7.25a.75.75 0 0 1 .75.75v3.69l2.28 2.28a.75.75 0 1 1-1.06 1.06l-2.5-2.5a.75.75 0 0 1-.22-.53V8a.75.75 0 0 1 .75-.75"
            clipRule="evenodd"
        />
    </SvgIcon>
);

const defaultProps = {
    date: {
        openPickerIcon: PickerCalendarIcon,
        leftArrowIcon: PickerLeftIcon,
        rightArrowIcon: PickerRightIcon,
        switchViewIcon: PickerSwitchIcon,
    },
    time: {
        openPickerIcon: PickerClockIcon,
        rightArrowIcon: PickerRightIcon,
        switchViewIcon: PickerSwitchIcon,
    },
};

const MuiDatePicker: Components<Theme>["MuiDatePicker"] = {
    /** **************************************
     * DEFAULT PROPS
     *************************************** */
    defaultProps: { slots: defaultProps.date },
};

const MuiDateTimePicker: Components<Theme>["MuiDateTimePicker"] = {
    /** **************************************
     * DEFAULT PROPS
     *************************************** */
    defaultProps: { slots: defaultProps.date },
};

const MuiStaticDatePicker: Components<Theme>["MuiStaticDatePicker"] = {
    /** **************************************
     * DEFAULT PROPS
     *************************************** */
    defaultProps: { slots: defaultProps.date },
};

const MuiDesktopDatePicker: Components<Theme>["MuiDesktopDatePicker"] = {
    /** **************************************
     * DEFAULT PROPS
     *************************************** */
    defaultProps: { slots: defaultProps.date },
};

const MuiDesktopDateTimePicker: Components<Theme>["MuiDesktopDateTimePicker"] =
    {
        /** **************************************
         * DEFAULT PROPS
         *************************************** */
        defaultProps: { slots: defaultProps.date },
    };

const MuiMobileDatePicker: Components<Theme>["MuiMobileDatePicker"] = {
    /** **************************************
     * DEFAULT PROPS
     *************************************** */
    defaultProps: { slots: defaultProps.date },
};

const MuiMobileDateTimePicker: Components<Theme>["MuiMobileDateTimePicker"] = {
    /** **************************************
     * DEFAULT PROPS
     *************************************** */
    defaultProps: { slots: defaultProps.date },
};

const MuiTimePicker: Components<Theme>["MuiTimePicker"] = {
    /** **************************************
     * DEFAULT PROPS
     *************************************** */
    defaultProps: { slots: defaultProps.time },
};

const MuiMobileTimePicker: Components<Theme>["MuiMobileTimePicker"] = {
    /** **************************************
     * DEFAULT PROPS
     *************************************** */
    defaultProps: { slots: defaultProps.time },
};

const MuiStaticTimePicker: Components<Theme>["MuiStaticTimePicker"] = {
    /** **************************************
     * DEFAULT PROPS
     *************************************** */
    defaultProps: { slots: defaultProps.time },
};

const MuiDesktopTimePicker: Components<Theme>["MuiDesktopTimePicker"] = {
    /** **************************************
     * DEFAULT PROPS
     *************************************** */
    defaultProps: { slots: defaultProps.time },
};

const MuiPickersLayout: Components<Theme>["MuiPickersLayout"] = {
    /** **************************************
     * STYLE
     *************************************** */
    styleOverrides: {
        root: ({ theme }) => ({
            [`& .${dialogActionsClasses.root}`]: {
                [`& .${buttonClasses.root}`]: {
                    [`&:last-of-type`]: {
                        color: theme.vars.palette.common.white,
                        backgroundColor: theme.vars.palette.text.primary,
                        [stylesMode.dark]: {
                            color: theme.vars.palette.grey[800],
                        },
                    },
                },
            },
        }),
    },
};

const MuiPickersPopper: Components<Theme>["MuiPickersPopper"] = {
    /** **************************************
     * DEFAULT PROPS
     *************************************** */
    styleOverrides: {
        paper: ({ theme }) => ({
            boxShadow: theme.customShadows.dropdown,
            borderRadius: theme.shape.borderRadius * 1.5,
        }),
    },
};

// ----------------------------------------------------------------------

export const datePicker = {
    MuiPickersPopper,
    MuiPickersLayout,
    // Date
    MuiDatePicker,
    MuiDateTimePicker,
    MuiStaticDatePicker,
    MuiDesktopDatePicker,
    MuiDesktopDateTimePicker,
    MuiMobileDatePicker,
    MuiMobileDateTimePicker,
    // Time
    MuiTimePicker,
    MuiMobileTimePicker,
    MuiStaticTimePicker,
    MuiDesktopTimePicker,
};
