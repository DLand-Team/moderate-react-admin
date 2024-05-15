import { Layout, theme } from "antd";
import styles from "./index.module.scss";
import MainContent from "./mainContent";
import NavHeader from "./navHeader";
import SliderMenu from "./menu";
import CustomBreadcrumb from "src/components/customBreadcrumb";
const { Content, Footer } = Layout;
export const Rain = ({ children, ...rest }: React.PropsWithChildren) => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	return (
		<Layout {...rest} className={styles.content}>
			<NavHeader></NavHeader>

			<Content style={{ padding: "10px 48px" }}>
				<CustomBreadcrumb />
				<Layout
					style={{
						padding: "24px 0",
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
						height: "100%",
					}}
				>
					<MainContent>{children}</MainContent>
				</Layout>
			</Content>
			<Footer style={{ textAlign: "center" }}>闲D岛🏝️</Footer>
		</Layout>
	);
};
