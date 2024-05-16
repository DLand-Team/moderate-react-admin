import { Layout } from "antd";
import Tabs from "src/components/navTabs";
import { useFlat } from "src/service";

const { Content } = Layout;
const MainContent = ({ children }: React.PropsWithChildren) => {
	const { currentTheme } = useFlat("appStore");
	return (
		<Content
			style={{
				padding: "12px",
				display: "flex",
				flexDirection: "column",
				background: currentTheme == "dark" ? "#282c34" : "#eff1f3",
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
