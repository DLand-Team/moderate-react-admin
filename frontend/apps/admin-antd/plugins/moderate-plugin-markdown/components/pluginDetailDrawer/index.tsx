import { Drawer } from "antd";
import { dp, useFlat } from "src/service";
import Md from "react-markdown";

export const PluginDetailDrawer = () => {
  const { isShowMdDrawer, mdContent } = useFlat("appStore");
  return (
    <Drawer
      width={"50vw"}
      open={isShowMdDrawer}
      onClose={() => {
        dp("appStore", "setState", {
          isShowMdDrawer: false,
          mdContent: "",
        });
      }}
    >
      <Md>{mdContent}</Md>
    </Drawer>
  );
};
