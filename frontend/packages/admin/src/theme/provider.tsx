import { ConfigProvider, theme as antdTheme } from "antd";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useFlat } from "src/reduxService";

const ThemeProvider = (props: React.PropsWithChildren) => {
  const { children } = props;
  const { setTheme, theme } = useFlat("appStore");
  // 监听设备的主题
  const isDeviceDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined,
    (isSystemDark: boolean) => setTheme(isSystemDark ? "dark" : "light")
  );
  const isDark =
    theme == "auto" ? isDeviceDark : theme == "dark" ? true : false;
  const themeConfig = {
    algorithm: isDark ? [antdTheme.darkAlgorithm] : [],
  };
  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
};
export default ThemeProvider;
