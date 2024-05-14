import {
	DesktopOutlined,
	FileOutlined,
	PieChartOutlined,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, ConfigProvider, Layout, Menu, theme } from "antd";
import React, { FC, useState } from "react";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem;
}

const items: MenuItem[] = [
	getItem("Option 1", "1", <PieChartOutlined />),
	getItem("Option 2", "2", <DesktopOutlined />),
	getItem("User", "sub1", <UserOutlined />, [
		getItem("Tom", "3"),
		getItem("Bill", "4"),
		getItem("Alex", "5"),
	]),
	getItem("Team", "sub2", <TeamOutlined />, [
		getItem("Team 1", "6"),
		getItem("Team 2", "8"),
	]),
	getItem("Files", "9", <FileOutlined />),
];

const LayoutDemo: React.FC<{
	themeConfig: any;
	isDark: boolean;
	CustomLayout?: FC;
}> = ({ themeConfig, isDark, CustomLayout = Layout }) => {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { borderRadiusLG },
	} = theme.useToken();
	const themeValue = {
		inherit: false,
		algorithm: isDark ? [theme.darkAlgorithm] : null,
		...themeConfig,
	};
	return (
		<ConfigProvider theme={themeValue}>
			<CustomLayout
				style={{
					width: "888px",
					height: "600px",
				}}
			>
				<Sider
					collapsed={collapsed}
					onCollapse={(value) => setCollapsed(value)}
				>
					<div className="demo-logo-vertical" />
					<Menu
						defaultSelectedKeys={["1"]}
						mode="inline"
						items={items}
						style={{
							height: "100%",
						}}
					/>
				</Sider>
				<Layout>
					<Header
						style={{
							padding: 0,
							background:
								theme.getDesignToken(themeValue)
									.colorBgContainer,
						}}
					/>
					<Content style={{ margin: "0 16px" }}>
						<Breadcrumb style={{ margin: "16px 0" }}>
							<Breadcrumb.Item>User</Breadcrumb.Item>
							<Breadcrumb.Item>Bill</Breadcrumb.Item>
						</Breadcrumb>
						<div
							style={{
								padding: 24,
								minHeight: 360,
								background:
									theme.getDesignToken(themeValue)
										.colorBgContainer,
								borderRadius: borderRadiusLG,
							}}
						>
							Bill is a cat.
						</div>
					</Content>
				</Layout>
			</CustomLayout>
		</ConfigProvider>
	);
};

export default LayoutDemo;
