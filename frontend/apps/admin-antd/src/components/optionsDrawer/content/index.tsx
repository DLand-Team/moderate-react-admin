import { CaretRightOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";
import { Collapse, theme } from "antd";
import type { CSSProperties } from "react";
import React from "react";
import { useTranslation } from "react-i18next";
import ThemeSetting from "./themeSetting";
import ProjectSetting from "./projectSetting";
import OtherSetting from "./otherSetting";

const SettingContent = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation();
  const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
    panelStyle,
  ) => [
    {
      key: "1",
      label: (
        <div
          style={{
            fontSize: "20px",
            lineHeight: "20px",
            fontWeight: "bold",
          }}
        >
          {t("app:projectSet")}
        </div>
      ),
      children: <ProjectSetting />,
      style: panelStyle,
    },
    {
      key: "2",
      label: (
        <div
          style={{
            fontSize: "20px",
            lineHeight: "20px",
            fontWeight: "bold",
          }}
        >
          {t("app:themeSet")}
        </div>
      ),
      children: <ThemeSetting />,
      style: panelStyle,
    },
    {
      key: "3",
      label: (
        <div
          style={{
            fontSize: "20px",
            lineHeight: "20px",
            fontWeight: "bold",
          }}
        >
          {t("app:otherSet")}
        </div>
      ),
      children: <OtherSetting />,
      style: panelStyle,
    },
  ];
  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  return (
    <Collapse
      collapsible={"icon"}
      bordered={false}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      defaultActiveKey={["1", "2", "3"]}
      style={{
        background: token.Menu?.["colorBgContainer" as keyof typeof token.Menu],
      }}
      items={getItems(panelStyle)}
    />
  );
};

export default SettingContent;
