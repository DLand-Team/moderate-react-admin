import { Layout } from "antd";
import Tabs from "src/components/navTabs";

const { Content } = Layout;
const MainContent = ({ children }: React.PropsWithChildren) => {
	return (
		<Content
			style={{
				padding: "12px",
				display: "flex",
				flexDirection: "column",
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
