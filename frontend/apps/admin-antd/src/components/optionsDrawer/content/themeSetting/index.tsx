import { Cascader, Divider, Select, Typography } from "antd";
import { cloneDeep } from "src/common/utils";
import React from "react";
import layoutMap, { LayoutMapkey } from "src/layouts";
import { useFlat } from "src/service";
import type { ThemeName } from "src/service/stores/appStore/model";
import themeMap from "src/theme";
import LayoutDemo from "./layoutDemo";
import { useTranslation } from "react-i18next";

interface Option {
  value: string;
  label: string;
  children?: Option[];
  level?: number;
}

const { Text } = Typography;
// Just show the latest item.
const displayRender = (labels: string[]) => labels[labels.length - 1];

const ThemeSetting = () => {
  const { settingData, setSettingData } = useFlat("appStore");
  const { t } = useTranslation();
  const { paletteSet, layoutSet, color } = settingData || {};
  const onChange = (value: any, themeColor: ThemeName) => {
    let settingDataTemp = cloneDeep(settingData);
    if (!settingDataTemp!.paletteSet) {
      settingDataTemp!.paletteSet = {} as any;
    }
    settingDataTemp!.paletteSet![themeColor] = value[0] as any;
    settingDataTemp && setSettingData(settingDataTemp);
  };
  const onLayoutChange = (value: any, themeColor: ThemeName) => {
    let settingDataTemp = cloneDeep(settingData);
    if (!settingDataTemp!.layoutSet) {
      settingDataTemp!.layoutSet = {} as any;
    }
    settingDataTemp!.layoutSet![themeColor] = value[0] as any;
    settingDataTemp && setSettingData(settingDataTemp);
  };
  const options: Option[] = Object.keys(themeMap).map((key) => {
    return {
      value: key,
      label: key,
      children: [
        {
          value: key,
          label: key,
          level: 1,
        },
      ],
    };
  });
  const layoutOptions: Option[] = Object.keys(layoutMap).map((key) => {
    return {
      value: key,
      label: key,
      children: [
        {
          value: key,
          label: key,
          level: 1,
        },
      ],
    };
  });
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingLeft: "20px",
          marginBottom: "12px",
        }}
      >
        <Typography style={{}}>{t("app:themeMode")}：</Typography>
        <Select
          options={[
            {
              value: "dark",
              label: "Dark",
            },
            {
              value: "light",
              label: "Light",
            },
          ]}
          onChange={(e) => {
            setSettingData({
              color: e,
            });
          }}
          value={color}
          style={{
            flex: 0.5,
          }}
        />
      </div>
      <>
        <div
          style={{
            marginBottom: "16px",
            fontWeight: "bold",
          }}
        >
          {t("app:paletteSet")}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
            paddingLeft: "20px",
          }}
        >
          <div>
            <Text>{t("app:light")}：</Text>
          </div>

          <Cascader
            expandTrigger={"hover"}
            defaultValue={[
              paletteSet?.light! in themeMap ? paletteSet?.light! : "default",
            ]}
            options={options}
            displayRender={displayRender}
            onChange={(value) => {
              onChange(value, "light");
            }}
            changeOnSelect
            allowClear={false}
            optionRender={(option) => {
              if (option.level == 1) {
                return (
                  <div
                    style={{
                      height: "162px",
                    }}
                  >
                    <div
                      style={{
                        width: "200px",
                        height: "580px",
                        transform: "scale(0.24) translate(-340px,-880px)",
                      }}
                    >
                      <LayoutDemo
                        isDark={false}
                        themeConfig={themeMap[
                          option.value as keyof typeof themeMap
                        ](false)}
                      />
                    </div>
                  </div>
                );
              } else {
                return option.label;
              }
            }}
            dropdownRender={(menus: React.ReactNode) => {
              return (
                <div>
                  {menus}
                  <Divider style={{ margin: 0 }} />
                </div>
              );
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
          }}
        >
          <Typography>{t("app:dark")}：</Typography>
          <Cascader
            expandTrigger={"hover"}
            defaultValue={[
              paletteSet?.dark! in themeMap ? paletteSet?.dark! : "default",
            ]}
            options={options}
            displayRender={displayRender}
            onChange={(value) => {
              onChange(value, "dark");
            }}
            changeOnSelect
            allowClear={false}
            optionRender={(option) => {
              if (option.level == 1) {
                return (
                  <div
                    style={{
                      height: "162px",
                    }}
                  >
                    <div
                      style={{
                        width: "200px",
                        height: "580px",
                        transform: "scale(0.24) translate(-340px,-880px)",
                      }}
                    >
                      <LayoutDemo
                        isDark={true}
                        themeConfig={themeMap[
                          option.value as keyof typeof themeMap
                        ](true)}
                      />
                    </div>
                  </div>
                );
              } else {
                return option.label;
              }
            }}
            dropdownRender={(menus: React.ReactNode) => {
              return (
                <div>
                  {menus}
                  <Divider style={{ margin: 0 }} />
                </div>
              );
            }}
          />
        </div>
      </>
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <div
          style={{
            marginBottom: "16px",
            fontWeight: "bold",
          }}
        >
          {t("app:layoutSet")}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
            paddingLeft: "20px",
          }}
        >
          <div>
            <Text>{t("app:light")}：</Text>
          </div>

          <Cascader
            expandTrigger={"hover"}
            defaultValue={[
              layoutSet?.light! in layoutMap
                ? layoutSet?.light!
                : ("default" as any),
            ]}
            options={layoutOptions}
            displayRender={displayRender}
            onChange={(value) => {
              onLayoutChange(value, "light");
            }}
            changeOnSelect
            allowClear={false}
            optionRender={(option) => {
              if (option.level == 1) {
                return (
                  <div
                    style={{
                      height: "162px",
                    }}
                  >
                    <div
                      style={{
                        width: "200px",
                        height: "580px",
                        transform: "scale(0.24) translate(-340px,-880px)",
                      }}
                    >
                      <LayoutDemo
                        CustomLayout={layoutMap[option.value as LayoutMapkey]}
                        isDark={false}
                        themeConfig={{}}
                      />
                    </div>
                  </div>
                );
              } else {
                return option.label;
              }
            }}
            dropdownRender={(menus: React.ReactNode) => {
              return (
                <div>
                  {menus}
                  <Divider style={{ margin: 0 }} />
                </div>
              );
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
          }}
        >
          <Typography>{t("app:dark")}：</Typography>
          <Cascader
            expandTrigger={"hover"}
            defaultValue={[
              layoutSet?.dark! in layoutMap
                ? layoutSet?.dark!
                : ("default" as any),
            ]}
            options={layoutOptions}
            displayRender={displayRender}
            onChange={(value) => {
              onLayoutChange(value, "dark");
            }}
            changeOnSelect
            allowClear={false}
            optionRender={(option) => {
              if (option.level == 1) {
                return (
                  <div
                    style={{
                      height: "162px",
                    }}
                  >
                    <div
                      style={{
                        width: "200px",
                        height: "580px",
                        transform: "scale(0.24) translate(-340px,-880px)",
                      }}
                    >
                      <LayoutDemo
                        CustomLayout={layoutMap[option.value as LayoutMapkey]}
                        isDark={true}
                        themeConfig={{}}
                      />
                    </div>
                  </div>
                );
              } else {
                return option.label;
              }
            }}
            dropdownRender={(menus: React.ReactNode) => {
              return (
                <div>
                  {menus}
                  <Divider style={{ margin: 0 }} />
                </div>
              );
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ThemeSetting;
