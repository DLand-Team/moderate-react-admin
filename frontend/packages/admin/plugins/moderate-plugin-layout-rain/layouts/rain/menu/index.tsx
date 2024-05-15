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
		<>
			{menuData.length > 0 &&
				menuDefaultOpenKeys &&
				menuDefaultSelectedKeys && (
					<Menu
						triggerSubMenuAction="click"
						mode="horizontal"
						selectedKeys={menuDefaultSelectedKeys}
						defaultOpenKeys={menuDefaultOpenKeys!}
						style={{
							flex: 1,
							borderRight: 0,
							height: "100%",
							position: "relative",
							bottom: "-5px",
							background:'initial'
						}}
						items={MenuItems}
						onClick={({ key }) => {
							RouterHelper.jumpTo(key as ROUTE_ID_KEY);
						}}
					/>
				)}
		</>
	);
};

export default SliderMenu;
