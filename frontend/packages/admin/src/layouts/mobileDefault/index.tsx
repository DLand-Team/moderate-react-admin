import { Layout } from "antd";
import React from "react";
import styles from "./index.module.scss";
import MainContent from "./mainContent";
import NavHeader from "./navHeader";

export const MobileDefault = ({
	children,
	...rest
}: React.PropsWithChildren) => {
	return (
		<Layout className={styles.content} {...rest}>
			<Layout>
				<NavHeader />
				<Layout>
					<MainContent>{children}</MainContent>
				</Layout>
			</Layout>
		</Layout>
	);
};
