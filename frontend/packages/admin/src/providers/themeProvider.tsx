import { ConfigProvider, theme as antdTheme } from "antd";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useFlat } from "src/service";
import themeMap from "src/theme";

const ThemeProvider = (props: React.PropsWithChildren) => {
	const { children } = props;
	const { isThemeAuto, settingData, setTheme, currentTheme } =
		useFlat("appStore");
	// 监听设备的主题
	useMediaQuery(
		{
			query: "(prefers-color-scheme: dark)",
		},
		undefined,
		(isSystemDark: boolean) => {
			if (isThemeAuto) {
				const newValue = isSystemDark ? "dark" : "light";
				setTheme(newValue);
			}
		},
	);
	const isDark = currentTheme == "dark";
	const themePlan =
		themeMap[settingData!?.paletteSet![currentTheme]]?.(isDark) ||
		themeMap.antd(isDark);
	const themeConfig = {
		algorithm: isDark ? [antdTheme.darkAlgorithm] : [],
		...themePlan,
	};
	return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
};
export default ThemeProvider;
