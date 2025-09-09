import { ConfigProvider, ThemeConfig } from "antd";
import React from "react";

const themeHoc = <P extends any>(
  Comp: React.ComponentType<P>,
  theme: ThemeConfig,
) => {
  return (props: P) => {
    return (
      <ConfigProvider theme={theme}>
        <Comp {...(props as any)} />
      </ConfigProvider>
    );
  };
};

export default themeHoc;
