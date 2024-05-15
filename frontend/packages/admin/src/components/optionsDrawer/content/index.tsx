import { CaretRightOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";
import { Collapse, theme } from "antd";
import type { CSSProperties } from "react";
import React from "react";
import MainSetting from "./mainSetting";
import { useTranslation } from "react-i18next";

const SettingContent: React.FC = () => {
	const { token } = theme.useToken();
	const { t } = useTranslation();
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
					{t("app:themeSet")}
				</div>
			),
			children: <MainSetting />,
			style: panelStyle,
		},
	];
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
