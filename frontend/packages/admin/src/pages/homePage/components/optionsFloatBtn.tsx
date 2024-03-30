import { CommentOutlined, OpenAIOutlined } from "@ant-design/icons";
import React from "react";
import { FloatButton } from "antd";
import { useFlat } from "src/reduxService";

const OptionsFloatBtn: React.FC = () => {
  const { setIsShowOptionsDrawer } = useFlat("appStore");
  return (
    <>
      <FloatButton.Group
        trigger="hover"
        type="primary"
        icon={<OpenAIOutlined />}>
        <FloatButton
          onClick={() => {
            setIsShowOptionsDrawer(true);
          }}
          icon={<CommentOutlined />}
        />
      </FloatButton.Group>
    </>
  );
};
export default OptionsFloatBtn;
