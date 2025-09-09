import { Divider, Layout, theme } from "antd";
import Tabs from "src/components/navTabs";

const { Content } = Layout;
const MainContent = ({
  children,
}: React.PropsWithChildren<{ isDark?: boolean }>) => {
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  return (
    <Content
      style={{
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: colorBgLayout,
      }}
    >
      <Tabs />
      <Divider
        style={{
          margin: 0,
        }}
      />
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: "12px",
          height: "100%",
        }}
      >
        {children}
      </div>
    </Content>
  );
};
export default MainContent;
