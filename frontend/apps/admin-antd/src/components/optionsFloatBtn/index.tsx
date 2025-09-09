import { SettingOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { useFlat } from "src/service";

const OptionsFloatBtn = () => {
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
