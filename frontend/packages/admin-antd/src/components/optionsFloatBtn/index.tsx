import { SettingOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import React from "react";
import { useFlat } from "src/service";

const OptionsFloatBtn: React.FC = () => {
	const { setIsShowOptionsDrawer } = useFlat("appStore");
	return (
		<>
			<FloatButton
				type="primary"
				onClick={() => {
					setIsShowOptionsDrawer(true);
				}}
				icon={<SettingOutlined />}
			/>
		</>
	);
};
export default OptionsFloatBtn;
