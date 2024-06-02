import { Layout, theme } from "antd";
import CustomBreadcrumb from "src/components/customBreadcrumb";
import styles from "./index.module.scss";
import MainContent from "./mainContent";
import NavHeader from "./navHeader";
import React from "react";
const { Content, Footer } = Layout;
export const Rain = ({ children, ...rest }: React.PropsWithChildren) => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	return (
		<Layout {...rest} className={styles.content}>
			<NavHeader></NavHeader>
			<Content
				style={{
					display: "flex",
					flexDirection: "column",
					padding: "10px 68px",
				}}
			>
				<CustomBreadcrumb />
				<Layout
					style={{
						flex: 1,
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
						overflow: "auto",
					}}
				>
					<MainContent>{children}</MainContent>
				</Layout>
			</Content>
			<Footer style={{ textAlign: "center" }}>闲D岛🏝️</Footer>
		</Layout>
	);
};
