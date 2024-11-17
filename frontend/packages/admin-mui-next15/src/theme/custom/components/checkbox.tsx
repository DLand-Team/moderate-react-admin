import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { Theme, Components } from '@mui/material/styles';

import SvgIcon from '@mui/material/SvgIcon';
import { checkboxClasses } from '@mui/material/Checkbox';

// ----------------------------------------------------------------------

/**
 * Icons
 */
export const CheckboxIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path d="M17.9 2.318A5 5 0 0 1 22.895 7.1l.005.217v10a5 5 0 0 1-4.783 4.995l-.217.005h-10a5 5 0 0 1-4.995-4.783l-.005-.217v-10a5 5 0 0 1 4.783-4.996l.217-.004h10Zm-.5 1.5h-9a4 4 0 0 0-4 4v9a4 4 0 0 0 4 4h9a4 4 0 0 0 4-4v-9a4 4 0 0 0-4-4Z" />
  </SvgIcon>
);

export const CheckboxCheckedIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path d="M17 2a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm-1.625 7.255-4.13 4.13-1.75-1.75a.881.881 0 0 0-1.24 0c-.34.34-.34.89 0 1.24l2.38 2.37c.17.17.39.25.61.25.23 0 .45-.08.62-.25l4.75-4.75c.34-.34.34-.89 0-1.24a.881.881 0 0 0-1.24 0Z" />
  </SvgIcon>
);

export const CheckboxIndeterminateIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path d="M17,2 C19.7614,2 22,4.23858 22,7 L22,7 L22,17 C22,19.7614 19.7614,22 17,22 L17,22 L7,22 C4.23858,22 2,19.7614 2,17 L2,17 L2,7 C2,4.23858 4.23858,2 7,2 L7,2 Z M15,11 L9,11 C8.44772,11 8,11.4477 8,12 C8,12.5523 8.44772,13 9,13 L15,13 C15.5523,13 16,12.5523 16,12 C16,11.4477 15.5523,11 15,11 Z" />
  </SvgIcon>
);

// ----------------------------------------------------------------------

const MuiCheckbox: Components<Theme>['MuiCheckbox'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: {
    size: 'small',
    icon: <CheckboxIcon />,
    checkedIcon: <CheckboxCheckedIcon />,
    indeterminateIcon: <CheckboxIndeterminateIcon />,
  },

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ ownerState, theme }) => ({
      padding: theme.spacing(1),
      ...(ownerState.color === 'default' && {
        [`&.${checkboxClasses.checked}`]: { color: theme.vars.palette.text.primary },
      }),
      [`&.${checkboxClasses.disabled}`]: { color: theme.vars.palette.action.disabled },
    }),
  },
};

// ----------------------------------------------------------------------

export const checkbox = { MuiCheckbox };
