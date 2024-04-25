import { ConfigProvider, theme as antdTheme } from "antd";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useFlat } from "src/service";
import themeMap from "src/theme";

const ThemeProvider = (props: React.PropsWithChildren) => {
	const { children } = props;
	const { theme } = useFlat("appStore");
	const [currentTheme, setCurrentTheme] = useState(theme);
	useEffect(() => {
		setCurrentTheme(theme);
	}, [theme]);
	// 监听设备的主题
	const isSysDark = useMediaQuery(
		{
			query: "(prefers-color-scheme: dark)",
		},
		undefined,
		(isSystemDark: boolean) => {
			const newValue = isSystemDark ? "dark" : "light";
			if (theme == "auto") {
				setCurrentTheme(newValue);
			}
		},
	);
	// 如果是auto，那么就跟随系统
	const isDark = theme == "auto" ? isSysDark : currentTheme == "dark";
	const themePlan = themeMap["themeA"];

	if (isDark) {
		themePlan.components.Menu.itemSelectedBg = "#1e1e31";
		//@ts-ignore
		themePlan.components.Menu.colorBgContainer = "rgba(22, 28, 36,0)";
		//@ts-ignore
		themePlan.token.colorBgBase = "rgb(22, 28, 36)";
		//@ts-ignore
		themePlan.components.Menu.itemSelectedColor = "#b985f4";
		//@ts-ignore
		themePlan.components.Tabs.colorFillAlter = "#20252c";
	} else {
		//@ts-ignore
		themePlan.components.Tabs.colorFillAlter = "#dde1e6";
		themePlan.components.Menu.itemSelectedBg = "rgb(208, 223, 242)";
		//@ts-ignore
		themePlan.components.Menu.colorBgContainer = "rgb(244, 246, 248)";
		//@ts-ignore
		themePlan.token.colorBgBase = "rgb(244, 246, 248)";
		//@ts-ignore
		themePlan.components.Menu.itemSelectedColor = "#7635dc";
	}
	const themeConfig = {
		algorithm: isDark ? [antdTheme.darkAlgorithm] : [],
		...themePlan,
	};
	return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
};
export default ThemeProvider;
