import React, { useState } from "react";
import { Button, Drawer, Radio, Space, theme } from "antd";
import type { DrawerProps, RadioChangeEvent } from "antd";
import { useFlat } from "src/reduxService";

const OptionsDrawer: React.FC = () => {
  const { isShowOptionsDrawer, setIsShowOptionsDrawer } = useFlat("appStore");
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("right");
  const antdToken = theme.useToken();
  const showDrawer = () => {
    setIsShowOptionsDrawer(true);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  const onClose = () => {
    setIsShowOptionsDrawer(false);
  };

  return (
    <>
      <Drawer
        title="Drawer with extra actions"
        placement={placement}
        width={500}
        onClose={onClose}
        open={isShowOptionsDrawer}
        style={{
          color: antdToken.token.colorText,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }>
        hello
      </Drawer>
    </>
  );
};

export default OptionsDrawer;
