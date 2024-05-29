import { Layout, theme } from "antd";
import React, { Suspense } from "react";
import Tabs from "src/components/navTabs";
const { Content } = Layout;
const MainContent = ({ children }: React.PropsWithChildren) => {
	const {
		token: { colorFillAlter },
	} = theme.useToken();
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				background: colorFillAlter,
				flex: 1,
				overflow: "auto",
				height: "100%",
				paddingLeft: "6px",
			}}
		>
			<Suspense>
				<Tabs />
			</Suspense>

			<Content
				style={{
					flex: 1,
					overflow: "auto",
					padding: 32,
					height: "100%",
					overflowX: "hidden",
				}}
			>
				{children}
			</Content>
		</div>
	);
};
export default MainContent;
