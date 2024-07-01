import { Layout, theme } from "antd";
import { SliderMenu } from "src/components";
import styles from "./index.module.scss";
import MainContent from "./mainContent";
import NavHeader from "./navHeader";
const { Content } = Layout;
export const Wind = ({
    children,
    isDark,
    ...rest
}: React.PropsWithChildren<{ isDark?: boolean }>) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout {...rest} className={styles.content}>
            <NavHeader></NavHeader>
            <Content style={{ padding: "10px 48px" }}>
                <Layout
                    style={{
                        padding: "0px 0px",
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        height: "100%",
                        overflow: "hidden",
                    }}
                >
                    <SliderMenu />
                    <MainContent isDark={isDark}>{children}</MainContent>
                </Layout>
            </Content>
        </Layout>
    );
};
