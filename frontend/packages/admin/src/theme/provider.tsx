import { ConfigProvider, theme as antdTheme } from "antd";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useFlat } from "src/reduxService";

const ThemeProvider = (props: React.PropsWithChildren) => {
	const { children } = props;
	const { setTheme, theme } = useFlat("appStore");
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
			} else {
				setTheme(newValue);
			}
		},
	);
	// 如果是auto，那么就跟随系统
	const isDark = theme == "auto" ? isSysDark : currentTheme == "dark";

	const themeConfig = {
		algorithm: isDark ? [antdTheme.darkAlgorithm] : [],
	};
	return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
};
export default ThemeProvider;
