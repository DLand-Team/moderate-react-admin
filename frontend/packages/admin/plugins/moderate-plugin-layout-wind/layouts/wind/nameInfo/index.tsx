import { theme as antdTheme } from "antd";
import { useFlat } from "src/service";
const NameInfo = () => {
	const { isCollapsedMenu } = useFlat("appStore");
	const antdThemeToken = antdTheme.useToken();
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				fontSize: "20px",
				margin: "18px",
				fontWeight: "bold",
				whiteSpace: "nowrap",
				color: antdThemeToken.token.colorText,
			}}
		>
			{isCollapsedMenu ? "Admin" : "Moderate Admin"}
		</div>
	);
};

export default NameInfo;
