import { Layout, theme } from "antd";
import React from "react";
import { NameInfo, NavHeader, SliderMenu } from "src/components";
import Tabs from "src/components/navTabs";
import styles from "./index.module.scss";

export const DefaultLayout = ({
    children,
    ...rest
}: React.PropsWithChildren) => {
    const {
        token: { colorBgBase },
    } = theme.useToken();
    return (
        <Layout className={styles.content} {...rest}>
            <div>
                <div
                    style={{
                        background: colorBgBase,
                        padding: "12px",
                        height: "100%",
                    }}
                >
                    <NameInfo />
                    <div
                        style={{
                            height: "100%",
                            overflowX: "hidden",
                            overflowY: "auto",
                        }}
                    >
                        <SliderMenu />
                    </div>
                </div>
            </div>

            <Layout>
                <NavHeader />
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
            <Tabs />
            <div
                style={{
                    flex: 1,
                    overflow: "auto",
                    padding: 32,
                    height: "100%",
                }}
            >
                {children}
            </div>
        </Content>
    );
};
