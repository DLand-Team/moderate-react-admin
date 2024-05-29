import { Layout, Menu, theme as antdTheme } from "antd";
import { useMemo } from "react";
import { type Location } from "react-router-dom";
import { useLocationListen } from "src/common/hooks";
import { ROUTE_ID_KEY } from "src/router/types";
import { AppHelper, RouterHelper, useFlat } from "src/service";

const { Sider } = Layout;

const SliderMenu = () => {
	const {
		menuData,
		menuDefaultOpenKeys,
		menuDefaultSelectedKeys,
		setMenuDefaultOpenKeys,
		setMenuDefaultSelectedKeys,
		isCollapsedMenu,
		language,
	} = useFlat("appStore");
	const antdThemeToken = antdTheme.useToken();
	const MenuItems = useMemo(() => {
		return AppHelper.transMenuForAntdLoop(menuData);
	}, [menuData, language]);
	useLocationListen(
		(location: Location) => {
			const { pathname } = location;
			const { selectedKeys, openKeys } =
				AppHelper.getMenuConfigByPathName(pathname);
			setMenuDefaultSelectedKeys(selectedKeys);
			setMenuDefaultOpenKeys(openKeys);
		},
		[menuData],
	);
	return (
		<Sider
			theme={"light"}
			trigger={null}
			collapsible
			collapsed={isCollapsedMenu}
			width={260}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					fontSize: "20px",
					margin: "18px",
					fontWeight: "bold",
					whiteSpace: "nowrap",
					color: antdThemeToken.token.colorText,
				}}
			>
				{isCollapsedMenu ? "Admin" : "Moderate Admin"}
			</div>
			{menuData.length > 0 &&
				menuDefaultOpenKeys &&
				menuDefaultSelectedKeys && (
					<Menu
						triggerSubMenuAction="click"
						mode="inline"
						selectedKeys={menuDefaultSelectedKeys}
						defaultOpenKeys={menuDefaultOpenKeys!}
						style={{ height: "100%", borderRight: 0 }}
						items={MenuItems as any}
						onClick={({ key }) => {
							RouterHelper.jumpTo(key as ROUTE_ID_KEY);
						}}
					/>
				)}
		</Sider>
	);
};

export default SliderMenu;
