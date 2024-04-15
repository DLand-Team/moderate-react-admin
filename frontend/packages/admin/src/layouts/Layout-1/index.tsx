import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Modal, theme as antdTheme } from "antd";
import { type Location } from "react-router-dom";
import useLocationListen from "src/common/hooks/useLocationListen";
import { useFlat, useResetRedux } from "src/reduxService";
import { AppHelper, RouterHelper } from "src/reduxService/helper";
import { ThemeName } from "src/reduxService/stores/appStore/modal";
import Breadcrumb from "../../pages/HomePage/components/breadcrumb/breadcrumb";
import OptionsDrawer from "../../pages/HomePage/components/optionsDrawer";
import OptionsFloatBtn from "../../pages/HomePage/components/optionsFloatBtn";
import Tabs from "../../pages/HomePage/components/tabs/tabs";
import styles from "./index.module.scss";
import storageHelper from "src/common/utils/storageHelper";
import { ROUTE_ID } from "src/router/name";
import { ROUTE_ID_KEY } from "src/router/types";

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
	} = useFlat("appStore");
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
			<Header
				style={{
					background: antdThemeToken.token.colorBgContainer,
				}}
			>
				<div className={styles.logo}>用户中心</div>
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
										storageHelper.clear();
										RouterHelper.jumpTo(ROUTE_ID.LoginPage);
									}
								},
							});
						}}
					>
						退出
					</Button>
				</div>
			</Header>
			<Layout>
				<Sider width={260} className="site-layout-background">
					{menuData.length > 0 &&
						menuDefaultOpenKeys &&
						menuDefaultSelectedKeys && (
							<Menu
								triggerSubMenuAction="click"
								mode="inline"
								selectedKeys={menuDefaultSelectedKeys}
								defaultOpenKeys={menuDefaultOpenKeys!}
								style={{ height: "100%", borderRight: 0 }}
								items={menuData}
								onClick={({ key }) => {
									RouterHelper.jumpTo(key as ROUTE_ID_KEY);
								}}
							/>
						)}
				</Sider>
				<Layout style={{ padding: "0 24px 24px" }}>
					<Breadcrumb />
					<Content
						style={{
							margin: 0,
							minHeight: 280,
							height: "100%",
							overflow: "auto",
						}}
					>
						<Tabs />
						<div
							style={{
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
