import { ConfigProvider, theme as antdTheme } from "antd";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useFlat } from "src/service";
import themeMap from "src/theme";

const ThemeProvider = (props: React.PropsWithChildren) => {
	const { children } = props;
	const { isThemeAuto, settingData, setTheme, currentTheme, language } =
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
		themeMap.Default(isDark);
	const themeConfig = {
		algorithm: isDark ? [antdTheme.darkAlgorithm] : [],
		...themePlan,
	};
	useEffect(() => {
		if (language == "en") {
			dayjs.locale("en");
		} else {
			dayjs.locale("zh-cn");
		}
	}, [language]);
	return (
		<ConfigProvider
			locale={
				{
					en: enUS,
					zh: zhCN,
				}[language]
			}
			theme={themeConfig}
		>
			{children}
		</ConfigProvider>
	);
};
export default ThemeProvider;
