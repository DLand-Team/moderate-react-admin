import { Select, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useFlat } from "src/service";

const OtherSetting: React.FC = () => {
	const { t } = useTranslation();
	const { settingData, setSettingData } = useFlat("appStore");
	const { routerAni } = settingData;
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
						{t("app:routerAni")}：
					</Typography>
					<Select
						style={{
							flex: 0.5,
						}}
						onChange={(e) => {
							setSettingData({
								routerAni: e,
							});
						}}
						value={routerAni}
						options={[
							{
								value: "none",
								label: "none",
							},
							{
								value: "fade",
								label: "fade",
							},
							{
								value: "slide",
								label: "slide",
							},
							{
								value: "up",
								label: "up",
							},
						]}
					></Select>
				</div>
			</>
		</>
	);
};

export default OtherSetting;
