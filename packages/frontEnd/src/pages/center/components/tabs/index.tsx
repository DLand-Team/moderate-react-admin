import { useRef, useState } from "react";
import { Tabs } from "antd";
import { globalStore } from "@/stores/index";
import { observer, inject } from "mobx-react";
import { toJS } from "mobx";
import styles from "./index.module.scss";
import routeConfig from "@/router/config";
import { useEffect } from "react";
import useLocationListen from "@/common/hooks/useLocationListen";
import { useNavigate } from "react-router-dom";

const initialItems = [
  { label: "Tab 1", key: "1" },
  { label: "Tab 2", key: "2" },
  {
    label: "Tab 3",
    key: "3",
  },
];

export default observer(() => {
  const [activeKey, setActiveKey] = useState("");
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let tabsHistory = Object.values(toJS(globalStore.tabsHistory));
    setItems(
      tabsHistory.map((item) => {
        const { pathname } = item;
        let routeId = pathname.split("/").slice(-1)[0]
        const { meta } = routeConfig[routeId];
        return { label: meta.title, key: pathname };
      })
    );
  }, [globalStore.tabsHistory]);
  useLocationListen((location) => {
    setActiveKey(location.pathname);
  });
  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
    navigate(newActiveKey);
  };

  return (
    <Tabs
      className={styles.content}
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      items={items}
      hideAdd={true}
      onEdit={(e, action) => {
        if (action == "remove") {
          ;
          globalStore.deleteTabHistory(e);
        }
      }}
    />
  );
});
