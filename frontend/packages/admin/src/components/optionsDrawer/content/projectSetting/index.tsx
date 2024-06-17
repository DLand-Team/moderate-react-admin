import { Input, Select, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useFlat } from "src/service";
import { ThemeName } from "src/service/stores/appStore/modal";

const ProjectSetting: React.FC = () => {
	const { t } = useTranslation();
	const { settingData, setSettingData } = useFlat("appStore");
	const { projectName, logo, icon } = settingData;
	return (
		<>
			<>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						paddingLeft: "20px",
						marginBottom: "16px",
					}}
				>
					<Typography
						style={{
							width: "70px",
						}}
					>
						{t("app:projectName")}：
					</Typography>
					<Input
						style={{
							flex: 0.5,
						}}
						onChange={(e) => {
							setSettingData({
								projectName: e.target.value,
							});
						}}
						value={projectName}
					/>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						paddingLeft: "20px",
						marginBottom: "16px",
					}}
				>
					<Typography
						style={{
							width: "70px",
						}}
					>
						{t("app:logo")}：
					</Typography>
					<Input
						onChange={(e) => {
							setSettingData({
								logo: e.target.value,
							});
						}}
						style={{
							flex: 0.5,
						}}
						value={logo}
					/>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						paddingLeft: "20px",
						marginBottom: "16px",
					}}
				>
					<Typography
						style={{
							width: "70px",
						}}
					>
						{t("app:icon")}：
					</Typography>
					<Input
						onChange={(e) => {
							setSettingData({
								icon: e.target.value,
							});
						}}
						style={{
							flex: 0.5,
						}}
						value={icon}
					/>
				</div>
				{/* <div
					style={{
						display: "flex",
						alignItems: "center",
						paddingLeft: "20px",
					}}
				>
					<Typography
						style={{
							width: "70px",
						}}
					>
						{t("app:locale")}：
					</Typography>
					<Input
						onChange={(e) => {
						}}
						style={{
							flex: 0.5,
						}}
						value={icon}
					/>
				</div> */}
			</>
		</>
	);
};

export default ProjectSetting;
