"use client";

// 由于需要定制化主题，引入关联库中的类型文件，目的让其中declare生效，获得完整类型提示
import type {} from "@mui/lab/themeAugmentation";
import type {} from "@mui/x-tree-view/themeAugmentation";
import type {} from "@mui/x-data-grid/themeAugmentation";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import type {} from "@mui/material/themeCssVarsAugmentation";
import type {} from "@mui/material/themeCssVarsAugmentation";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { zhCN } from "@mui/material/locale";
import type { Theme } from "@mui/material/styles";
import {
    CssVarsThemeOptions,
    experimental_extendTheme as extendTheme,
} from "@mui/material/styles";
import { colorSchemes, components, customShadows, typography } from "./custom";

// ----------------------------------------------------------------------

function createTheme(): Theme {
    const initialTheme: CssVarsThemeOptions = {
        //>>>>>>基础的主题配置项:Start<<<<<<
        // 替代palette的高级配置项目，但是同时存在，以palette为主的去覆盖
        colorSchemes, //https://mui.com/material-ui/customization/palette/#:~:text=The%20colorSchemes%20API%20is%20an%20enhanced%20version%20of%20the%20palette%20API%2C%20and%20is%20the%20preferred%20API%20for%20this%20purpose%20starting%20from%20Material%C2%A0UI%20v6.%20If%20you%20provide%20both%20colorSchemes%20and%20palette%2C%20the%20latter%20will%20override%20any%20styles%20defined%20in%20the%20former.
        shape: { borderRadius: 8 },
        components,
        typography: {
            ...typography,
        },
        //>>>>>>基础的主题配置项:End<<<<<<
        //>>>>>>自定义扩展的变量:Start<<<<<<
        customShadows: customShadows("light"),
        //>>>>>>自定义扩展的变量:End<<<<<<
    };

    const theme = extendTheme(initialTheme, zhCN);

    return theme;
}

type Props = {
    children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
    const theme = createTheme();

    return (
        <AppRouterCacheProvider options={{ key: "css" }}>
            <CssVarsProvider theme={theme} modeStorageKey={"theme-mode"}>
                <CssBaseline />
                {children}
            </CssVarsProvider>
        </AppRouterCacheProvider>
    );
}
