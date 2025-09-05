import { Menu } from "antd";
import { useMemo } from "react";
import { type Location } from "react-router-dom";
import { useLocationListen } from "src/common/hooks";
import { ROUTE_ID_KEY } from "src/router/types";
import { appHelper, routerHelper, useFlat } from "src/service";

const SliderMenu = () => {
	const {
		menuData,
		menuDefaultOpenKeys,
		menuDefaultSelectedKeys,
		setMenuDefaultOpenKeys,
		setMenuDefaultSelectedKeys,
		language,
	} = useFlat("appStore");
	const MenuItems = useMemo(() => {
		return appHelper.transMenuForAntdLoop(menuData);
	}, [menuData, language]);
	useLocationListen(
		(location: Location) => {
			const { pathname } = location;
			const { selectedKeys, openKeys } =
				appHelper.getMenuConfigByPathName(pathname);
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
						style={{
							flex: 1,
							borderRight: 0,
							height: "100%",
							position: "relative",
							bottom: "-5px",
							background: "initial",
						}}
						items={MenuItems}
						onClick={({ key }) => {
							routerHelper.jumpTo(key as ROUTE_ID_KEY);
						}}
					/>
				)}
		</>
	);
};

export default SliderMenu;
