import KeepAlive from "@/common/hocs/keepAlive";
import themeProviderHoc from "@/common/hocs/themeHoc/themeHoc";
import { initAllStores, useFlatInject } from "@/common/hooks";
import useLocationListen from "@/common/hooks/useLocationListen";
import { ROUTE_ID } from "@/config/routerConfig";
import { routerHelper } from "@/services";
import defaultTopPermission from "@/static/defaultTopPermission";
import { Button, Layout, Menu, Modal } from "antd";
import { type Location } from "react-router-dom";
import Breadcrumb from "./components/breadcrumb/breadcrumb";
import Tabs from "./components/tabs/tabs";
import styles from "./homePage.module.scss";

const { Header, Content, Sider } = Layout;

const HomePage = () => {
	const { updatePermissions } = useFlatInject("userInfoStore")[0];
	const {
		menuData,
		menuDefaultOpenKeys,
		menuDefaultSelectedKeys,
		addTabHistoryActionAct,
		setMenuDefaultOpenKeysAct,
		setMenuDefaultSelectedKeysAct,
	} = useFlatInject("appStore")[0];

	useLocationListen((location: Location) => {
		const { pathname } = location;
		const selectedKeysTemp = pathname.split("/").filter((item) => {
			return item;
		});
		setMenuDefaultSelectedKeysAct([selectedKeysTemp.slice(-1)[0]]);
		const openKeysTemp = selectedKeysTemp.slice(
			1,
			selectedKeysTemp.length - 1,
		);
		setMenuDefaultOpenKeysAct(openKeysTemp.length ? openKeysTemp : []);
		addTabHistoryActionAct(location);
	});
	return (
		<Layout className={styles.content}>
			<Header className="header">
				<div className={styles.logo}>Scaling Admin Console System</div>
				<Button
					type="primary"
					onClick={() => {
						Modal.confirm({
							title: "确定么？",
							content: "更新权限之后，需要重新登陆",
							onOk: () => {
								{
									// updatePermissions(
									// 	defaultTopPermission,
									// ).then(() => {

									// });
									initAllStores();
									routerHelper.init();
									routerHelper.jumpTo(ROUTE_ID.loginPage);
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
					{menuData.length > 0 && menuDefaultOpenKeys && (
						<Menu
							theme="dark"
							mode="inline"
							selectedKeys={menuDefaultSelectedKeys}
							defaultOpenKeys={menuDefaultOpenKeys}
							style={{ height: "100%", borderRight: 0 }}
							items={menuData}
							onClick={({ key }) => {
								routerHelper.jumpTo(key);
							}}
						/>
					)}
				</Sider>
				<Layout style={{ padding: "0 24px 24px" }}>
					<Breadcrumb />
					<Content
						className="site-layout-background"
						style={{
							margin: 0,
							minHeight: 280,
							height: "100%",
							overflow: "auto",
						}}
					>
						<Tabs></Tabs>
						<div
							style={{
								overflow: "auto",
								padding: 32,
								background: "white",
							}}
						>
							<KeepAlive
								include={routerHelper.getKeepAliveRoutePath()}
							></KeepAlive>
						</div>
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default themeProviderHoc(HomePage, {});
