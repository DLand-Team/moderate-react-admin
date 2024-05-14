import { CaretRightOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";
import { Collapse, theme } from "antd";
import type { CSSProperties } from "react";
import React from "react";
import MainSetting from "./mainSetting";

const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
	panelStyle,
) => [
	{
		key: "1",
		label: (
			<div
				style={{
					fontSize: "20px",
					lineHeight: "20px",
					fontWeight: "bold",
				}}
			>
				{"主题设置"}
			</div>
		),
		children: <MainSetting />,
		style: panelStyle,
	},
];

const SettingContent: React.FC = () => {
	const { token } = theme.useToken();

	const panelStyle: React.CSSProperties = {
		marginBottom: 24,
		background: token.colorFillAlter,
		borderRadius: token.borderRadiusLG,
		border: "none",
	};

	return (
		<Collapse
			collapsible={"icon"}
			bordered={false}
			defaultActiveKey={["1"]}
			expandIcon={({ isActive }) => (
				<CaretRightOutlined rotate={isActive ? 90 : 0} />
			)}
			style={{
				background:
					token.Menu?.["colorBgContainer" as keyof typeof token.Menu],
			}}
			items={getItems(panelStyle)}
		/>
	);
};

export default SettingContent;
