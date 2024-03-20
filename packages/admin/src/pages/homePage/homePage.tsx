import { Button, Layout, Menu, Modal } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { Outlet, type Location } from "react-router-dom";
import themeProviderHoc from "src/common/hocs/themeHoc/themeHoc";
import useLocationListen from "src/common/hooks/useLocationListen";
import { ROUTE_ID } from "src/config/routerConfig";
import { useFlat, useResetRedux } from "src/reduxService";
import { RouterHelper } from "src/reduxService/helper";
import Breadcrumb from "./components/breadcrumb/breadcrumb";
import Tabs from "./components/tabs/tabs";
import styles from "./homePage.module.scss";

const { Header, Content, Sider } = Layout;

const HomePage = () => {
	const {
		menuData,
		menuDefaultOpenKeys,
		menuDefaultSelectedKeys,
		addTabHistoryActionAct,
		setMenuDefaultOpenKeys,
		setMenuDefaultSelectedKeys,
	} = useFlat("appStore");

	const resetAllStores = useResetRedux();
	useLocationListen(
		(location: Location) => {
			const { pathname } = location;
			const selectedKeysTemp = pathname.split("/").filter((item) => {
				return item;
			});
			setMenuDefaultSelectedKeys(selectedKeysTemp);
			const openKeysTemp = selectedKeysTemp.slice(
				1,
				selectedKeysTemp.length - 1,
			);
			setMenuDefaultOpenKeys(openKeysTemp.length ? openKeysTemp : []);
			addTabHistoryActionAct({ newItem: location });
		},
		[menuData],
	);
	return (
		<Layout className={styles.content}>
			<Header className="header">
				<div className={styles.logo}>Moderate React admin</div>
				<Button
					type="primary"
					onClick={() => {
						Modal.confirm({
							title: "确定么？",
							content: "更新权限之后，需要重新登陆",
							onOk: () => {
								{
									resetAllStores();
									RouterHelper.jumpTo(ROUTE_ID.loginPage);
								}
							},
						});
					}}
					className={styles.resetBtn}
				>
					退出
				</Button>
			</Header>
			<Layout>
				<Sider width={260} className="site-layout-background">
					{menuData.length > 0 && (
						<Menu
							triggerSubMenuAction="click"
							mode="inline"
							selectedKeys={menuDefaultSelectedKeys}
							defaultOpenKeys={menuDefaultOpenKeys!}
							style={{ height: "100%", borderRight: 0 }}
							items={menuData as ItemType[]}
							onClick={({ key }) => {
								RouterHelper.jumpTo(key);
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
								backgroundColor: "white",
							}}
						>
							<Outlet />
						</div>
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default themeProviderHoc(HomePage, {});
