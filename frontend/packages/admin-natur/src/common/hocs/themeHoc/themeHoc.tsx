import { ConfigProvider } from "antd";

const themeHoc =  (Comp, theme) => {
  return (props) => {
    return (
      <ConfigProvider theme={theme}>
        <Comp {...props} />
      </ConfigProvider>
    );
  };
};

export default themeHoc;