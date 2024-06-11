import { Layout, Menu, theme as antdTheme } from "antd";
import { useMemo } from "react";
import { type Location } from "react-router-dom";
import { useLocationListen } from "src/common/hooks";
import { ROUTE_ID_KEY } from "src/router/types";
import { AppHelper, RouterHelper, useFlat } from "src/service";

const { Sider } = Layout;

const SliderMenu = ({ isMobile }: { isMobile?: boolean }) => {
	const {
		menuData,
		menuDefaultOpenKeys,
		menuDefaultSelectedKeys,
		setMenuDefaultOpenKeys,
		setMenuDefaultSelectedKeys,
		isCollapsedMenu,
		language,
		settingData,
	} = useFlat("appStore");
	const { projectName, logo } = settingData;
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
	const menuNode = (
		<div
			style={{
				height: "100%",
				overflow: "hidden",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					fontSize: "20px",
					margin: "8px 0px 18px 0px",
					fontWeight: "bold",
					whiteSpace: "nowrap",
					color: antdThemeToken.token.colorText,
					alignItems: "center",
					position: "relative",
					left: isCollapsedMenu ? "0px" : "-15px",
				}}
			>
				<img
					style={{
						width: "36px",
						height: "36px",
						marginRight: "5px",
						marginTop: "5px",
					}}
					src={logo}
				></img>
				{isCollapsedMenu ? "" : projectName}
			</div>
			{menuData.length > 0 &&
				menuDefaultOpenKeys &&
				menuDefaultSelectedKeys && (
					<Menu
						triggerSubMenuAction="click"
						mode="inline"
						selectedKeys={menuDefaultSelectedKeys}
						defaultOpenKeys={menuDefaultOpenKeys!}
						style={{
							height: "100%",
							borderRight: 0,
							overflow: "auto",
						}}
						items={MenuItems as any}
						onClick={({ key }) => {
							RouterHelper.jumpTo(key as ROUTE_ID_KEY);
						}}
					/>
				)}
		</div>
	);
	if (isMobile) {
		return menuNode;
	}
	return (
		<Sider
			theme={"light"}
			trigger={null}
			collapsible
			collapsed={isCollapsedMenu}
			width={260}
		>
			{menuNode}
		</Sider>
	);
};

export default SliderMenu;
