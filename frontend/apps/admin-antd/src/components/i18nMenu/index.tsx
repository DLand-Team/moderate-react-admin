import { Button, Dropdown, MenuProps, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useFlat } from "src/service";
const lngList: MenuProps["items"] = [
  {
    key: "zh",
    label: "中文",
  },
  {
    key: "en",
    label: "英文",
  },
];

const I18nMenu = () => {
  const { setLanguage, language } = useFlat("appStore");
  const { i18n } = useTranslation();
  return (
    <Dropdown
      menu={{
        items: lngList,
        selectable: true,
        defaultSelectedKeys: [language],
        onClick: (e) => {
          i18n.changeLanguage(e.key);
          setLanguage(e.key);
        },
      }}
    >
      <Space>
        <Button>
          {
            {
              zh: "中文",
              en: "EN",
            }[language]
          }
        </Button>
      </Space>
    </Dropdown>
  );
};

export default I18nMenu;
