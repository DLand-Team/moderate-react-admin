import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	MoonOutlined,
	SunOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Modal, theme as antdTheme } from "antd";
import { type Location } from "react-router-dom";
import useLocationListen from "src/common/hooks/useLocationListen";
import { ROUTE_ID } from "src/config/routerConfig";
import { ROUTE_ID_KEY } from "src/config/types";
import { useFlat, useResetRedux } from "src/reduxService";
import { AppHelper, RouterHelper } from "src/reduxService/helper";
import { ThemeName } from "src/reduxService/stores/appStore/modal";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import OptionsDrawer from "../../components/optionsDrawer";
import OptionsFloatBtn from "../../components/optionsFloatBtn";
import Tabs from "../../components/tabs/tabs";
import styles from "./index.module.scss";

const { Header, Content, Sider } = Layout;
const ThemeSeq: ThemeName[] = ["light", "dark", "auto"];
const HomePage = ({ children }: React.PropsWithChildren) => {
	const {
		menuData,
		menuDefaultOpenKeys,
		menuDefaultSelectedKeys,
		setMenuDefaultOpenKeys,
		setMenuDefaultSelectedKeys,
		theme,
		setTheme,
		isCollapsedMenu,
		setIsCollapsedMenu,
	} = useFlat("appStore");
	// todo loop一下menuData里面的icon
	// redux不让存在element，必须存在传统类型，无语
	let themIndex = ThemeSeq.findIndex((item) => {
		return item === theme;
	});
	const resetAllStores = useResetRedux();
	const antdThemeToken = antdTheme.useToken();
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
		<Layout className={styles.content}>
			<Layout>
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
						{isCollapsedMenu ? "M" : "Moderate React admin"}
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
								items={AppHelper.transMenuForAntdLoop(menuData)}
								onClick={({ key }) => {
									RouterHelper.jumpTo(key as ROUTE_ID_KEY);
								}}
							/>
						)}
				</Sider>
				<Layout>
					<Header
						style={{
							background: antdThemeToken.token.colorBgContainer,
							display: "flex",
							alignItems: "center",
							position: "relative",
							paddingLeft: "60px",
						}}
					>
						<Button
							type="primary"
							style={{
								position: "absolute",
								left: "0px",
							}}
							onClick={() => {
								setIsCollapsedMenu(!isCollapsedMenu);
							}}
						>
							{isCollapsedMenu ? (
								<MenuUnfoldOutlined />
							) : (
								<MenuFoldOutlined />
							)}
						</Button>
						<Breadcrumb />
						<div className={styles.resetBtn}>
							<Button
								style={{
									width: "50px",
								}}
								onClick={() => {
									themIndex++;
									if (themIndex > ThemeSeq.length - 1) {
										themIndex = 0;
									}
									setTheme(ThemeSeq[themIndex]);
								}}
								icon={
									[
										<SunOutlined />,
										<MoonOutlined />,
										<div>AUTO</div>,
									][themIndex]
								}
							></Button>
							<Button
								type="primary"
								onClick={() => {
									Modal.confirm({
										title: "确定么？",
										content: "更新权限之后，需要重新登陆",
										onOk: () => {
											{
												resetAllStores();
												RouterHelper.jumpTo(
													ROUTE_ID.loginPage,
												);
											}
										},
									});
								}}
							>
								退出
							</Button>
						</div>
					</Header>
					<Content
						style={{
							padding: "12px",
							display: "flex",
							flexDirection: "column",
						}}
					>
						<Tabs />
						<div
							style={{
								flex: 1,
								overflow: "auto",
								padding: 32,
								background:
									antdThemeToken.token.colorBgContainer,
							}}
						>
							{children}
						</div>
					</Content>
				</Layout>
			</Layout>
			{/* 仅开发模式 */}
			{process.env.NODE_ENV == "development" && (
				<>
					<OptionsFloatBtn />
					<OptionsDrawer />
				</>
			)}
		</Layout>
	);
};

export default HomePage;
