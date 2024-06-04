import { theme as antdTheme } from "antd";
import { useFlat } from "src/service";
const NameInfo = () => {
	const { isCollapsedMenu, settingData } = useFlat("appStore");
	const { projectName, logo } = settingData;
	const antdThemeToken = antdTheme.useToken();
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				fontSize: "20px",
				margin: "0px 18px",
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
				src={logo}
			></img>
			{isCollapsedMenu ? "" : projectName}
		</div>
	);
};

export default NameInfo;
