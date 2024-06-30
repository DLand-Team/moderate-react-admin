import { Layout, theme } from "antd";
import styles from "./index.module.scss";
import MainContent from "./mainContent";
import NavHeader from "./navHeader";
import React from "react";
import { NameInfo, SliderMenu } from "src/components";

export const DefaultLayout = ({
	children,
	...rest
}: React.PropsWithChildren) => {
	const {
		token: { colorBgBase },
	} = theme.useToken();
	return (
		<Layout className={styles.content} {...rest}>
			<div>
				<div
					style={{
						background: colorBgBase,
						padding: "12px",
						height: "100%",
					}}
				>
					<NameInfo />
					<div
						style={{
							height: "100%",
							overflowX: "hidden",
							overflowY: "auto",
						}}
					>
						<SliderMenu />
					</div>
				</div>
			</div>

			<Layout>
				<NavHeader />
				<Layout>
					<MainContent>{children}</MainContent>
				</Layout>
			</Layout>
		</Layout>
	);
};
