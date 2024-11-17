import { Box, Stack, SxProps, Theme } from "@mui/material";
import { DOMAttributes } from "react";
import {
    TreeItemConfigProps,
    TreeItemStyledDotIcon,
    TreeItemStyledIcon,
    TreeItemStyledItem,
} from "./styles";
import { TreeItemProps } from "./types";

const navVerticalConfig = (config?: TreeItemConfigProps) => ({
    itemGap: config?.itemGap || 4,
    iconSize: config?.iconSize || 24,
    currentRole: config?.currentRole,
    itemRootHeight: config?.itemRootHeight || 44,
    itemSubHeight: config?.itemSubHeight || 36,
    itemPadding: config?.itemPadding || "4px 8px 4px 12px",
    itemRadius: config?.itemRadius || 8,
    hiddenLabel: config?.hiddenLabel || false,
});

export const TreeItem = (props: TreeItemProps & DOMAttributes<any>) => {
    const {
        active,
        depth,
        isError,
        label,
        children,
        formCreater,
        sx = {},
        ...rest
    } = props;
    let sxOptionArr: SxProps<Theme>[] = [
        {
            ml: 0,
        },
        {
            ml: 1,
        },
        {
            ml: 2,
        },
        {
            ml: 3,
        },
        {
            ml: 4,
        },
        {
            ml: 5,
        },
    ];
    let sxOption = sxOptionArr[depth];
    return (
        <Box>
            <Stack alignItems="center" direction="row">
                <TreeItemStyledItem
                    sx={{ ...sxOption, ...sx } as SxProps<Theme>}
                    {...rest}
                    active={active}
                    depth={depth}
                    config={navVerticalConfig()}>
                    <TreeItemStyledIcon sx={{ mr: 1.5 }}>
                        <TreeItemStyledDotIcon active={active} />
                    </TreeItemStyledIcon>
                    <Box component="span" sx={{ ml: 1, lineHeight: 0 }}>
                        {`${label}`}
                    </Box>
                    {children}
                </TreeItemStyledItem>
                <Box
                    sx={{
                        width: "28px",
                    }}>
                    {/* {isError && (
            <MotionContainer action={true} animate={isError}>
              <m.div variants={varBounce().in}>
                <Iconify color={'red'} icon="material-symbols:error" width={20} />
              </m.div>
            </MotionContainer>
          )} */}
                </Box>
            </Stack>
        </Box>
    );
};
