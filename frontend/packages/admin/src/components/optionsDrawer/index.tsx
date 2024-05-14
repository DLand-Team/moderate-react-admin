import type { DrawerProps } from "antd";
import { Button, Drawer, Space, theme } from "antd";
import React, { useState } from "react";
import { useFlat } from "src/service";
import SettingContent from "./content/index";
const OptionsDrawer: React.FC = () => {
	const { saveSettingAct } = useFlat("devStore");
	const { isShowOptionsDrawer, setIsShowOptionsDrawer, settingData } =
		useFlat("appStore");
	const [placement] = useState<DrawerProps["placement"]>("right");
	const antdToken = theme.useToken();

	const onClose = () => {
		setIsShowOptionsDrawer(false);
	};

	return (
		<>
			<Drawer
				title="设置"
				placement={placement}
				width={500}
				onClose={onClose}
				open={isShowOptionsDrawer}
				style={{
					color: antdToken.token.colorText,
				}}
				destroyOnClose
				extra={
					<Space>
						<Button onClick={onClose}>取消</Button>
						<Button
							type="primary"
							onClick={() => {
								settingData && saveSettingAct(settingData);
								onClose();
							}}
						>
							保存
						</Button>
					</Space>
				}
			>
				<SettingContent />
			</Drawer>
		</>
	);
};

export default OptionsDrawer;
