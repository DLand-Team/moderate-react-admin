import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MoonOutlined,
    SunOutlined,
    SyncOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Modal, theme as antdTheme } from "antd";
import { useTranslation } from "react-i18next";
import themeHoc from "src/common/hocs/themeHoc";
import storageHelper from "src/common/utils/storageHelper";
import { I18nMenu } from "src/components";
import CustomBreadcrumb from "src/components/customBreadcrumb";
import { useFlat } from "src/service";
import { ThemeColor } from "src/service/stores/appStore/model";
import styles from "./index.module.scss";

const CustomDropdownButton = themeHoc(Dropdown.Button, {});

const NavHeader = () => {
    const {
        isThemeAuto,
        setTheme,
        setIsThemeAuto,
        currentTheme,
        isCollapsedMenu,
        setIsCollapsedMenu,
    } = useFlat("appStore");
    const antdThemeToken = antdTheme.useToken();
    const { t } = useTranslation();
    const items = [
        {
            icon: <MoonOutlined />,
            label: t("app:dark"),
            key: ThemeColor.dark,
        },
        {
            icon: <SunOutlined />,
            label: t("app:light"),
            key: ThemeColor.light,
        },
        {
            icon: <SyncOutlined />,
            label: t("app:sys"),
            key: "auto",
        },
    ];
    return (
        <Layout.Header
            style={{
                background: antdThemeToken.token.colorBgContainer,
                display: "flex",
                alignItems: "center",
                position: "relative",
            }}
        >
            <Button
                type="primary"
                style={{
                    position: "absolute",
                    left: "0px",
                }}
                onClick={() => {
                    setIsCollapsedMenu(!isCollapsedMenu);
                }}
            >
                {isCollapsedMenu ? (
                    <MenuUnfoldOutlined />
                ) : (
                    <MenuFoldOutlined />
                )}
            </Button>
            <CustomBreadcrumb />
            <div className={styles.toolBtnList}>
                <I18nMenu />
                <CustomDropdownButton
                    trigger={["hover"]}
                    placement="bottomRight"
                    buttonsRender={() => {
                        return [
                            <Button type="primary">
                                {isThemeAuto
                                    ? t("app:sys2")
                                    : items.find((item) => {
                                          return item.key == currentTheme;
                                      })?.label}
                            </Button>,
                            <Button
                                type="primary"
                                icon={
                                    items.find((item) => {
                                        return item.key == currentTheme;
                                    })?.icon
                                }
                            ></Button>,
                        ];
                    }}
                    type="primary"
                    menu={{
                        items: items,
                        onClick: (e) => {
                            if (e.key == "auto") {
                                setIsThemeAuto(true);
                            } else {
                                setIsThemeAuto(false);
                                setTheme(e.key as ThemeColor);
                            }
                        },
                    }}
                    icon={<MoonOutlined />}
                ></CustomDropdownButton>
                <Button
                    type="primary"
                    onClick={() => {
                        Modal.confirm({
                            title: t("common:sure"),
                            onOk: () => {
                                storageHelper.clear();
                                window.location.href = "/";
                            },
                        });
                    }}
                >
                    {t("common:logout")}
                </Button>
            </div>
        </Layout.Header>
    );
};

export default NavHeader;
