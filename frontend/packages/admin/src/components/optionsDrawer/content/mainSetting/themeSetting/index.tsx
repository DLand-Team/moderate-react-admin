import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Cascader, Divider, Switch } from "antd";
import type { SingleCascaderProps } from "antd/es/cascader";
import React, { useState } from "react";
import themeMap from "src/theme";
import LayoutDemo from "./layoutDemo";

interface Option {
	value: string;
	label: string;
	children?: Option[];
	level?: number;
}

const options: Option[] = Object.keys(themeMap).map((key) => {
	return {
		value: key,
		label: key,
		children: [
			{
				value: key,
				label: key,
				level: 1,
			},
		],
	};
});

const onChange: SingleCascaderProps<Option>["onChange"] = (value) => {
	console.log(value);
};

// Just show the latest item.
const displayRender = (labels: string[]) => labels[labels.length - 1];

const ThemeSetting: React.FC = () => {
	const [isDark, setIsDark] = useState(false);
	return (
		<Cascader
			options={options}
			displayRender={displayRender}
			onChange={onChange}
			changeOnSelect
			optionRender={(option) => {
				if (option.level == 1) {
					return (
						<div
							style={{
								height: "162px",
							}}
						>
							<div
								style={{
									width: "200px",
									height: "580px",
									transform:
										"scale(0.24) translate(-340px,-880px)",
								}}
							>
								<LayoutDemo
									isDark={isDark}
									themeConfig={themeMap[
										option.value as keyof typeof themeMap
									](isDark)}
								/>
							</div>
						</div>
					);
				} else {
					return option.label;
				}
			}}
			dropdownRender={(menus: React.ReactNode) => {
				return (
					<div>
						{menus}
						<Divider style={{ margin: 0 }} />
						<Switch
							checked={isDark}
							onClick={(_, e) => {
								e.stopPropagation();
								setIsDark(_);
							}}
							checkedChildren={<MoonOutlined />}
							unCheckedChildren={<SunOutlined />}
							defaultChecked
							style={{
								margin: "10px",
							}}
						/>
					</div>
				);
			}}
		/>
	);
};

export default ThemeSetting;
