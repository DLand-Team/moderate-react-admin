import { Cascader, Divider, Typography } from "antd";
import { cloneDeep } from "lodash-es";
import React from "react";
import layoutMap from "src/layouts";
import { useFlat } from "src/service";
import { ThemeName } from "src/service/stores/appStore/modal";
import themeMap from "src/theme";
import LayoutDemo from "./layoutDemo";

interface Option {
	value: string;
	label: string;
	children?: Option[];
	level?: number;
}

const { Text } = Typography;
// Just show the latest item.
const displayRender = (labels: string[]) => labels[labels.length - 1];

const ThemeSetting: React.FC = () => {
	const { settingData, setSettingData } = useFlat("appStore");

	const { paletteSet, layoutSet } = settingData || {};
	const onChange = (value: any, themeColor: ThemeName) => {
		let settingDataTemp = cloneDeep(settingData);
		if (!settingDataTemp!.paletteSet) {
			settingDataTemp!.paletteSet = {} as any;
		}
		settingDataTemp!.paletteSet![themeColor] = value[0] as any;
		settingDataTemp && setSettingData(settingDataTemp);
	};
	const onLayoutChange = (value: any, themeColor: ThemeName) => {
		let settingDataTemp = cloneDeep(settingData);
		if (!settingDataTemp!.layoutSet) {
			settingDataTemp!.layoutSet = {} as any;
		}
		settingDataTemp!.layoutSet![themeColor] = value[0] as any;
		settingDataTemp && setSettingData(settingDataTemp);
	};
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
	const layoutOptions: Option[] = Object.keys(layoutMap).map((key) => {
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
	return (
		<>
			<>
				<div
					style={{
						marginBottom: "16px",
						fontWeight: "bold",
					}}
				>
					配色方案
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						marginBottom: "16px",
					}}
				>
					<div>
						<Text>明：</Text>
					</div>

					<Cascader
						defaultValue={[
							paletteSet?.light! in themeMap
								? paletteSet?.light!
								: "antd",
						]}
						options={options}
						displayRender={displayRender}
						onChange={(value) => {
							onChange(value, "light");
						}}
						changeOnSelect
						allowClear={false}
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
												isDark={false}
												themeConfig={themeMap[
													option.value as keyof typeof themeMap
												](false)}
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
								</div>
							);
						}}
					/>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<Typography>暗：</Typography>
					<Cascader
						defaultValue={[
							paletteSet?.dark! in themeMap
								? paletteSet?.dark!
								: "antd",
						]}
						options={options}
						displayRender={displayRender}
						onChange={(value) => {
							onChange(value, "dark");
						}}
						changeOnSelect
						allowClear={false}
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
												isDark={true}
												themeConfig={themeMap[
													option.value as keyof typeof themeMap
												](true)}
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
								</div>
							);
						}}
					/>
				</div>
			</>
			<div
				style={{
					marginTop: "20px",
				}}
			>
				<div
					style={{
						marginBottom: "16px",
						fontWeight: "bold",
					}}
				>
					布局方案
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						marginBottom: "16px",
					}}
				>
					<div>
						<Text>明：</Text>
					</div>

					<Cascader
						defaultValue={[
							layoutSet?.light! in layoutMap
								? layoutSet?.light!
								: ("antd" as any),
						]}
						options={layoutOptions}
						displayRender={displayRender}
						onChange={(value) => {
							onLayoutChange(value, "light");
						}}
						changeOnSelect
						allowClear={false}
						// optionRender={(option) => {
						// 	if (option.level == 1) {
						// 		return (
						// 			<div
						// 				style={{
						// 					height: "162px",
						// 				}}
						// 			>
						// 				<div
						// 					style={{
						// 						width: "200px",
						// 						height: "580px",
						// 						transform:
						// 							"scale(0.24) translate(-340px,-880px)",
						// 					}}
						// 				>
						// 					<LayoutDemo
						// 						CustomLayout={
						// 							layoutMap[
						// 								layout?.light || "antd"
						// 							] as any
						// 						}
						// 						isDark={false}
						// 						themeConfig={{}}
						// 					/>
						// 				</div>
						// 			</div>
						// 		);
						// 	} else {
						// 		return option.label;
						// 	}
						// }}
						// dropdownRender={(menus: React.ReactNode) => {
						// 	return (
						// 		<div>
						// 			{menus}
						// 			<Divider style={{ margin: 0 }} />
						// 		</div>
						// 	);
						// }}
					/>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<Typography>暗：</Typography>
					<Cascader
						defaultValue={[
							layoutSet?.dark! in layoutMap
								? layoutSet?.dark!
								: ("antd" as any),
						]}
						options={layoutOptions}
						displayRender={displayRender}
						onChange={(value) => {
							onLayoutChange(value, "dark");
						}}
						changeOnSelect
						allowClear={false}
						// optionRender={(option) => {
						// 	if (option.level == 1) {
						// 		return (
						// 			<div
						// 				style={{
						// 					height: "162px",
						// 				}}
						// 			>
						// 				<div
						// 					style={{
						// 						width: "200px",
						// 						height: "580px",
						// 						transform:
						// 							"scale(0.24) translate(-340px,-880px)",
						// 					}}
						// 				>
						// 					<LayoutDemo
						// 						CustomLayout={
						// 							layoutMap[
						// 								layout?.dark || "antd"
						// 							] as any
						// 						}
						// 						isDark={true}
						// 						themeConfig={{}}
						// 					/>
						// 				</div>
						// 			</div>
						// 		);
						// 	} else {
						// 		return option.label;
						// 	}
						// }}
						// dropdownRender={(menus: React.ReactNode) => {
						// 	return (
						// 		<div>
						// 			{menus}
						// 			<Divider style={{ margin: 0 }} />
						// 		</div>
						// 	);
						// }}
					/>
				</div>
			</div>
		</>
	);
};

export default ThemeSetting;
