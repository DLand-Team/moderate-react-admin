import { Layout, theme } from "antd";
import Tabs from "src/components/navTabs";
import React from "react";

const { Content } = Layout;
const MainContent = ({ children }: React.PropsWithChildren) => {
	const {
		token: { colorFillAlter },
	} = theme.useToken();
	return (
		<Content
			style={{
				padding: "12px",
				display: "flex",
				flexDirection: "column",
				background: colorFillAlter,
				overflow: "auto",
				flex: 1,
			}}
		>
			<Tabs />
			<div
				style={{
					flex: 1,
					overflow: "auto",
					padding: 32,
					height: "100%",
				}}
			>
				{children}
			</div>
		</Content>
	);
};
export default MainContent;
