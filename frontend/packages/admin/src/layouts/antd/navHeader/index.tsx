import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	MoonOutlined,
	SunOutlined,
} from "@ant-design/icons";
import { Button, Layout, Modal, theme as antdTheme } from "antd";
import CustomBreadcrumb from "src/components/customBreadcrumb";
import { RouterHelper, useFlat, useResetRedux } from "src/service";
import styles from "./index.module.scss";
import { ThemeName } from "src/service/stores/appStore/modal";
import storageHelper from "src/common/utils/storageHelper";
import { ROUTE_ID } from "src/router/name";

const ThemeSeq: (ThemeName | "auto")[] = ["light", "dark", "auto"];

const NavHeader = () => {
	const { setTheme, currentTheme, isCollapsedMenu, setIsCollapsedMenu } =
		useFlat("appStore");
	// todo loop一下menuData里面的icon
	// redux不让存在element，必须存在传统类型，无语
	let themIndex = ThemeSeq.findIndex((item) => {
		return item === currentTheme;
	});
	const resetAllStores = useResetRedux();
	const antdThemeToken = antdTheme.useToken();
	return (
		<Layout.Header
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
			<CustomBreadcrumb />
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
						if (ThemeSeq[themIndex] !== "auto") {
							setTheme(ThemeSeq[themIndex] as ThemeName);
						}
					}}
					icon={
						[<SunOutlined />, <MoonOutlined />, <div>AUTO</div>][
							themIndex
						]
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
		</Layout.Header>
	);
};

export default NavHeader;
