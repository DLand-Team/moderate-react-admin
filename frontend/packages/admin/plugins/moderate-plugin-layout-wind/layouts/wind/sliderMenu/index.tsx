import { Layout, Menu } from "antd";
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
			style={{
				height: "100%",
				overflowX: "hidden",
				overflowY: "auto",
				padding: "8px 0px",
			}}
		>
			{menuData.length > 0 &&
				menuDefaultOpenKeys &&
				menuDefaultSelectedKeys && (
					<Menu
						triggerSubMenuAction="click"
						mode="inline"
						selectedKeys={menuDefaultSelectedKeys}
						defaultOpenKeys={menuDefaultOpenKeys!}
						style={{ height: "100%", borderRight: 0 }}
						items={MenuItems}
						onClick={({ key }) => {
							RouterHelper.jumpTo(key as ROUTE_ID_KEY);
						}}
					/>
				)}
		</Sider>
	);
};

export default SliderMenu;
