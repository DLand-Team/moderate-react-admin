import { theme as antdTheme } from "antd";
import { useFlat } from "src/service";
const NameInfo = () => {
	const { isCollapsedMenu, settingData } = useFlat("appStore");
	const antdThemeToken = antdTheme.useToken();
	const { projectName, logo } = settingData;
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				fontSize: "20px",
				fontWeight: "bold",
				whiteSpace: "nowrap",
				color: antdThemeToken.token.colorText,
				alignItems: "center",
				position: "relative",
				left: isCollapsedMenu ? "0px" : "-15px",
			}}
		>
			<img
				style={{
					width: "36px",
					height: "36px",
					marginRight: "5px",
					marginTop: "5px",
				}}
				src={logo}
			></img>
			{isCollapsedMenu ? "" : projectName}
		</div>
	);
};

export default NameInfo;
