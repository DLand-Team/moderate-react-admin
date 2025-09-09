import { Layout } from "antd";
import React from "react";
import { NavTabs } from "src/components";
import NavHeaderMobile from "src/components/navHeaderMobile";
import styles from "./index.module.scss";

export const MobileDefault = ({
  children,
  ...rest
}: React.PropsWithChildren) => {
  return (
    <Layout className={styles.content} {...rest}>
      <Layout>
        <NavHeaderMobile />
        <Layout>
          <MainContent>{children}</MainContent>
        </Layout>
      </Layout>
    </Layout>
  );
};

const { Content } = Layout;
const MainContent = ({ children }: React.PropsWithChildren) => {
  return (
    <Content
      style={{
        padding: "12px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavTabs />
      <div
        style={{
          flex: 1,
          overflow: "auto",
          height: "100%",
          overflowX: "hidden",
        }}
      >
        {children}
      </div>
    </Content>
  );
};
