import { Drawer } from "antd";
import { dp, useFlat } from "src/service";
import { MdPreview } from "../mdPreview";

export const PluginDetailDrawer = () => {
	const { isShowMdDrawer, mdContent } = useFlat("appStore");
	return (
		<Drawer
			getContainer={"main"}
			destroyOnClose
			width={"50vw"}
			open={isShowMdDrawer}
			onClose={() => {
				dp("appStore", "setState", {
					isShowMdDrawer: false,
					mdContent: "",
				});
			}}
		>
			<MdPreview>{mdContent}</MdPreview>
		</Drawer>
	);
};
