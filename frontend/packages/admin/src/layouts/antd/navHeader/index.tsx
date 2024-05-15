import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	MoonOutlined,
	SunOutlined,
	SyncOutlined,
} from "@ant-design/icons";
import {
	Button,
	Dropdown,
	Layout,
	MenuProps,
	Modal,
	Space,
	theme as antdTheme,
} from "antd";
import themeHoc from "src/common/hocs/themeHoc/themeHoc";
import storageHelper from "src/common/utils/storageHelper";
import CustomBreadcrumb from "src/components/customBreadcrumb";
import { ROUTE_ID } from "src/router/name";
import { RouterHelper, useFlat, useResetRedux } from "src/service";
import styles from "./index.module.scss";
import { ThemeColor } from "src/service/stores/appStore/slice";
import { useTranslation } from "react-i18next";
const items = [
	{
		icon: <MoonOutlined />,
		label: "月光",
		key: ThemeColor.dark,
	},
	{
		icon: <SunOutlined />,
		label: "明亮",
		key: ThemeColor.light,
	},
	{
		icon: <SyncOutlined />,
		label: "系统",
		key: "auto",
	},
];
const CustomDropdownButton = themeHoc(Dropdown.Button, {
	token: {
		colorPrimary: "red",
	},
});

const lngList: MenuProps["items"] = [
	{
		key: "zh",
		label: "中文",
	},
	{
		key: "en",
		label: "英文",
	},
];

const NavHeader = () => {
	const {
		isThemeAuto,
		setTheme,
		setIsThemeAuto,
		currentTheme,
		isCollapsedMenu,
		setIsCollapsedMenu,
		setLanguage,
		language,
	} = useFlat("appStore");
	const resetAllStores = useResetRedux();
	const antdThemeToken = antdTheme.useToken();
	const { i18n } = useTranslation();
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
			<div className={styles.toolBtnList}>
				<Dropdown
					menu={{
						items: lngList,
						selectable: true,
						defaultSelectedKeys: ["3"],
						onClick: (e) => {
							i18n.changeLanguage(e.key);
							setLanguage(e.key);
						},
					}}
				>
					<Space>
						<Button>
							{
								{
									zh: "中文",
									en: "EN",
								}[language]
							}
						</Button>
					</Space>
				</Dropdown>
				<CustomDropdownButton
					trigger={["click", "hover"]}
					placement="bottomRight"
					buttonsRender={() => {
						return [
							<Button type="primary">
								{isThemeAuto
									? "跟随系统"
									: items.find((item) => {
											return item.key == currentTheme;
										})?.label}
							</Button>,
							<Button
								type="primary"
								icon={
									items.find((item) => {
										return item.key == currentTheme;
									})?.icon
								}
							></Button>,
						];
					}}
					type="primary"
					menu={{
						items: items,
						onClick: (e) => {
							if (e.key == "auto") {
								setIsThemeAuto(true);
							} else {
								setIsThemeAuto(false);
								setTheme(e.key as ThemeColor);
							}
						},
					}}
					icon={<MoonOutlined />}
				></CustomDropdownButton>
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
