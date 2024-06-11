import { Layout } from "antd";
import Tabs from "src/components/navTabs";
import { useFlat } from "src/service";

const { Content } = Layout;
const MainContent = ({
	children,
	isDark,
}: React.PropsWithChildren<{ isDark?: boolean }>) => {
	const { currentTheme } = useFlat("appStore");
	let darkFlag = currentTheme == "dark";
	if (isDark !== undefined) {
		darkFlag = isDark;
	}
	return (
		<Content
			style={{
				padding: "12px",
				display: "flex",
				flexDirection: "column",
				height: "100%",
				background: darkFlag ? "#282c34" : "#eff1f3",
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
