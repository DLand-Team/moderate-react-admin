import "react";
import { ConfigProvider, Button } from "antd";

export default (Comp, theme) => {
  return (props) => {
    return (
      <ConfigProvider theme={theme}>
        <Comp {...props} />
      </ConfigProvider>
    );
  };
};
