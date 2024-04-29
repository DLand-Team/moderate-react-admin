import { CaretRightOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";
import { Collapse, theme } from "antd";
import type { CSSProperties } from "react";
import React from "react";
import MainSetting from "./mainSetting";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
	panelStyle,
) => [
	{
		key: "1",
		label: "全局设置",
		children: <MainSetting />,
		style: panelStyle,
	},
	{
		key: "2",
		label: "This is panel header 2",
		children: <p>{text}</p>,
		style: panelStyle,
	},
	{
		key: "3",
		label: "This is panel header 3",
		children: <p>{text}</p>,
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
