import { Layout, theme } from "antd";
import Tabs from "src/components/navTabs";

const { Content } = Layout;
const MainContent = ({ children }: React.PropsWithChildren) => {
	const {
		token: { colorFillAlter },
	} = theme.useToken();
	return (
		<Content
			style={{
				margin: "12px",
				display: "flex",
				flexDirection: "column",
				height: "100%",
				background: colorFillAlter,
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
