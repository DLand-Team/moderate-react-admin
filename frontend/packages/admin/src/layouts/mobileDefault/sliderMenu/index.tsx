import { Menu, theme as antdTheme } from "antd";
import { useMemo } from "react";
import { type Location } from "react-router-dom";
import { useLocationListen } from "src/common/hooks";
import { ROUTE_ID_KEY } from "src/router/types";
import { AppHelper, RouterHelper, useFlat } from "src/service";

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
		<div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					fontSize: "20px",
					fontWeight: "bold",
					whiteSpace: "nowrap",
					color: antdThemeToken.token.colorText,
					alignItems: "center",
					position: "relative",
					marginLeft: "10px",
				}}
			>
				<img
					style={{
						width: "36px",
						height: "36px",
						marginRight: "5px",
						marginTop: "5px",
					}}
					src="/logo.png"
				></img>
				{isCollapsedMenu ? "" : "Moderate Admin"}
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
		</div>
	);
};

export default SliderMenu;
