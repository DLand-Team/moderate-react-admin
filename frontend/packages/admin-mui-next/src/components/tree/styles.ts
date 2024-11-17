import { ListItemButton, ListItemIcon } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { Iconify, MyIconifyProps } from '../iconify';

//tree item的组件
export type TreeItemConfigProps = {
  hiddenLabel?: boolean;
  itemGap?: number;
  iconSize?: number;
  itemRadius?: number;
  itemPadding?: string;
  currentRole?: string;
  itemSubHeight?: number;
  itemRootHeight?: number;
};

export const TreeItemStyledItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean; depth: number; config: TreeItemConfigProps }>(({
  active,
  depth,
  config,
  theme,
}) => {
  const subItem = depth == 1;
  const subItem2 = depth == 2;
  const subItem3 = depth == 3;
  const subItem4 = depth == 4;
  const subItem5 = depth == 5;
  const activeStyles = {
    root: {
      color: theme.palette.mode === 'light' ? 'black' : theme.palette.primary.light,
      backgroundColor: alpha(theme.palette.primary.main, 0.16),
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.16),
      },
    },
    sub: {
      color: theme.palette.text.primary,
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    sub2: {
      color: theme.palette.text.primary,
      backgroundColor: alpha(theme.palette.primary.main, 0.07),
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    sub3: {
      color: theme.palette.text.primary,
      backgroundColor: alpha(theme.palette.primary.main, 0.05),
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    sub4: {
      color: theme.palette.text.primary,
      backgroundColor: alpha(theme.palette.primary.main, 0.03),
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    sub5: {
      color: theme.palette.text.primary,
      backgroundColor: alpha(theme.palette.primary.main, 0.03),
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  };
  return {
    border: '1px solid var(--transparent-primary-12, rgba(17, 70, 52, 0.12))',
    // Root item
    padding: config.itemPadding,
    marginBottom: config.itemGap! + 10,
    borderRadius: config.itemRadius,
    minHeight: config.itemRootHeight! + 10,
    color: theme.palette.text.secondary,
    marginRight: 10,
    // Active root item
    ...(active && {
      ...activeStyles.root,
    }),

    // Sub item
    ...(subItem && {
      minHeight: config.itemRootHeight,
      // Active sub item
      ...(active && {
        ...activeStyles.sub,
      }),
    }),
    ...(subItem2 && {
      minHeight: config.itemRootHeight,
      // Active sub item
      ...(active && {
        ...activeStyles.sub2,
      }),
    }),
    ...(subItem3 && {
      minHeight: config.itemRootHeight,
      // Active sub item
      ...(active && {
        ...activeStyles.sub3,
      }),
    }),
    ...(subItem4 && {
      minHeight: config.itemRootHeight,
      // Active sub item
      ...(active && {
        ...activeStyles.sub4,
      }),
    }),
    ...(subItem5 && {
      minHeight: config.itemRootHeight,
      // Active sub item
      ...(active && {
        ...activeStyles.sub5,
      }),
    }),
  };
});

//图标
type TreeItemStyledIconProps = {
  size?: number;
};

export const TreeItemStyledIcon = styled(ListItemIcon)<TreeItemStyledIconProps>(({ size }) => ({
  minWidth: 'auto',
  width: size,
  height: size,
  flexShrink: 0,
  marginRight: 0,
}));

export type TreeItemDotIconProps = {
  active?: boolean;
};

export const TreeItemStyledDotIcon = styled('span')<TreeItemDotIconProps>(({ active, theme }) => ({
  width: 4,
  height: 4,
  borderRadius: '50%',
  backgroundColor: theme.palette.text.disabled,
  transition: theme.transitions.create(['transform'], {
    duration: theme.transitions.duration.shorter,
  }),
  ...(active && {
    transform: 'scale(2)',
    backgroundColor: theme.palette.primary.main,
  }),
}));

export const StyledIconify = styled(Iconify)<MyIconifyProps>({
  color: 'red',
});
