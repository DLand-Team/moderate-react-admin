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
				alignItems: "center",
			}}
		>
			<img
				style={{
					width: "36px",
					height: "36px",
					marginRight: "5px",
				}}
				src="/logo.png"
			></img>
			{isCollapsedMenu ? "Admin" : "Moderate Admin"}
		</div>
	);
};

export default NameInfo;
