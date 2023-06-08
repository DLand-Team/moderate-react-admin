import useLocationListen from "@/common/hooks/useLocationListen";
import routerManager from "@/router/routerManager";
import { globalStore } from "@/stores/index";
import { Tabs } from "antd";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

export default observer(() => {
  const [activeKey, setActiveKey] = useState("");
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tabsHistory = Object.values(toJS(globalStore.tabsHistory));
    setItems(
      tabsHistory.map((item) => {
        const { pathname } = item;
        const id = pathname.split("/").slice(-1)[0]
        return { label: routerManager.getRouteTitleByKey(id), key: pathname };
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
          globalStore.deleteTabHistory(e as string);
        }
      }}
    />
  );
});
