import { Layout, theme } from "antd";
import styles from "./index.module.scss";

import React, { Suspense, lazy } from "react";
import NavHeader from "./navHeader";
import SliderMenu from "./sliderMenu";

const MainContent = lazy(() => import("./mainContent"));
const { Footer } = Layout;
export const Wind = ({ children }: React.PropsWithChildren) => {
	const {
		token: { colorBgContainer, borderRadiusLG, colorBgLayout },
	} = theme.useToken();

	return (
		<div
			className={styles.content}
			style={{
				background: colorBgLayout,
			}}
		>
			<NavHeader></NavHeader>
			<div
				style={{
					display: "flex",
					padding: "10px 48px",
					flex: 1,
					height: 0,
					overflowY: "auto",

					overflowX: "hidden",
				}}
			>
				<div
					style={{
						display: "flex",
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
						flex: 1,
						height: "100%",
						overflow: "auto",
						width: 0,
					}}
				>
					<SliderMenu />
					<Suspense>
						<MainContent>{children}</MainContent>
					</Suspense>
				</div>
			</div>
			<Footer
				style={{ textAlign: "center", height: "30px", padding: "10px" }}
			>
				闲D岛🏝️
			</Footer>
		</div>
	);
};
